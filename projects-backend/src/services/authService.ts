
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 1. Hash password before saving it
export const hashPassword = async (
  password: string
): Promise<string> => {
  const saltRounds = 12;

  return await bcrypt.hash(password, saltRounds);
};

// 2. Compare entered password with stored hash
export const comparePassword = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHash);
};

// 3. Generate JWT authentication token
export const generateAuthToken = (adminId: string): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing from environment variables");
  }

  return jwt.sign(
    {
      adminId,
      role: "admin",
    },
    jwtSecret,
    {
      expiresIn: "1d",
    }
  );
};
