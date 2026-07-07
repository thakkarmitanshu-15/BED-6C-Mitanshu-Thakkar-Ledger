import { Request, Response, NextFunction } from "express";

export function auditLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {

  const start = Date.now();

  res.on("finish", () => {

    const duration = Date.now() - start;

    console.log({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });

  });

  next();
}