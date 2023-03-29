import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface payload {
  id: string;
  username: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: payload;
    }
  }
}
var secretKey = "syedKazmi";
export function authenticateToken1(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as payload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
}
export default authenticateToken1;