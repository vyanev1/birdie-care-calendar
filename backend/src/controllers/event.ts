import * as express from "express";
import * as eventsRepository from "./../database/events";

export const eventController = express.Router();

eventController.get('/api/events/:eventId?', async (req, res) => {
  try {
    if (req.params.eventId) {
      var event = await eventsRepository.one(req.params.eventId);
      res.json(event);
    }
    else {
      var events = await eventsRepository.all();
      res.json(events);
    }
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
