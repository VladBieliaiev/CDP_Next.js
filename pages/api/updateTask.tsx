import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("ETCdata");

  const { id, data } = req.body;
  const convertedId = new ObjectId(id);

  try {
    const updatedData = {
      project: data.project,
      taskType: data.taskType,
      time: data.time,
      description: data.description,
      date: data.date,
    };
    const result = await db
      .collection("data")
      .updateOne({ _id: convertedId }, { $set: updatedData });
    return res.status(201).json({
      message: "ETCTask updated successfully",
      userId: result.modifiedCount,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating task" });
  }
}
