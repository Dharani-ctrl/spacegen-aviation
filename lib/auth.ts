import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = '7d';

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare passwords
export async function comparePassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

// Generate JWT token
export function generateToken(adminId: string, username: string): string {
  return jwt.sign(
    { adminId, username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
}

// Verify JWT token
export function verifyToken(token: string): { adminId: string; username: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as { adminId: string; username: string };
  } catch {
    return null;
  }
}

// Hash admin password (one-time setup)
export async function setupAdminPassword(plainPassword: string): Promise<string> {
  return hashPassword(plainPassword);
}
