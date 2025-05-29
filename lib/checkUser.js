// import { currentUser } from "@clerk/nextjs/server"
// import { db } from "./prisma";

// export const checkUser = async () => {
//     const user = await currentUser();

//     if(!user) {
//       return null;
//     }

//     try {
//         const loggedInUser = await db.user.findUnique({
//             where: {
//                 clerkUserId: user.id,
//             }
//         })
//         if (loggedInUser) {
//             return loggedInUser;
//         }

//         const name =
//           `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
//           user.fullName ||
//           user.emailAddresses[0]?.emailAddress ||
//             "Unknown User";
//         const newUser = await db.user.create({
//             data: {
//                 clerkUserId: user.id,
//                 name,
//                 email: user.emailAddresses[0]?.emailAddress,
//                 firstName: user.firstName || "",
//                 lastName: user.lastName || "",
//             }
//         })
//         return newUser;
      
//     } catch (error) {
//         console.error("Error checking user:", error);
//     }
// }


import { getAuth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

// ✅ For API Routes
export const checkUserFromRequest = async (request) => {
  const { userId } = getAuth(request);

  if (!userId) return null;

  return await findOrCreateUser(userId);
};

// ✅ For Server Components
export const checkUserFromServer = async () => {
  const user = await currentUser();

  if (!user) return null;

  return await findOrCreateUser(user.id, user);
};

// 🔁 Shared logic
const findOrCreateUser = async (clerkUserId, clerkUser = null) => {
  let user = await db.user.findUnique({ where: { clerkUserId } });
  if (user) return user;

  const name =
    `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim() ||
    clerkUser?.fullName ||
    clerkUser?.emailAddresses?.[0]?.emailAddress ||
    "Unknown User";

  const email =
    clerkUser?.emailAddresses?.[0]?.emailAddress || "no-email@example.com";

  return await db.user.create({
    data: {
      clerkUserId,
      name,
      email,
      firstName: clerkUser?.firstName || "",
      lastName: clerkUser?.lastName || "",
    },
  });
};
