import threads from "../../database/threads-model";
import db from "../../database/initdb";
import { Image, Thread } from "@/utils/types";
import { QueryTypes } from "sequelize";

const initDb = async () => {
  await db.authenticate();
  console.log("Connection has been established successfully.");
  // add { force: true } inbetween sync() when messing with new db stuff.
  await threads.sync({ alter: true });
};

export const getAllThreads = async () => {
  await initDb();
  return await threads.findAll({ order: [["updated", "DESC"]] });
};

export const getAllThreadsWithImage = async () => {
  await initDb();
  return await db.query(
    "SELECT * FROM threads t LEFT JOIN images i ON t.id = i.thread_id WHERE sort_order = 0 ORDER BY t.updated DESC",
    {
      type: QueryTypes.SELECT,
    }
  );
};

export const getThreadById = async (threadId: number) => {
  await initDb();
  return await threads.findByPk(threadId);
};

export const searchThreadTitlesWithImage = async (query: string) => {
  await initDb();
  return await db.query(
    'SELECT * FROM threads t LEFT JOIN images i ON t.id = i.thread_id WHERE LOWER(t.title) LIKE CONCAT("%", LOWER(:query), "%") AND sort_order = 0 ORDER BY t.updated DESC',
    {
      type: QueryTypes.SELECT,
      replacements: { query },
    }
  );
};
