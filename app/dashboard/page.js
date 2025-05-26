"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import clsx from "clsx";

const sampleNotices = [
  "Water supply will be off from 2 PM to 5 PM.",
  "Maintenance charges due by 30th May.",
  "Annual General Meeting on 15th June at 5 PM.",
  "New security staff onboarding tomorrow.",
];

export default function Dashboard() {
  const { user } = useUser();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sampleNotices.length);
    }, 3000); // 3 seconds each notice
    return () => clearInterval(interval);
  }, []);

  const role = user?.publicMetadata?.role; // Example: "watchman", "resident", "secretary", "admin"

  return (
    <div className="min-h-screen px-4 py-8 bg-blue-50">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">
        Welcome, {user?.firstName}!
      </h1>

      {/* Notice Marquee */}
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 mb-6">
        <marquee behavior="scroll" direction="left" scrollamount="5">
          {sampleNotices[index]}
        </marquee>
          </div>

      {/* Sections based on Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Facility Booking (not for watchmen) */}
        {role !== "watchman" && (
          <Section
            title="Facility Booking"
            description="Book the community hall or gym."
          />
        )}

        {/* Visitor Management (only for watchman, secretary, admin) */}
        {(role === "watchman" || role === "secretary" || role === "admin") && (
          <Section
            title="Visitor Management"
            description="Log visitor entries and update counts."
          />
        )}

        {/* Payment Reports (secretary, admin only) */}
        {(role === "secretary" || role === "admin") && (
          <Section
            title="Payment Reports"
            description="View & export payment data."
          />
        )}

        {/* Noticeboard Management (secretary, admin only) */}
        {(role === "secretary" || role === "admin") && (
          <Section
            title="Noticeboard Management"
            description="Post and manage notices for residents."
          />
        )}

        {/* Role Management (admin only) */}
        {role === "admin" && (
          <Section
            title="Role & Society Management"
            description="Assign and manage roles across societies."
          />
        )}
      </div>
    </div>
  );
}

function Section(props) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">{props.title}</h2>
      <p className="text-gray-600">{props.description}</p>
    </div>
  );
}
