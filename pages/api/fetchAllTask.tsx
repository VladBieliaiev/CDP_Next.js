import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("ETCdata");

  try {
    const task = await db.collection("data").find({}).toArray();
    return res.status(200).json({
      message: "ETC Task found successfully",
      //   task: JSON.parse(JSON.stringify(task)),
      task: task,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error finding task" });
  }
}
