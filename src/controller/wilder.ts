import { Request, Response } from "express";
import dataSource from "../utils";
import { Wilder } from "../entity/Wilder";
import { Skill } from "../entity/Skill";

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}

const wilderController: IController = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      res.send("Created wilder");
    } catch (error) {
      res.send("Error while creating wilder");
    }
  },

  findAll: async (req, res) => {
    try {
      const wilders = await dataSource.getRepository(Wilder).find();
      res.send(wilders);
    } catch (error) {
      res.status(500).send("Error while getting all wilders");
    }
  },

  update: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).update(req.params, req.body);
      res.send("Wilder update");
    } catch (error) {
      res.send("Error while updating the wilder");
    }
  },

  delete: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).delete(req.params);
      res.send("Wilder deleted");
    } catch (error) {
      res.send("Error while deleting the wilder");
    }
  },

  addSkill: async (req, res): Promise<void> => {
    try {
      const wilderToUpdate: Wilder | null = await dataSource
        .getRepository(Wilder)
        .findOneBy({ name: req.body.wilderName });
      console.log(wilderToUpdate);
      if (wilderToUpdate === null) {
        res.status(404).send("Wilder not found");
        return;
      }

      const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({ name: req.body.skillName });
      if (skillToAdd === null) {
        res.status(404).send("Skill not found");
        return;
      }
      wilderToUpdate.skill = [...wilderToUpdate.skill, skillToAdd];
      await dataSource.getRepository(Wilder).save(wilderToUpdate);
      res.send("Skill added to wilder");
    } catch (error) {
      console.log(error);
      res.send("Error while adding skill to wilder");
    }
  },
};

export default wilderController;
