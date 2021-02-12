import * as React from 'react';
import { Link } from 'react-router-dom';

import { Payload, Event } from '@App/types';
import { objectToHTML } from './EventView';
import { getEventById } from '../../api';
import names from '@App/misc/names';

var classNames = require('classnames');

export function formatHeadings(s: string) {
  // Capitalize the first letter and replace underscores with spaces
  // (e.g. 'event_type' becomes 'Event type')
  if (s.includes('_id')) {
    s = s.slice(0, -3);
  }
  let formattedString = (s.charAt(0).toUpperCase() + s.slice(1)).replace(/_/g, ' ');
  return formattedString;
}

interface EventProps {
    data?: Payload;
    eventId?: string;
}

interface EventState {
}

class EventCard extends React.Component<EventProps, EventState> {
  private _payload: Payload;

  constructor(props: EventProps) {
      super(props);
      this.fetchEvent = this.fetchEvent.bind(this);
  }
  
  public componentDidMount() {
    if (!this.props.data) {
      this.fetchEvent();
    }
  }

  public fetchEvent() {
    if (this.props.eventId) {
      getEventById(this.props.eventId).then((data: Event) => {
        this._payload = JSON.parse(data.payload_as_text);
        this.forceUpdate();
      });
    }
  }

  public render() {
    if (this.props.data) {
      this._payload = this.props.data;
    }
    let payload = this._payload;

    if (!payload) { return <div>Loading...</div>; }

    let keys = Object.keys(payload).filter(key => {
      return key !== 'id' 
              && !key.includes('_id') 
              && !key.includes('timestamp') 
              && !['event_type', 'navigation', 'screenProps', 'observations'].includes(key);
    });
    
    let cardClasses = classNames(
      'list-group-item',
      'list-group-item-action',
      'flex-column',
      'border-0',
      'rounded',
      {
        'list-group-item-primary': ['check_in', 'visit_completed'].includes(payload.event_type),
        'list-group-item-secondary': payload.event_type === 'check_out',
        'list-group-item-success': ['task_completed', 'regular_medication_taken'].includes(payload.event_type) 
                                    || payload.mood === 'happy',
        'list-group-item-warning': ['task_completion_reverted', 'no_medication_observation_received']
                                    .includes(payload.event_type) || payload.mood === 'okay',
        'list-group-item-danger': ['alert_raised', 'regular_medication_not_taken'].includes(payload.event_type) 
                                    || payload.mood === 'sad',
        'list-group-item-info': payload.event_type.includes('observation') && !payload.event_type.includes('mood')
      }
    );

    return (
      <Link 
        to={`/events/${payload.id}`} 
        className={cardClasses}
      >
        <div className="event-card-header d-flex w-100 justify-content-between mb-3">
          <div className="d-flex flex-column">
            <h5 className="mb-1">{formatHeadings(payload.event_type)}</h5>
            {payload.caregiver_id && <small><strong>Caregiver: </strong>{names[payload.caregiver_id]}</small>}
          </div>
          <div className="d-flex flex-column align-items-center header-date">
            <small>
              {new Date(payload.timestamp).toLocaleTimeString('en-gb', { hour: '2-digit', minute: '2-digit' })}
            </small>
            <small>
              {new Date(payload.timestamp).toLocaleDateString('en-gb')}
            </small>
          </div>
        </div>
        <div>
          {keys.map((key, index) => (
            payload[key] && (
              <div key={index} className="mb-1">
                <strong>{formatHeadings(key)}: </strong>
                <span style={{ overflowWrap: 'anywhere' }}>
                  {typeof(payload[key]) === 'object' ? 
                    objectToHTML(payload[key]) 
                  : typeof(payload[key] === 'boolean') ?
                    payload[key].toString()
                  : payload[key]}
                </span>
              </div>
            )))}
        </div>
      </Link>
    );
  }
}

export default EventCard;