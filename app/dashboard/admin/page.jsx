// File: app/dashboard/admin/page.jsx

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const user = await currentUser();
  console.log("✅ Clerk currentUser:", user);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log("✅ NEXT_PUBLIC_BASE_URL:", baseUrl);

  if (!baseUrl) {
    console.error("❌ Environment variable NEXT_PUBLIC_BASE_URL is undefined!");
    return <div>Error: Server misconfiguration.</div>;
  }

  let data;

  try {
    const res = await fetch(`${baseUrl}/api/me`, {
      headers: {
        Cookie: `__session=${user?.sessionId}`,
      },
      cache: "no-store",
    });

    data = await res.json();
    console.log("✅ /api/me response:", data);
  } catch (err) {
    console.error("❌ Failed to fetch /api/me:", err);
    return <div>Error fetching user metadata.</div>;
  }

  if (!data?.user) {
    console.warn("⚠️ No user returned from /api/me");
  } else if (data.user.role !== "ADMIN") {
    console.warn("⚠️ User is not an admin:", data.user.role);
  }

  if (!data?.user || data.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">
        Admin Control Panel
      </h1>
      <p className="text-gray-700">
        Welcome, Admin. Here you can manage everything.
      </p>

      {/* Add your management sections below */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 border border-gray-200 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p className="text-sm text-gray-600">Add, remove or update users.</p>
        </div>
        <div className="p-6 border border-gray-200 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Society Settings</h2>
          <p className="text-sm text-gray-600">
            Configure rules, timings and more.
          </p>
        </div>
        <div className="p-6 border border-gray-200 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Visitor Logs</h2>
          <p className="text-sm text-gray-600">
            View or export visitor history.
          </p>
        </div>
        <div className="p-6 border border-gray-200 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Maintenance Requests</h2>
          <p className="text-sm text-gray-600">
            Track and assign maintenance tasks.
          </p>
        </div>
      </div>
    </main>
  );
}
