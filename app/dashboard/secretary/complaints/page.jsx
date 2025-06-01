"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ComplaintStatusColors = {
  OPEN: "bg-yellow-200",
  IN_PROGRESS: "bg-blue-200",
  CLOSED: "bg-green-200",
};

export default function SecretaryComplaintsPage() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await axios.get("/api/secretary/complaints");
        setComplaints(data);
      } catch (err) {
        toast.error("Failed to load complaints");
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`/api/secretary/complaints/${id}`, {
        status: newStatus,
      });
      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      toast.success("Status updated!");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Complaints in Your Society</h1>
      {complaints.length === 0 && <p>No complaints yet.</p>}

      {complaints.map((complaint) => (
        <Card key={complaint.id} className="shadow-lg border rounded-xl">
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">{complaint.title}</h2>
            <p className="text-sm text-gray-500 italic">{complaint.type}</p>
            <p className="text-gray-800">{complaint.description}</p>

            <div className="flex justify-between items-center pt-2">
              <Badge
                className={`${
                  ComplaintStatusColors[complaint.status]
                } px-3 py-1`}
              >
                {complaint.status.replace("_", " ")}
              </Badge>
              <div className="space-x-2">
                {complaint.status !== "CLOSED" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleStatusUpdate(complaint.id, "IN_PROGRESS")
                      }
                    >
                      In Progress
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleStatusUpdate(complaint.id, "CLOSED")}
                    >
                      Close
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
