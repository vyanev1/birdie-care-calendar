import { combineReducers } from 'redux';
import { eventsReducer, EventsState } from './eventsReducer';
import { recipientReducer, RecipientState } from './recipientReducer';

export type RootState = Readonly<{
    selectedRecipient: RecipientState;
    events: EventsState;
}>;

export const rootReducer = combineReducers<RootState>({
    selectedRecipient: recipientReducer,
    events: eventsReducer
});