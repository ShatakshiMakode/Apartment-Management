"use client";

import { useEffect, useState } from "react";

export default function VisitorListPage() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetch("/api/visitor/list")
      .then((res) => res.json())
      .then((data) => setVisitors(data.visitors));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Visitors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visitors.map((v) => (
          <div
            key={v.id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <p className="text-lg font-semibold">{v.name}</p>
            <p className="text-sm text-gray-600">
              Flat: {v.visitingFlat?.flatNumber} | Visiting: {v.visitingFlat?.resident?.name || "N/A"}
            </p>
            <p
              className={`mt-2 font-medium ${
                v.status === "checked-in"
                  ? "text-green-600"
                  : v.status === "pending"
                  ? "text-yellow-600"
                  : "text-gray-600"
              }`}
            >
              Status: {v.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
