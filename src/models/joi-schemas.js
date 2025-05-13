// these are the structures for the forms to check the validation.

// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

  

export const PlacemarkerSpec = Joi.object()
  .keys({
    title: Joi.string().required().example(""),
    description: Joi.string().required().example(""),
    lat: Joi.number().allow("").optional().example(12),
    long:  Joi.number().allow("").optional().example(12),
    difficulty: Joi.string().required().example(""),
    categoryid: IdSpec,
    img: Joi.string().uri().optional(),
   

  })
  .label("Placemarker");

export const PlacemarkerSpecPlus = PlacemarkerSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkerPlus");

export const PlacemarkerArraySpec = Joi.array().items(PlacemarkerSpecPlus).label("PlacemarkerArray");

export const CategorySpec = Joi.object()
  .keys({
    title: Joi.string().required().example(""),
    userid: IdSpec,
    img: Joi.string().uri().optional(),
    // placemarkers: PlacemarkerArraySpec,
  })
  .label("Category");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");

