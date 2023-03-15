import express from "express";
import cors from "cors";
import wilderController from "./controller/wilder";
import skillController from "./controller/skill";
import dataSource from "./utils";

const app = express();

app.use(express.json());
app.use(cors());

app.get("5000/api/wilder");
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/wilder", wilderController.create);
app.get("/api/wilder", wilderController.findAll);
app.put("/api/wilder/:id", wilderController.update);
app.delete("/api/wilder/:id", wilderController.delete);

app.get("/api/skill", skillController.findAll);
app.post("/api/skill", skillController.create);
app.put("/api/skill/:id", skillController.update);
app.delete("/api/skill/:id", skillController.delete);

app.post("/api/addSkill", wilderController.addSkill);

app.get("*", (req, res) => {
  res.status(404).send("Maybe a mistake ?");
});

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const port = parseInt("5000", 10);
  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
};

void start();
