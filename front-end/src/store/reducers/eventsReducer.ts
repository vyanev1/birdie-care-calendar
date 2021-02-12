import { initialEvents } from './initialState';
import { Event } from './../../types';
import { EventsActionTypes, REQUEST_EVENTS, RECEIVE_EVENTS, ERROR, INCREMENT_DATE, CHANGE_DATE } from './../types';

export type EventsState = {
  isFetching: boolean;
  didInvalidate: boolean;
  payload: {
    recipientId: string;
    caregiverId?: string;
    events: Event[];
    category: string;
    currentDate: Date;
  };
};

export function eventsReducer(state: EventsState = initialEvents, action: EventsActionTypes): EventsState {
  switch (action.type) {
    case REQUEST_EVENTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_EVENTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        payload: {
          recipientId: action.recipientId,
          caregiverId: action.caregiverId,
          events: action.events,
          category: action.category,
          currentDate: new Date(action.events[0].timestamp)
        }
      });
    case INCREMENT_DATE:
      return Object.assign({}, state, {
        payload: {
          ...state.payload,
          currentDate: action.date
        }
      });
    case CHANGE_DATE:
      return Object.assign({}, state, {
        payload: {
          ...state.payload,
          currentDate: action.newDate
        }
      });
    case ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });
    default:
      return state;
  }
}