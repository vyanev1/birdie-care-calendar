import { Event } from '@App/types';
import { Action } from 'react-redux/node_modules/redux';
import { RootState } from './reducers';
import { ThunkAction } from 'redux-thunk';

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const SELECT_RECIPIENT = 'SELECT_RECIPIENT';
export const UNSELECT_RECIPIENT = 'UNSELECT_RECIPIENT';
export const FETCH_NOT_NEEDED = 'FETCH_NOT_NEEDED';
export const INCREMENT_DATE = 'INCREMENT_DATE';
export const CHANGE_DATE = 'CHANGE_DATE';
export const ERROR = 'ERROR';

interface SelectRecipientAction {
    type: typeof SELECT_RECIPIENT;
    recipientId: string;
}

interface UnselectRecipientAction {
    type: typeof UNSELECT_RECIPIENT;
    recipientId: string;
}

interface RequestEventsAction {
    type: typeof REQUEST_EVENTS;
    recipientId: string;
    caregiverId?: string;
    category: string;
}

interface ReceiveEventsAction {
    type: typeof RECEIVE_EVENTS;
    recipientId: string;
    caregiverId?: string;
    events: Event[];
    category: string;
}

interface ErrorAction {
    type: typeof ERROR;
    msg: string;
}

interface FetchNotNeededAction {
    type: typeof FETCH_NOT_NEEDED;
}

interface IncrementDateAction {
    type: typeof INCREMENT_DATE;
    date: Date;
}

interface ChangeDateAction {
    type: typeof CHANGE_DATE;
    newDate: Date;
}

export type RecipientActionTypes = SelectRecipientAction | UnselectRecipientAction | ErrorAction;
export type EventsActionTypes = RequestEventsAction | ReceiveEventsAction | ErrorAction 
                                    | FetchNotNeededAction | IncrementDateAction | ChangeDateAction;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;