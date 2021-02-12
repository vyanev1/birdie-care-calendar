import axios from 'axios';
import { Event } from '@App/types';
import { Caregiver } from './components/RecipientHome/CaregiverGrid';

export async function getEventById(id: string) {
    try {
      let route = `https://birdie-test-vyanev.herokuapp.com/api/events/${id}`;
      const response = await axios.get(route);
      return response.data[0];
    } catch (error) {
      console.log(error);
    }
}

export async function getRecipientEvents(recipientId: string, category?: string, caregiverId?: string) {
    try {
      let route = `https://birdie-test-vyanev.herokuapp.com/api/recipients/${recipientId}/events`;
      if (category) { route += `/${category}`; }
      if (caregiverId) { route += `/${caregiverId}`; }

      const response = await axios.get(route);
      return response.data.sort((a: Event, b: Event) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
    } catch (error) {
      console.log(error);
    }
}

export async function getRecipientCaregivers(recipientId: string) {
  try {
    let route = `https://birdie-test-vyanev.herokuapp.com/api/recipients/${recipientId}/caregivers`;
    const response = await axios.get(route);
    return response.data.sort((a: Caregiver, b: Caregiver) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  } catch (error) {
    console.log(error);
  }
}