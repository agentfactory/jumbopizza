import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const orderId = `JP-${Date.now()}`;
  // In production: save to Supabase. For MVP: log and return.
  console.log('New order:', orderId, body);
  return NextResponse.json({
    success: true,
    orderId,
    estimatedTime: body.orderType === 'delivery' ? '30-45 min' : '20-30 min',
  });
}
