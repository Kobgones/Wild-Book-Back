import { Request, Response } from "express";
import dataSource from "../utils";
import { Skill } from "../entity/Skill";

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}

const skillController: IController = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Skill).save(req.body);
      res.send("Created skill");
    } catch (error) {
      res.send("Error while creating the skill");
    }
  },

  findAll: async (req, res) => {
    try {
      const skills = await dataSource.getRepository(Skill).find();
      res.send(skills);
    } catch (error) {
      res.status(500).send("Error while getting all skills");
    }
  },

  update: async (req, res) => {
    try {
      await dataSource.getRepository(Skill).update(req.params, req.body);
      res.send("Skill update");
    } catch (error) {
      res.send("Error while updating the skill");
    }
  },

  delete: async (req, res) => {
    try {
      await dataSource.getRepository(Skill).delete(req.params);
      res.send("Skill deleted");
    } catch (error) {
      res.send("Error while deleting the skill");
    }
  },
};

export default skillController;
