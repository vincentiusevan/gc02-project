import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'rahasia';

export function signToken<T>(payload: T): string {
  return jwt.sign(payload as object, secretKey);
}

export function verifyToken<T>(token: string): T {
  const payload = jwt.verify(token, secretKey);

  return payload as T;
}
