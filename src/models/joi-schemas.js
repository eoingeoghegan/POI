// these are the structures for the forms to check the validation.

// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";



export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const PlacemarkerSpec = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  lat: Joi.string().required(),
  long: Joi.string().required(),
  difficulty: Joi.string().required(),
  
};

export const CategorySpec = {
  title: Joi.string().required(),
};
