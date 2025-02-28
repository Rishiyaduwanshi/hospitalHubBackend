import Admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';1

const isUsernameOrEmailExist = async (email, username) => {
  return await Admin.findOne({
    $or: [{ email }, { username }],
  });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const isPasswordLengthValid = (password,minLength) => {
  return password.length >= minLength;
};


const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "protonmail.com", "zoho.com", "yandex.com", "rediffmail.com"];

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  const [localPart, domain] = email.split("@");

  if (!allowedDomains.includes(domain)) return false;

  if (domain === "gmail.com") {
    const cleanEmail = localPart.replace(/\./g, "") + "@gmail.com";
    return cleanEmail; 
  }
  return email;
};


export { isUsernameOrEmailExist, hashPassword, isPasswordLengthValid, isValidEmail };
