import { connectToDatabase } from "../../lib/db";

export default async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("work"); // Replace "work" with the name of your collection

    const data = await collection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};