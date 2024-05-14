import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

// const validateDate = ["2024-05-09", "2024-05-10", "2024-05-11", "2024-05-14"];

// const first = "2024-05-09";
// const second = "2024-05-14";

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
      //   .find({ date: { $in: validateDate } })
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
