import { NextResponse } from "next/server";
import { validateAndResolvePinCode } from "@/lib/commerce/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pincode = searchParams.get("pincode") || "";

  const result = validateAndResolvePinCode(pincode);

  if (!result.valid) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid 6-digit Indian PIN code." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    ...result,
  });
}
