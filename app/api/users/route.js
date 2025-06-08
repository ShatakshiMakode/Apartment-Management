// // // app/api/users/route.js

// // import { NextResponse } from "next/server";
// // import { auth } from "@clerk/nextjs/server";
// // import dbConnect from "@/lib/dbConnect";
// // import User from "@/models/User";

// // export async function GET() {
// //   try {
// //     const { userId: clerkUserId } = auth();

// //     if (!clerkUserId) {
// //       return NextResponse.json(
// //         { success: false, error: "Unauthorized" },
// //         { status: 401 }
// //       );
// //     }

// //     await dbConnect();

// //     const user = await User.findOne({ clerkUserId }).populate(
// //       "societyId buildingId flatId"
// //     );

// //     if (!user) {
// //       return NextResponse.json(
// //         { success: false, error: "User not found" },
// //         { status: 404 }
// //       );
// //     }

// //     return NextResponse.json({ success: true, data: user });
// //   } catch (error) {
// //     return NextResponse.json(
// //       { success: false, error: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export async function POST(req) {
// //   try {
// //     const { userId: clerkUserId } = auth();

// //     if (!clerkUserId) {
// //       return NextResponse.json(
// //         { success: false, error: "Unauthorized" },
// //         { status: 401 }
// //       );
// //     }

// //     await dbConnect();
// //     const body = await req.json();

// //     let user = await User.findOne({ clerkUserId });

// //     if (user) {
// //       user = await User.findOneAndUpdate({ clerkUserId }, body, {
// //         new: true,
// //         runValidators: true,
// //       });

// //       return NextResponse.json({
// //         success: true,
// //         data: user,
// //         message: "User updated.",
// //       });
// //     } else {
// //       const newUser = await User.create({
// //         ...body,
// //         clerkUserId,
// //       });

// //       return NextResponse.json(
// //         { success: true, data: newUser, message: "User created." },
// //         { status: 201 }
// //       );
// //     }
// //   } catch (error) {
// //     if (error.code === 11000) {
// //       return NextResponse.json(
// //         { success: false, error: "Email already exists." },
// //         { status: 400 }
// //       );
// //     }

// //     return NextResponse.json(
// //       { success: false, error: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }



// // app/api/users/route.js
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const supabase = createRouteHandlerClient({ cookies });

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const { user } = session;

//   const { data, error } = await supabase
//     .from('users') // your Supabase table name
//     .select('id, email, role, name')
//     .eq('id', user.id)
//     .single();

//   if (error || !data) {
//     return NextResponse.json({ error: 'User not found' }, { status: 404 });
//   }

//   return NextResponse.json({ data });
// }



// export async function PATCH(req) {
//   try {
//     const { userId: clerkUserId } = auth();

//     if (!clerkUserId) {
//       return NextResponse.json(
//         { success: false, error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     await dbConnect();

//     const adminUser = await User.findOne({ clerkUserId });

//     if (adminUser?.role !== "ADMIN") {
//       return NextResponse.json(
//         { success: false, error: "Forbidden: Only admins can update roles." },
//         { status: 403 }
//       );
//     }

//     const { targetClerkUserId, newRole } = await req.json();

//     const updatedUser = await User.findOneAndUpdate(
//       { clerkUserId: targetClerkUserId },
//       { role: newRole },
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) {
//       return NextResponse.json(
//         { success: false, error: "Target user not found." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: updatedUser,
//       message: "User role updated successfully.",
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }


// app/api/users/route.js
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { checkUserFromRequest } from "@/lib/checkUser";

// GET - Get current user details
export async function GET(req) {
  
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await checkUserFromRequest(req);
    if(!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST - Create or update a user profile
export async function POST(req) {
  try {
    const { userId: clerkUserId } =  await auth();

    if (!clerkUserId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const existingUser = await db.user.findUnique({ where: { clerkUserId } });

    const user = existingUser
      ? await db.user.update({ where: { clerkUserId }, data: body })
      : await db.user.create({ data: { ...body, clerkUserId } });

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH - Admin updates a user's role
export async function PATCH(req) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const adminUser = await db.user.findUnique({ where: { clerkUserId } });

    if (!adminUser || adminUser.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const { targetClerkUserId, newRole } = await req.json();

    const updatedUser = await db.user.update({
      where: { clerkUserId: targetClerkUserId },
      data: { role: newRole },
    });

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
