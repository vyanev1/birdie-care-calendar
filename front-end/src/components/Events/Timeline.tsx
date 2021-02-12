import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Event } from '@App/types';
import EventCard from '@App/components/Events/EventCard';
import { EventsActionTypes } from '@App/store/types';
import { RootState } from '@App/store/reducers';
import DateNavigation from '../Navigation/DateNavigation';

export const StyledTimeline = styled.div`
  flex: 1 1 auto;
  margin-top: 1em;
`;

interface MatchParams {
  id: string;
  category?: string;
  caregiverId?: string;
  timestamp?: string;
}

interface OwnProps extends RouteComponentProps<MatchParams> {
  fetchEventsIfNeeded: (id: string, category?: string, caregiverId?: string) => Promise<EventsActionTypes>;
  incrementDate: (date: Date, amount: number) => EventsActionTypes;
  changeDate: (newDate: Date) => EventsActionTypes;
  dispatch: Dispatch<EventsActionTypes>;
}

interface StateProps {
  store: RootState;
}

type TimelineProps = OwnProps & StateProps;

interface TimelineState {
  date: Date;
  fetching: boolean;
}

class Timeline extends React.Component<TimelineProps, TimelineState> {
  private _events: Event[];

  public constructor(props: TimelineProps) {
    super(props);
    this.state = { 
      date: new Date(),
      fetching: true
    };
    this.onChange = this.onChange.bind(this);
  }

  public async componentDidMount() {
    const { id, category, caregiverId, timestamp } = this.props.match.params;
    const { fetchEventsIfNeeded, changeDate } = this.props;

    await fetchEventsIfNeeded(id, category, caregiverId).then((_data) => {
      this._events = this.props.store.events.payload.events;
      if (timestamp) {
        changeDate(new Date(timestamp));
      }
      this.setState({
        date: this.props.store.events.payload.currentDate,
        fetching: false
      });
    });
  }

  public onChange(newDate: Date) {
    this.setState({
      date: newDate
    });
  }

  public render() {
    if (this.state.fetching) {
      return <div>Loading...</div>;
    }

    var events = this._events.filter(event => {
      var eventDate = new Date(event.timestamp);
      var isSameDay = (
        eventDate.getDate() === this.state.date.getDate() &&
        eventDate.getMonth() === this.state.date.getMonth() &&
        eventDate.getFullYear() === this.state.date.getFullYear()
      );
      return isSameDay;
    });

    events.sort((a, b) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });

    events.map(event => {
      event.payload = JSON.parse(event.payload_as_text);
    });
    
    return (
    <>
      <StyledTimeline className="container px-0">
        <DateNavigation
          value={this.state.date}
          onChange={this.onChange}
          incrementDate={this.props.incrementDate}
          changeDate={this.props.changeDate}
        />
        <div className="h-100 w-100 border border-top-0 rounded-bottom">
          <table className="table table-responsive-sm table-hover">
            <tbody>
              {events.length > 0 ? 
                events.map(event =>
                  <tr key={event.id}>
                    <th>{new Date(event.timestamp).toLocaleTimeString('en-gb')}</th>
                    <td>
                      <EventCard data={event.payload} />
                    </td>
                  </tr>
                ) : (
                <tr>
                  <td className="text-center">
                    No events to show for this date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </StyledTimeline>
    </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { store: state };
};

export default connect(mapStateToProps)(Timeline);