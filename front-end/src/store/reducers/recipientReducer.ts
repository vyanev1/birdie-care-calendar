import { SELECT_RECIPIENT, UNSELECT_RECIPIENT, RecipientActionTypes } from './../types';
import { initialRecipient } from './initialState';

export type RecipientState = {
    id: string;
};

export function recipientReducer(state: RecipientState = initialRecipient, action: RecipientActionTypes) {
    switch (action.type) {
        case SELECT_RECIPIENT:
            return {
                id: action.recipientId
            };
        case UNSELECT_RECIPIENT:
            return {
                id: ''
            };
        default:
            return state;
    }
}