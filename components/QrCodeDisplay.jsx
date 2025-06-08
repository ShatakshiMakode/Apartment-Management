"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import { toast } from "react-hot-toast";

export default function QrCodeDisplay({
  qrCodeUrl,
  task = "visitor",
  name = "user",
}) {
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    try {
      const canvas = qrRef.current?.querySelector("canvas");

      if (!canvas) {
        toast.error("QR code not found!");
        return;
      }

      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      const today = new Date().toLocaleDateString("en-GB").split("/").join("-");
      downloadLink.download = `${task}-${name}-qr-code-${today}.png`;
      downloadLink.click();

      toast.success("QR code downloaded!");
    } catch (error) {
      toast.error("Something went wrong while downloading.");
      console.error("QR Download Error:", error);
    }
  };

  if (!qrCodeUrl) return null;

  return (
    <div
      className="flex items-center justify-center flex-col min-h-[60vh] p-6"
      ref={qrRef}
    >
      <QRCodeCanvas value={qrCodeUrl} size={250} />
      <p className="text-md text-gray-700 mt-4 font-medium">
        Show this QR code at the gate for verification.
      </p>
      <button
        onClick={downloadQRCode}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition"
      >
        Download QR Code
      </button>
    </div>
  );
}
