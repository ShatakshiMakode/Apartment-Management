"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link"; // import Link from next/link

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
          <Link href="../Facilities" passHref legacyBehavior>
            <a>
              <Section
                title="Facility Booking"
                description="Book the community hall or gym."
              />
            </a>
          </Link>
        )}

        {/* Visitor Management (only for watchman, secretary, admin) */}
        {(role === "watchman" || role === "secretary" || role === "admin") && (
          <Link href="../visitors" passHref legacyBehavior>
            <a>
              <Section
                title="Visitor Management"
                description="Log visitor entries and update counts."
              />
            </a>
          </Link>
        )}

        {/* Payment Reports (secretary, admin only) */}
        {(role === "secretary" || role === "admin") && (
          <Link href="../billing" passHref legacyBehavior>
            <a>
              <Section
                title="Payment Reports"
                description="View & export payment data."
              />
            </a>
          </Link>
        )}

        {/* Noticeboard Management (secretary, admin only) */}
        {(role === "secretary" || role === "admin") && (
          <Link href="../notice-board" passHref legacyBehavior>
            <a>
              <Section
                title="Noticeboard Management"
                description="Post and manage notices for residents."
              />
            </a>
          </Link>
        )}

        {/* Role Management (admin only) */}
        {role === "admin" && (
          <Link href="/role-management" passHref legacyBehavior>
            <a>
              <Section
                title="Role & Society Management"
                description="Assign and manage roles across societies."
              />
            </a>
          </Link>
        )}

        {/* Accounting Section (not for watchman) */}
        {role !== "watchman" && (
          <Link href="../Accounting" passHref legacyBehavior>
            <a>
              <Section
                title="End-to-End Accounting"
                description="Track income & expenses, manage financials."
              />
            </a>
          </Link>
        )}

        {/* Alerts Section (not for watchman) */}
        {role !== "watchman" && (
          <Link href="../Alerts" passHref legacyBehavior>
            <a>
              <Section
                title="Emergency Alerts"
                description="Broadcast urgent notifications to residents."
              />
            </a>
          </Link>
        )}

        {/* Features Section (visible to all) */}
        <Link href="../Features" passHref legacyBehavior>
          <a>
            <Section
              title="Features"
              description="Explore all tools and features AppSociety offers."
            />
          </a>
        </Link>

        {/* Reports Section (secretary and admin only) */}
        {(role === "secretary" || role === "admin") && (
          <Link href="../Reports" passHref legacyBehavior>
            <a>
              <Section
                title="Financial Reports"
                description="Generate and view financial statements."
              />
            </a>
          </Link>
        )}

        {/* Polls Section (not for watchman) */}
        {role !== "watchman" && (
          <Link href="../Polls" passHref legacyBehavior>
            <a>
              <Section
                title="Polls & Voting"
                description="Create and manage community polls."
              />
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}

function Section(props) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">
        {props.title}
      </h2>
      <p className="text-gray-600">{props.description}</p>
    </div>
  );
}
