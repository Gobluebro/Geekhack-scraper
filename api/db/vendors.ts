import vendors from "../../database/vendors-model";
import db from "../../database/initdb";

const initDb = async () => {
  await db.authenticate();
  console.log("Connection has been established successfully.");
  // add { force: true } inbetween sync() when messing with new db stuff.
  await vendors.sync({ alter: true });
};

export const getVendorsByThreadId = async (threadId: number) => {
  await initDb();
  return await vendors.findAll({
    where: { thread_id: threadId },
    order: [["location", "ASC"]],
  });
};
