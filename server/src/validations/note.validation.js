import Joi from "joi";

export const createNoteSchema = Joi.object({
  title: Joi.string().required(),
  note: Joi.string().required(),
  labelId: Joi.string(),
  background: Joi.string().required(),
});

export const updateNoteSchema = Joi.object({
  title: Joi.string(),
  note: Joi.string(),
  labelId: Joi.string(),
  background: Joi.string(),
});
