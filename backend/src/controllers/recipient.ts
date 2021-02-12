import * as express from "express";
import * as eventsRepository from "./../database/events";

export const recipientController = express.Router();

recipientController.get('/api/recipients/:recipientId/events/:category?/:caregiverId?', async (req, res) => {
  try {
    const { recipientId, category, caregiverId } = req.params;
    if (category) {
      var events = await eventsRepository.getRecipientEvents(recipientId, category, caregiverId);
    } else {
      var events = await eventsRepository.getRecipientEvents(recipientId);
    }
    res.json(events);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
