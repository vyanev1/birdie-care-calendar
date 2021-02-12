import * as express from "express";
import * as caregiversRepository from "../database/caregivers";

export const caregiversController = express.Router();

caregiversController.get('/api/recipients/:recipientId/caregivers', async (req, res) => {
  try {
    const { recipientId } = req.params;
    var events = await caregiversRepository.getRecipientCaregivers(recipientId);
    res.json(events);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
