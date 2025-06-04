import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      visitorName,
      phoneNumber,
      vehicleNumber, // Optional
      purpose,
      flatNumber,
      residentName,
      imageUrl, // Optional
    } = body;

    // Find the flat and resident user by flat number and resident name
    const flat = await db.flat.findFirst({
      where: {
        flatNumber,
        resident: {
          OR: [
            { name: residentName },
            { firstName: residentName },
            { lastName: residentName },
          ],
        },
      },
      include: {
        resident: true,
      },
    });

    if (!flat || !flat.resident) {
      return NextResponse.json(
        { error: "Resident or flat not found." },
        { status: 404 }
      );
    }

    // Generate QR code token
    const qrCodeToken = nanoid(32);

    // Create the visitor record
    const visitor = await db.visitor.create({
      data: {
        name: visitorName,
        phoneNumber,
        vehicleNumber: vehicleNumber || null,
        purpose,
        visitingFlatId: flat.id,
        preApprovedByUserId: flat.resident.id,
        status: "PENDING",
        qrCodeToken,
        imageUrl: imageUrl || null,
      },
    });

    const qrCodeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/visitor/checkin?token=${qrCodeToken}`;

    return NextResponse.json({ visitor, qrCodeUrl });
  } catch (err) {
    console.error("Pre-approval Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
