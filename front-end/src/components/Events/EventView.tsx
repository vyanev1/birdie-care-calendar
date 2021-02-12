import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import history from '@App/history';
import EventCard, { formatHeadings } from './EventCard';
import { getEventById } from '../../api';
import { Payload, Event } from '@App/types';
import names from '@App/misc/names';

interface MatchParams {
  id: string;
}

interface EventProps extends RouteComponentProps<MatchParams> {
  data?: Event;
}

interface EventState {
  data: Event;
  fetched: boolean;
}

class EventView extends React.Component<EventProps, EventState> {
  constructor(props: EventProps) {
    super(props);
    this.state = {
        data: {} as Event,
        fetched: false
    };
  }

  public async componentDidMount() {
    let data: Event;
    
    if (this.props.data) {
      data = this.props.data;
    } else {
      data = await getEventById(this.props.match.params.id);
    }

    this.setState({
      data,
      fetched: true
    });
  }

  public componentWillReceiveProps(newProps: EventProps) {
    if (newProps.match.params.id !== this.props.match.params.id) {
      const id = newProps.match.params.id;
      getEventById(id).then(data => {
        this.setState({
          data,
          fetched: true
        });
      });
    }
  }
  
  public render() {
    if (!this.state.fetched) {
      return <div>Loading...</div>;
    }

    const payload: Payload = JSON.parse(this.state.data.payload_as_text);

    return (
      <div className="container d-flex flex-column align-items-center">
        <h1 className="my-3">Event Info</h1>
        <div
          className="list-group-item list-group-item-action border-0 rounded pb-4"
          style={{backgroundColor: '#54C6C1'}}
        >
          <div className="d-flex justify-content-between py-3">
            <h3 className="text-body text-capitalize">{formatHeadings(payload.event_type)}</h3>
            <div className="d-flex flex-column align-items-center ml-3">
              <small>{new Date(payload.timestamp).toLocaleTimeString()}</small>
              <small>{new Date(payload.timestamp).toLocaleDateString('en-gb')}</small>
            </div>
          </div>
          {objectToHTML(payload)}
        </div>
        <button onClick={() => history.goBack()} className="btn btn-action btn-dark mt-3">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
          <span>Back</span>
        </button>
      </div>
    );
  }
}

export function objectToHTML(payload: Object = {}, keys: string[] = Object.keys(payload || {})) {
  const { care_recipient_id, caregiver_id, timestamp } = payload as Payload;
  const links = {
    caregiver_id: `/recipients/${care_recipient_id}/events/caregivers/${caregiver_id}/${timestamp}`,
    visit_id: `/recipients/${care_recipient_id}/events/caregivers/${caregiver_id}/${timestamp}`,
    care_recipient_id: `/home/${care_recipient_id}`,
  };
  return (
    <ul className="list-group mt-1">
      {keys.map((key, index) => {
        if (
          key.includes('_id') && !['visit_id', 'care_recipient_id', 'caregiver_id'].includes(key) 
          || ['event_type', 'timestamp', 'navigation', 'screenProps'].includes(key)
        ) {
          return '';
        }
        return (
          <li key={index} className="list-group-item">
            <span>
              <strong className="text-capitalize">{formatHeadings(key)}: </strong>
            </span>
            <div style={{ wordBreak: 'break-word' }}>
              {key === 'observation_event_id' ? 
                <div className="mt-1">
                  <EventCard eventId={payload[key]}/>
                </div>
              : ['caregiver_id', 'care_recipient_id', 'visit_id'].includes(key) ?
                <Link to={links[key]} className="mt-1">
                  {names[payload[key]] || payload[key]}
                </Link>
              : typeof(payload[key]) === 'object' ? 
                key === 'observations' ?
                  <div>
                    {payload[key].map((observation: Payload) => (
                      <div className="mt-1">
                        <EventCard key={observation.id} data={observation as Payload}/>
                      </div>
                    ))}
                  </div>
                : objectToHTML(payload[key])
              : typeof(payload[key] === 'boolean') ? payload[key].toString() : payload[key]}
            </div>
          </li>
        );
      })}
    </ul>);
}

export default EventView;