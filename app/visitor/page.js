"use client";

import { useRouter } from "next/navigation";
import QrScanner from "@/components/QrScanner";

export default function QrScanPage() {
  const router = useRouter();

  const handleScan = (decodedText) => {
    try {
      const url = new URL(decodedText);
      const token = url.searchParams.get("token");

      if (token) {
        router.push(`/dashboard/visitor/checkin?token=${token}`);
      } else {
        alert("Invalid QR Code: Token not found.");
      }
    } catch (e) {
      alert("Invalid QR Code format.");
      console.error(e);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Scan QR to Check In</h1>
      <QrScanner
        onScan={handleScan}
      />
    </div>
  );
}
