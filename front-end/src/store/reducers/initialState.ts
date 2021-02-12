import { Event } from '@App/types';

export const initialRecipient = {
  id: ''
};

export const initialEvents = {
  isFetching: false,
  didInvalidate: false,
  payload: {
    recipientId: '',
    events: [] as Event[],
    category: 'all',
    currentDate: new Date()
  }
};