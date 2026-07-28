import { AuthenticatedUser } from "../modules/auth/auth.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};



// import { UserStatus } from "@prisma/client";

// declare global {
//   namespace Express {
//     interface Request {
//       user: {
//         id: string;
//         firstName: string;
//         lastName: string;
//         displayName: string;
//         email: string;
//         status: UserStatus;
//         createdAt: Date;
//       };
//     }
//   }
// }

// export {};
