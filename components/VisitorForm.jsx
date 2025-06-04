"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export default function VisitorForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    visitingFlat: "",
    preApprovedBy: "",
    phoneNumber: "",
    purpose: "",
    visitingTime: "",
    vehicleNumber: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      onSuccess?.({
        visitorName: formData.name,
        phoneNumber: formData.phoneNumber,
        purpose: formData.purpose,
        flatNumber: formData.visitingFlat,
        residentName: formData.preApprovedBy,
        vehicleNumber: formData.vehicleNumber || null,
        imageUrl: formData.imageUrl || null,
      });
      setFormData({
        name: "",
        visitingFlat: "",
        preApprovedBy: "",
        phoneNumber: "",
        purpose: "",
        visitingTime: "",
        vehicleNumber: "",
        imageUrl: "",
      });
    } catch (err) {
      toast.error("Unexpected error.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Visitor Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="visitingFlat">Flat Number</Label>
        <Input
          id="visitingFlat"
          name="visitingFlat"
          value={formData.visitingFlat}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="preApprovedBy">Resident Name</Label>
        <Input
          id="preApprovedBy"
          name="preApprovedBy"
          value={formData.preApprovedBy}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone</Label>
        <Input
          id="phoneNumber"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="purpose">Visit Reason</Label>
        <Input
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="vehicleNumber">Vehicle Number (optional)</Label>
        <Input
          id="vehicleNumber"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="imageUrl">Image URL (optional)</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Preapprove Visitor"}
      </Button>
    </form>
  );
}
