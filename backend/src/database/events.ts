import connection from "./index";

export const all = async () => {
    return new Promise((resolve,reject) => {
        connection.query("SELECT * FROM events", (err: any, result: any) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

export const one = async (id: string) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM events WHERE id=?`, [id], (err: any, result: any) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

export const getRecipientEvents = async (id: string, category?: string, caregiverId?: string) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM events WHERE care_recipient_id=${connection.escape(id)}`;
        
        switch (category) {
            case 'caregivers':
                sql += `AND caregiver_id=${connection.escape(caregiverId)}`;
                break;
            case 'food':
                sql += `AND event_type='food_intake_observation'`;
                break;
            case 'medication':
                sql += `AND event_type='regular_medication_taken'`;
                break;
            case 'hygiene':
                sql += `AND event_type='incontinence_pad_observation'`;
                break;
            case 'observations':
                sql += `AND event_type LIKE '%observation%'`;
                break;
            case 'tasks':
                sql += `AND event_type LIKE '%task%'`;
                break;
            case 'alerts':
                sql += `AND event_type LIKE '%alert%'`;
                break;
        }

        connection.query(sql, (err: any, result: any) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

export default {
    all,
    one,
    getRecipientEvents,
}