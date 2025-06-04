"use client";

import { useState } from "react";
import QrScanner from "@/components/QrScanner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VisitorScannerPage() {
  const [scanning, setScanning] = useState(false);
  const router = useRouter();

  const handleScan = async (qrUrl) => {
    setScanning(true);
    const url = new URL(qrUrl);
    const token = url.searchParams.get("token");

    if (!token) {
      toast.error("Invalid QR Code");
      setScanning(false);
      return;
    }

    try {
      const res = await fetch("/api/visitor/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Check-in successful: ${data.visitor.name}`);
        router.push("/dashboard/visitor"); // Go to list page
      } else {
        toast.error(data.message || "Check-in failed");
      }
    } catch (err) {
      toast.error("Check-in failed due to network error.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Visitor QR Scanner
      </h1>
      <QrScanner onScan={handleScan} />
    </div>
  );
}
