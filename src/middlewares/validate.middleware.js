import { StatusCodes } from "http-status-codes";
import { validationResult, body, param, query } from "express-validator";
import { generateApiResponse, badWordsCheck } from "../services/utilities.service.js";

/**
 * Generic validator mapping
 * Add more validators here as needed for your project
 */
const predefinedValidators = {
  password: (attr) => body(attr)
    .trim()
    .notEmpty().withMessage("Password is required.")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),

  name: (attr) => body(attr)
    .trim()
    .notEmpty().withMessage("Name is required.")
    .custom((value) => {
      if (badWordsCheck(value)) throw new Error("Name contains inappropriate language.");
      return true;
    }),

  email: (attr) => body(attr)
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Email must be a valid email."),

  phone: (attr) => body(attr)
    .trim()
    .notEmpty().withMessage("Phone number is required.")
    .matches(/^\+?\d{7,15}$/).withMessage("Phone number must be valid."),
};

/**
 * Returns a validator for any attribute
 * @param {string} attr - Attribute name
 * @param {"body"|"param"|"query"} type - Location of the attribute
 */
const getValidator = (attr, type = "body") => {
  if (predefinedValidators[attr]) return predefinedValidators[attr](attr);

  const checker = type === "param" ? param(attr)
                : type === "query" ? query(attr)
                : body(attr);

  return checker.trim().notEmpty().withMessage(`${attr} is required.`);
};

/**
 * General validation middleware
 * @param {string[]} attributes - List of attribute names to validate
 * @param {"body"|"param"|"query"} type - Where to look for attributes
 */
export const validate = (attributes = [], type = "body") => {
  const rules = attributes.map(attr => getValidator(attr, type));

  return [
    ...rules,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const validationErrors = errors.array().map(err => err.msg);
        return generateApiResponse(
          res,
          StatusCodes.BAD_REQUEST,
          validationErrors[0], // first error
          { errors: validationErrors }
        );
      }
      next();
    }
  ];
};

/**
 * Optional phone normalization middleware
 * Automatically prepends '+' if missing
 */
export const normalizePhoneNumber = (req, res, next) => {
  if (req.body.phone && !req.body.phone.startsWith("+")) {
    req.body.phone = `+${req.body.phone}`;
  }
  next();
};
