import images from "../../database/images-model";
import db from "../../database/initdb";

const initDb = async () => {
  await db.authenticate();
  console.log("Connection has been established successfully.");
  // add { force: true } inbetween sync() when messing with new db stuff.
  await images.sync({ alter: true });
};

export const getImagesByThreadId = async (threadId: number) => {
  await initDb();
  return await images.findAll({
    where: { thread_id: threadId },
    order: [["sort_order", "ASC"]],
  });
};
