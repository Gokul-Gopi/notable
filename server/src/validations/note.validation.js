export const createNoteSchema = Joi.object({
  title: Joi.string().required(),
  note: Joi.string().pattern(passwordRegex).required(),
  labelId: Joi.string(),
  background: Joi.string().required(),
});
