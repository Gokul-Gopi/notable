import { User } from "../models/user.model.js";
import { getErrorCodeAndMessage, validateBody } from "../utils/helpers.js";
import { createlabelSchema } from "../validations/label.valiadtion.js";

export const getAllLabels = async (req, res) => {
  const user = req.user;

  try {
    const userLabels = user?.labels;
    res.status(200).json({ status: true, data: userLabels });
  } catch (error) {
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};

export const createLabel = async (req, res) => {
  const user = req.user;
  try {
    await validateBody(createlabelSchema, req.body);
    //TODO: do not allow duplicate labels
    await User.updateOne({ _id: user?._id }, { $push: { labels: req.body } });
    res.status(201).json({ status: true, message: "New label created" });
  } catch (error) {
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};

export const deleteLabel = async (req, res) => {
  const user = req.user;
  const labelId = req.params?.labelId;

  try {
    await User.updateOne(
      { _id: user?._id },
      { $pull: { labels: { _id: labelId } } }
    );
    res.status(200).json({ status: true, data: "Label deleted" });
  } catch (error) {
    const { status, message } = getErrorCodeAndMessage(error);
    return res.status(status).json({ status: false, message });
  }
};
