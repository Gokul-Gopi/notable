import Joi from "joi";

export const createNoteSchema = Joi.object({
  title: Joi.string().max(56),
  note: Joi.string().min(1).required(),
  labelId: Joi.string(),
  background: Joi.string().required(),
});

export const updateNoteSchema = Joi.object({
  title: Joi.string().max(56),
  note: Joi.string().min(1),
  labelId: Joi.string(),
  background: Joi.string(),
});
