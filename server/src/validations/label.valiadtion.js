import Joi from "joi";

export const createlabelSchema = Joi.object({
  name: Joi.string().required(),
  background: Joi.string().required(),
});
