import Joi from "joi";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegex).required(),
  confirmPassword: Joi.equal(Joi.ref("password")).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().pattern(passwordRegex).required(),
  confirmPassword: Joi.equal(Joi.ref("newPassword")).required(),
});
