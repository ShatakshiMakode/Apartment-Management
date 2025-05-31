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
import { cookies } from "next/headers";


// ✅ For API Routes
export const checkUserFromRequest = async (request) => {
  try {
    const { userId } = getAuth(request);
    console.log("✅ Got userId from request:", userId);

    if (!userId) {
      console.warn("⚠️ No userId from auth");
      return null;
    }

    const user = await findOrCreateUser(userId);
    console.log("✅ User from database:", user?.id);
    return user;
  } catch (error) {
    console.error("❌ Error in checkUserFromRequest:", error);
    return null;
  }
};

// ✅ For Server Components
export const checkUserFromServer = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const dbUser = await db.user.findUnique({
    where: {
      clerkUserId: clerkUser.id,
    },
  });

  return dbUser;
};

// 🔁 Shared logic
const findOrCreateUser = async (clerkUserId, clerkUser = null) => {
  try {
    console.log("🔍 Looking for user with clerkUserId:", clerkUserId);

    // First try to find the user
    let user = await db.user.findUnique({ 
      where: { clerkUserId } 
    });

    if (user) {
      console.log("✅ Found existing user:", user.id);
      return user;
    }

    // If no user exists and no clerkUser provided, get it
    if (!clerkUser) {
      console.log("🔄 Fetching Clerk user data...");
      clerkUser = await currentUser();
    }

    if (!clerkUser) {
      console.error("❌ No Clerk user data available for creation");
      return null;
    }

    // Get primary email
    const primaryEmail = clerkUser.emailAddresses?.find(email => email.id === clerkUser.primaryEmailAddressId);
    const emailAddress = primaryEmail?.emailAddress || `${clerkUserId}@example.com`;

    // Create new user
    const userData = {
      clerkUserId,
      name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Unknown User",
      email: emailAddress,
      firstName: clerkUser.firstName || "",
      lastName: clerkUser.lastName || "",
    };

    console.log("📝 Creating new user with data:", userData);

    const newUser = await db.user.create({
      data: userData
    });

    console.log("✅ Created new user:", newUser.id);
    return newUser;
  } catch (error) {
    console.error("❌ Error in findOrCreateUser:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      clerkUserId
    });
    throw error;
  }
};
