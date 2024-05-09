import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("ETCdata");
  const id = req.body;
  const convertedId = new ObjectId(id);
  try {
    const result = await db.collection("data").deleteOne({ _id: convertedId });
    console.log("result", id);
    return res.status(201).json({
      message: "ETCTask deleted successfully",
      userId: result.deletedCount,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting task" });
  }
}
