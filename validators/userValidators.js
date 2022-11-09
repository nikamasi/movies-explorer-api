const { celebrate, Joi } = require('celebrate');

const userPatchValidate = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    })
    .or('name', 'email')
    .required(),
});

const signUpValidate = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const signinValidate = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
});

module.exports = {
  userPatchValidate,
  signUpValidate,
  signinValidate,
};
