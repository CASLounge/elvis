import { check } from 'express-validator'

export const useValidation = () => {
  const signUpValidation = [
    check('userName', 'Username must be atleast 3+ characters long')
      .notEmpty()
      .isLength({ min: 3 }),

    check('emailAddress', 'Email is not valid')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .normalizeEmail(),

    check('password', 'Password is required')
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8+ characters long')
      .matches(/(?=.*[!@#$%^&*])/)
      .withMessage('Password must have atleast 1 special character')
      .matches(/(?=.*[0-9])/)
      .withMessage('Password must have atleast 1 numeric character'),

    check('firstName', 'firstName is required')
      .notEmpty()
      .isString()
      .withMessage('Invalid type as firstName'),

    check('lastName', 'lastName is required')
      .notEmpty()
      .isString()
      .withMessage('Invalid type as lastName'),

    check('branch', 'branch is required')
      .notEmpty()
      .isString()
      .withMessage('Invalid type as branch'),

    check('address', 'address is required')
      .notEmpty()
      .isString()
      .withMessage('Invalid type as address'),

    check('course', 'course is required')
      .notEmpty()
      .isString()
      .withMessage('Invalid type as course'),

    check('gender', 'gender is required')
      .notEmpty()
      .isString()
      .withMessage('Invalid type as gender')
  ]

  const signInValidation = [
    check('email', 'userName is required')
      .notEmpty()
      .isEmail()
      .withMessage('Email is invalid!'),
    check('password', 'Password is required')
      .notEmpty()
  ]

  return {
    signInValidation,
    signUpValidation
  }
}
