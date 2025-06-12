"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";

export default function AdminRequestForm() {
  const [form, setForm] = useState({
    apartmentName: "",
    totalFlats: "",
    address: "",
    registrationNumber: "",
    phoneNumber: "",
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => { 
      try {
        const res = await fetch("/api/users/me");
        if (!res.ok) throw new Error("User fetch failed");
        const data = await res.json();
          setUser(data);
          console.log("User data:", data);
        setForm((prev) => ({
          ...prev,
          name: data.firstName + " " + data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber || "",
        }));
      } catch (err) {
        toast.error("Failed to load user data");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/society-admin/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(" Admin request submitted. Wait for approval.");
      } else {
        toast.error(data.error || "❌ Something went wrong.");
      }
    } catch (err) {
      toast.error("❌ Request failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">🏢 Request Admin Access</h1>
      {user && (
        <p className="text-gray-600 text-center">Welcome, {user.firstName}!</p>
      )}
      <div className="text-center"> Currently your role is : {user?.role} </div>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="apartmentName">Society / Apartment Name</Label>
          <Input
            name="apartmentName"
            value={form.apartmentName}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input name="address" value={form.address} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            name="phoneNumber"
            placeholder="Enter your phone number"
            type="tel"
            pattern="[0-9]{10}"
            value={form.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input
            name="registrationNumber"
            value={form.registrationNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="totalFlats">Total Flats</Label>
          <Input
            name="totalFlats"
            type="number"
            value={form.totalFlats}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button onClick={handleSubmit} className="mt-4">
        Submit Request
      </Button>
    </div>
  );
}
