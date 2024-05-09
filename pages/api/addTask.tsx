import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("ETCdata");
  const { project, taskType, time, description, date } = req.body;
  try {
    const userData = { project, taskType, time, description, date };
    const result = await db.collection("data").insertOne(userData);
    return res.status(201).json({
      message: "ETCTask created successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating task" });
  }
}
