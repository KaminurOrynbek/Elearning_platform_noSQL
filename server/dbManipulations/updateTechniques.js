import { User } from "../models/User.js";
import TryCatch from "../middlewares/TryCatch.js";

// $set
export const setUserField = TryCatch(async (req, res) => {
  const { email, name } = req.body;
  const result = await User.updateOne({ email }, { $set: { name } });
  res.json(result);
});

// $unset
export const unsetUserField = TryCatch(async (req, res) => {
  const { email, field } = req.body;
  const result = await User.updateOne({ email }, { $unset: { [field]: "" } });
  res.json(result);
});

// $push
export const pushUserField = TryCatch(async (req, res) => {
  const { email, hobby } = req.body;
  const result = await User.updateOne({ email }, { $push: { hobbies: hobby } });
  res.json(result);
});

// $pull
export const pullUserField = TryCatch(async (req, res) => {
  const { email, hobby } = req.body;
  const result = await User.updateOne({ email }, { $pull: { hobbies: hobby } });
  res.json(result);
});