"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


export default function FacilityBookingPage() {
  const { user } = useUser();
const [form, setForm] = useState({
  facility: "",
  startDateTime: "",
  endDateTime: "",
  reason: "",
});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/facilityBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
  facility: form.facility,
  startDateTime: form.startDateTime,
  endDateTime: form.endDateTime,
  reason: form.reason,
}),
      });

      const data = await res.json();
      console.log("Server Response:", data);

      if (!res.ok) {
        if (res.status === 409) {
          toast.error(
            "🚫 Time slot already booked! Please pick a different time.",
            {
              style: {
                background: "#ffe4e6",
                color: "#b91c1c",
                border: "1px solid #fca5a5",
              },
              icon: "📅",
              duration: 5000,
            }
          );
        } else if (res.status === 400) {
          toast.error(data.error || "⚠️ Please fill all fields properly.", {
            style: {
              background: "#fff7ed",
              color: "#b45309",
              border: "1px solid #fcd34d",
            },
            icon: "📝",
            duration: 4000,
          });
        } else if (res.status === 401) {
          toast.error("🔒 Please log in to make a booking.", {
            style: {
              background: "#ede9fe",
              color: "#6b21a8",
              border: "1px solid #c4b5fd",
            },
            icon: "🔑",
            duration: 4000,
          });
        } else {
          toast.error(data.error || "😵 Something went wrong!", {
            style: {
              background: "#fef2f2",
              color: "#7f1d1d",
              border: "1px solid #fecaca",
            },
            icon: "❌",
            duration: 4000,
          });
        }
        return;
      }

      toast.success("✅ Facility booked successfully!", {
        style: {
          background: "#dcfce7",
          color: "#166534",
          border: "1px solid #86efac",
        },
        icon: "🎉",
        duration: 4000,
      });

      setForm({ facility: "", startDateTime: "", endDateTime: "", reason: "" });0
    } catch (err) {
      console.error("Client Error:", err);
      toast.error("⚠️ Network error. Please try again later.", {
        style: {
          background: "#fefce8",
          color: "#92400e",
          border: "1px solid #fde68a",
        },
        icon: "📡",
        duration: 4000,
      });
    }
  };
  

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-2xl bg-blue-100 text- border-gray-700 shadow-2xl rounded-2xl p-6">
        <CardHeader className="mb-4">
          <CardTitle className="text-3xl text-center font-bold">
            Book a Facility
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Facility */}
            <div>
              <Label htmlFor="facility">Facility</Label>
              <Select
                onValueChange={(value) => setForm({ ...form, facility: value })}
              >
                <SelectTrigger className="bg-blue-300 border-blue-700 text-black">
                  <SelectValue placeholder="Select Facility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GYM">Gym</SelectItem>
                  <SelectItem value="SWIMMING_POOL">Swimming Pool</SelectItem>
                  <SelectItem value="CLUBHOUSE">Clubhouse</SelectItem>
                  <SelectItem value="BANQUET_HALL">Banquet Hall</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Start */}
<div>
  <Label htmlFor="start">Start&nbsp;Date&nbsp;&amp;&nbsp;Time</Label>
  <Input
    type="datetime-local"
    id="start"
    value={form.startDateTime}
    onChange={(e) =>
      setForm({ ...form, startDateTime: e.target.value })}
    required
    className="bg-blue-300 border-blue-700"
  />
</div>

{/* End */}
<div>
  <Label htmlFor="end">End&nbsp;Date&nbsp;&amp;&nbsp;Time</Label>
  <Input
    type="datetime-local"
    id="end"
    value={form.endDateTime}
    onChange={(e) =>
      setForm({ ...form, endDateTime: e.target.value })}
    required
    className="bg-blue-300 border-blue-700"
  />
</div>
<div>
  <Label htmlFor="reason">Reason / Extra info</Label>
  <textarea
    id="reason"
    rows={3}
    placeholder="Why are you booking? (optional)"
    value={form.reason}
    onChange={(e) => setForm({ ...form, reason: e.target.value })}
    className="w-full bg-blue-300 border-blue-700 rounded-md p-2"
  />
</div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-lg font-semibold rounded-md transition duration-300 cursor-pointer"
            >
              Book Facility
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
