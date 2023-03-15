import { DataSource } from "typeorm";
import { Skill } from "./entity/Skill";
import { Wilder } from "./entity/Wilder";

const dataSource = new DataSource({
  type: "sqlite", // database type
  database: "./wildersdb.sqlite", // path to the database file
  synchronize: true, // run migrations automatically
  entities: [Wilder, Skill], // load entities dynamically
  logging: ["query", "error"], // show all queries done and error in the terminal
});

export default dataSource;
