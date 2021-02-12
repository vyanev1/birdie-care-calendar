import connection from "./index";

export const getRecipientCaregivers = async (id: string) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT DISTINCT caregiver_id, timestamp FROM events WHERE care_recipient_id=${connection.escape(id)}`;
        
        connection.query(sql, (err: any, result: any) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}