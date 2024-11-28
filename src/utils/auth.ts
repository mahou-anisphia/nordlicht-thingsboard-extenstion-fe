// utils/auth.ts
import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "../types/auth";

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export const getDecodedToken = (): JWTPayload | null => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return jwtDecode<JWTPayload>(token);
  } catch {
    return null;
  }
};
