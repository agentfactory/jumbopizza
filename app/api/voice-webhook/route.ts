import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('Voice order received:', body);
  // Parse voice order and store same as web order
  const orderId = `JP-VOICE-${Date.now()}`;
  return NextResponse.json({ success: true, orderId });
}
