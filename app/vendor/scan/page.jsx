"use client";
import QrScanner from "@/components/QrScanner";

export default function VendorScanPage() {
  const handleScan = async (vendorId) => {
    const res = await fetch("/api/vendor/scan", {
      method: "POST",
      body: JSON.stringify({ vendorId }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔍 Vendor QR Scanner</h1>
      <QrScanner onScan={handleScan} />
    </div>
  );
}
