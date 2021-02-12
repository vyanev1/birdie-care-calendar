# Birdie Care App
A dynamic event calendar page that allows family members to see what care their older adults are receiving. The information is displayed in the form of a timeline.

**Link:** https://vyanev1.github.io/birdie-care-calendar/

**Example id to use:** df50cac5-293c-490d-a06c-ee26796f850d

## Context

At Birdie, our app allows care givers to record observations of older adults receiving care, we name them **care recipients**.

These could be anything from the recording of their mood (happy, sad, bored, confused) to what they drank today (1 pint of water).

Each of these observations are recorded as events in our database. Here's an example of a mood observation recorded
in this event format:

``` json
{  
   "id":"decaa026-2ce5-49cb-aff9-92326b85a98c",
   "event_type":"mood_observation",
   "visit_id":"39b94aab-cc35-4874-807f-c23472aec663",
   "timestamp":"2019-04-23T10:53:13+01:00",
   "caregiver_id":"4786d616-259e-4d52-80f7-8cf7dc6d881a",
   "care_recipient_id":"03f3306d-a4a3-4179-ab88-81af66df8b7c",
   "mood":"okay",
},
```

Here's a quick explanation of the base properties:

- `id`: Uniquely identifies the observation.
- `event_type`: Title we use to categorise our events.
- `visit_id`: Observations are traditionally observed during a visit between the caregiver (carer) and care recipient. This ID identifies that visit.
- `caregiver_id`: Identifies who the caregiver (carer) was that made this observation.
- `care_recipient_id`: Identifies the care recipient this observation is for.

On top of that, there can be **additional properties** based on the `event_type`:

- `mood` describes the mood of the care recipient as reported by the caregiver

#### This is a small web application to visualize these observations, so that looking at it is valuable to a family member of this care recipient.

## Set up

Here's the technical stack this boilerplate was made with:

### Front end
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/introduction/getting-started)
* [TypeScript](https://www.typescriptlang.org/)
* [Redux sagas](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)
* [Styled components](https://www.styled-components.com/)

### Back end
* [Express](https://expressjs.com/)
* [MySQL](https://www.mysql.com/)
* [TypeScript](https://www.typescriptlang.org/)
