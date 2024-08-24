// express.d.ts
import { User } from "./src/models/User";

declare global {
  namespace Express {
    interface User {
      id: number;
      full_name: string;
    }

    interface Request {
      user?: User;
    }
  }
}
