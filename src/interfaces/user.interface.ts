export type Role = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  password: string;
  role: Role;
  image?: string | null;
  sandboxMode: boolean;
}
