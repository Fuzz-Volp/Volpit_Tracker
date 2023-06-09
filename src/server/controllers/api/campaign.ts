import { Request, Response, NextFunction } from "express";
import Campaign from "../../models/campaign";
import logging from "../../config/logging";

const namespace = "Campaign Controller";

const dataController = {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const foundCampaigns = await Campaign.find({});
      logging.info(foundCampaigns, namespace);
      res.locals.data.stories = foundCampaigns;
      next();
    } catch (error) {
      res.status(404).json({ message: "Campaigns Weren't Found" });
      logging.error(error, namespace);
    }
  },
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedCampaign = await Campaign.findByIdAndDelete(req.params.id);
      logging.info(deletedCampaign, namespace);
      res.locals.data = {};
      res.locals.data.story = deletedCampaign;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Delete the Campaign" });
      logging.error(error, namespace);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCampaign = await Campaign.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      logging.info(updatedCampaign, namespace);
      res.locals.data.story = updatedCampaign;
      next();
    } catch (error) {
      res.status(400).json({ message: "Couldn't Update the Campaign" });
      logging.error(error, namespace);
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdCampaign = await Campaign.create({ story: req.body.story });
      logging.info(createdCampaign, namespace);
      res.locals.data.story = createdCampaign;
      next();
    } catch (error) {
      res.status(400).json({ message: "Error Creating Campaign" });
      logging.error(error, namespace);
    }
  },
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const foundCampaign = await Campaign.findById(req.params.id);
      logging.info(foundCampaign, namespace);
      res.locals.data.story = foundCampaign;
      next();
    } catch (error) {
      res.status(404).json({ message: "Campaign wasn't found" });
      logging.error(error, namespace);
    }
  },
};

const apiController = {
  index(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.stories);
  },
  show(req: Request, res: Response, next: NextFunction) {
    res.json(res.locals.data.story);
  },
};

export { dataController, apiController };
