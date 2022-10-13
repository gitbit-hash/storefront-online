import { bodyKeysMessageBuilder } from './helpers';
import { Product } from '../models/product';
import { User } from '../models/user';

export const validateBodyValues = (reqBody: Product | User) => {
  if (typeof reqBody === 'object') {
    // Check name value
    if ('name' in reqBody) {
      const productName = (reqBody as Product).name;

      if (typeof productName !== 'string') {
        return {
          isValidPropertyValue: false,
          error: `Product name must be of type string.`,
        };
      }

      const minName = 2;

      if (productName.length < minName) {
        return {
          isValidPropertyValue: false,
          error: `Product name must be at least ${minName} characters long.`,
        };
      }

      //REGEX matches (must start with letter, can contain numbers, no special characters).
      if (!/^[^0-9][a-zA-Z0-9 ]+$/.test(productName)) {
        return {
          isValidPropertyValue: false,
          error: `Product name must not start with a number, and must not contain any special characters.`,
        };
      }
    }

    // Check price value
    if ('price' in reqBody) {
      const productPrice = reqBody.price;

      if (isNaN(productPrice) || Array.isArray((reqBody as Product).price)) {
        return {
          isValidPropertyValue: false,
          error: `Product price must be of type number.`,
        };
      }

      const minPrice = 1;

      if (productPrice < minPrice) {
        return {
          isValidPropertyValue: false,
          error: `Product price must be at least ${minPrice}`,
        };
      }
    }

    // // Check category value
    if ('category' in reqBody) {
      const productCategory = (reqBody as Product).category;

      if (typeof productCategory !== 'string') {
        return {
          isValidPropertyValue: false,
          error: `Product category must be of type string.`,
        };
      }

      const minName = 2;

      if (productCategory.length < minName) {
        return {
          isValidPropertyValue: false,
          error: `Product category must be at least ${minName} characters long.`,
        };
      }

      //REGEX matches (must start with letter, can contain numbers, no special characters).
      if (!/^[^0-9][a-zA-Z0-9 ]+$/.test(productCategory)) {
        return {
          isValidPropertyValue: false,
          error: `Product category must not start with a number, and must not contain any special characters.`,
        };
      }
    }

    if ('firstName' in reqBody) {
      const userFirstName = (reqBody as User).firstName;

      if (typeof userFirstName !== 'string') {
        return {
          isValidPropertyValue: false,
          error: `First name must be of type string.`,
        };
      }

      const minName = 2;

      if (userFirstName.length < minName) {
        return {
          isValidPropertyValue: false,
          error: `First name must be at least ${minName} characters long.`,
        };
      }

      //REGEX matches (case insensitive letters, no spaces, no numbers, no special charaters).
      if (!/^[A-Za-z]+$/.test(userFirstName)) {
        return {
          isValidPropertyValue: false,
          error: `First name must not contain any numbers, any special characters, and no spaces.`,
        };
      }
    }

    if ('lastName' in reqBody) {
      const userLastName = (reqBody as User).lastName;

      if (typeof userLastName !== 'string') {
        return {
          isValidPropertyValue: false,
          error: `Last name must be of type string.`,
        };
      }

      const minName = 2;

      if (userLastName.length < minName) {
        return {
          isValidPropertyValue: false,
          error: `Last name must be at least ${minName} characters long.`,
        };
      }

      //REGEX matches (case insensitive letters, no spaces, no numbers, no special charaters).
      if (!/^[A-Za-z]+$/.test(userLastName)) {
        return {
          isValidPropertyValue: false,
          error: `Last name must not contain any numbers, any special characters, and no spaces.`,
        };
      }
    }

    if ('password' in reqBody) {
      const userPassword = (reqBody as User).password;

      //REGEX matches (minimun 8 case insensitive letters,at least one letter or number must be included, no spaces, no special charaters).
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword)) {
        return {
          isValidPropertyValue: false,
          error: `Password must be at least Minimum eight characters long, at least one letter or number must be included, no spaces, no special charaters`,
        };
      }
    }

    if ('username' in reqBody) {
      const userUserName = (reqBody as User).username;

      if (typeof userUserName !== 'string') {
        return {
          isValidPropertyValue: false,
          error: `Username must be of type string.`,
        };
      }

      //REGEX matches (Starts only with letters, numbers and under scores are allowed, minumim 4 characters, max 30 characters).
      if (!/^[a-zA-Z_][a-zA-Z0-9_]{3,29}$/.test(userUserName)) {
        return {
          isValidPropertyValue: false,
          error: `Username Starts only with letters. numbers and underscores are allowed, minumim 4 characters, max 30 characters`,
        };
      }
    }
  }

  return {
    isValidPropertyValue: true,
  };
};

export const validateBodyKeys = (
  body: { [k: string]: string },
  length: number,
  requiredKeys: string[],
  optionalKeys?: string[]
) => {
  const bodyObjKeys = Object.keys(body);

  const validRequiredKeys = bodyObjKeys.filter((key) =>
    requiredKeys.includes(key)
  );

  if (validRequiredKeys.length !== length) {
    return {
      isValidPropertyKey: false,
      error: bodyKeysMessageBuilder('Required', requiredKeys),
    };
  }

  if (!optionalKeys && validRequiredKeys.length !== bodyObjKeys.length) {
    return {
      isValidPropertyKey: false,
      error: bodyKeysMessageBuilder('NotAllowed'),
    };
  }

  if (optionalKeys) {
    if (optionalKeys.length) {
      const notValidOptionalKeys = bodyObjKeys.filter(
        (key) => !optionalKeys.includes(key) && !validRequiredKeys.includes(key)
      );

      if (notValidOptionalKeys.length) {
        return {
          isValidPropertyKey: false,
          error: bodyKeysMessageBuilder('Optional', optionalKeys),
        };
      }
    }
  }

  return {
    isValidPropertyKey: true,
  };
};
