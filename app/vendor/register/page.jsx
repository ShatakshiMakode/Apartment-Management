"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QrCodeDisplay from "@/components/QrCodeDisplay";

export default function VendorRegisterPage() {
  const [form, setForm] = useState({
    name: "",
    service: "",
    contact: "",
    email: "",
    gender: "",
    imageUrl: "",
  });
  const [qrCode, setQrCode] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch("/api/vendor/register", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setQrCode(data.qrCodeUrl);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4 font-bold">📝 Register Vendor</h1>
      <div className="space-y-4">
        {Object.keys(form).map((field) => (
          <Input
            key={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
        <Button onClick={handleSubmit}>Register & Generate QR</Button>
        {qrCode && <QrCodeDisplay qrCodeUrl={qrCode} task="vendor" name={form.name} />}
      </div>
    </div>
  );
}
