import { getRecipientEvents } from '@App/api';
import { Event } from '@App/types';
import { RootState } from '../reducers';
import { 
    AppThunk,
    EventsActionTypes, 
    RecipientActionTypes, 
    REQUEST_EVENTS, 
    RECEIVE_EVENTS, 
    SELECT_RECIPIENT, 
    UNSELECT_RECIPIENT,  
    INCREMENT_DATE,
    CHANGE_DATE, ERROR
} from '../types';

export function selectRecipient(recipientId: string): RecipientActionTypes {
    return {
        type: SELECT_RECIPIENT,
        recipientId
    };
}

export function unselectRecipient(recipientId: string): RecipientActionTypes {
    return {
        type: UNSELECT_RECIPIENT,
        recipientId
    };
}

export function requestEvents(recipientId: string, category: string, caregiverId?: string): EventsActionTypes {
    return {
        type: REQUEST_EVENTS,
        recipientId,
        caregiverId,
        category
    };
}

export function receiveEvents(
    recipientId: string, 
    events: Event[], 
    category: string, 
    caregiverId?: string
): EventsActionTypes {
    return {
        type: RECEIVE_EVENTS,
        recipientId,
        caregiverId,
        category,
        events
    };
}

export function incrementDate(date: Date, amount: number): EventsActionTypes {
    var newDate = date;
    newDate.setDate(newDate.getDate() + amount);
    return {
        type: INCREMENT_DATE,
        date
    };
}

export function changeDate(newDate: Date): EventsActionTypes {
    return {
        type: CHANGE_DATE,
        newDate
    };
}

export function fetchEvents(
    recipientId: string, 
    category: string, 
    caregiverId?: string
): AppThunk<Promise<EventsActionTypes>> {
    return async (dispatch): Promise<EventsActionTypes> => {
        try {
            dispatch(requestEvents(recipientId, category, caregiverId));
            const events = await getRecipientEvents(recipientId, category, caregiverId);
            return dispatch(receiveEvents(recipientId, events, category, caregiverId));
        } catch (error) {
            console.log(error);
            return dispatch({ type: ERROR, msg: 'Unable to fetch events' } as EventsActionTypes);
        }
    };
}
  
function shouldFetchEvents(state: RootState, category: string, caregiverId?: string) {
    let events = state.events;
    let oldCategory = events.payload.category;
    let oldCaregiverId = events.payload.caregiverId || '';

    console.log('events length:', events.payload.events.length);
    console.log(oldCategory, category);
    
    if (events.payload.events.length === 0 || oldCategory !== category) {
        console.log('should fetch');
        return true;
    } else if (caregiverId) {
        return oldCaregiverId !== caregiverId;
    } else if (events.isFetching) {
        console.log('should not fetch');
        return false;
    } else {
        console.log('events did invalidate');
        return events.didInvalidate;
    }
}

export function fetchEventsIfNeeded(
        recipientId: string, 
        category: string = 'all',
        caregiverId?: string
    ): AppThunk<Promise<EventsActionTypes>> {
    return async (dispatch, getState): Promise<EventsActionTypes> => {
        if (shouldFetchEvents(getState(), category, caregiverId)) {
            return dispatch(fetchEvents(recipientId, category, caregiverId));
        } else {
            return dispatch({ type: 'FETCH_NOT_NEEDED' } as EventsActionTypes);
        }
    };
}