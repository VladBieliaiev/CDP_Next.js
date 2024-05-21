import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

// const dateRange = ["2024-05-01", "2024-05-31"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("ETCdata");

  const dateRange = req.body;

  try {
    const task = await db
      .collection("data")
      .find({ date: { $gte: dateRange[0], $lte: dateRange[1] } })
      .sort({ date: 1 })
      .toArray();
    return res.status(200).json({
      message: "ETC Task found successfully",
      task: task,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error finding task" });
  }
}
