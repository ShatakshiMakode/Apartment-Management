"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

export default function QrCodeDisplay({ qrCodeUrl }) {
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "visitor-qr-code.png";
    downloadLink.click();
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
