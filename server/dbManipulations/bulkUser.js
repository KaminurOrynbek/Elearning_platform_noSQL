import { User } from "../models/User.js";
import TryCatch from "../middlewares/TryCatch.js";

export const bulkOperations = TryCatch(async (req, res) => {
  const bulkOps = [
    {
      insertOne: {
        document: { name: "John Doe", email: "john@example.com", password: "password123" }
      }
    },
    {
      updateOne: {
        filter: { email: "jane@example.com" },
        update: { $set: { name: "Jane Doe" } }
      }
    },
    {
      deleteOne: {
        filter: { email: "doe@example.com" }
      }
    }
  ];

  const result = await User.bulkWrite(bulkOps);
  res.json(result);
});