export interface Event {
    id: string;
    event_type: string;
    visit_id: string;
    timestamp: string;
    caregiver_id: string;
    care_recipient_id: string;
    payload: Payload;
    payload_as_text: string;
}

export interface Payload {
    care_recipient_id: string;
    caregiver_id: string;
    event_type: string;
    id: string;
    observations: Payload[];
    observation_event_id: string;
    pad_condition: string;
    timestamp: string;
    visit_id: string;
    observed: boolean;
    task_schedule_note: string;
    task_definition_description: string;
    mood: string;
    fluid: string;
    consumed_volume_ml: number;
    note: string;
}