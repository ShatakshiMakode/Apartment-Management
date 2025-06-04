"use client";

import VisitorForm from "@/components/VisitorForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewVisitorPage() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch("/api/visitor/preapprove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Visitor pre-approved successfully!");
        const visitorId = data.visitor.id;
        router.push(`/dashboard/visitor/${visitorId}`);
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to submit visitor");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manually Add Visitor</h1>
      <VisitorForm onSuccess={handleSubmit} />
    </div>
  );
}
