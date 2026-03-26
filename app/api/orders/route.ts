import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    items,
    subtotal,
    tax,
    total,
    orderType,
    customerName,
    phone,
    address,
    instructions,
  } = body;

  // Generate short human-readable order number
  const orderNumber = `JP-${Date.now().toString(36).toUpperCase()}`;

  // Create pending order in DB first
  const order = await prisma.order.create({
    data: {
      orderNumber,
      orderType,
      customerName,
      phone,
      address: address || null,
      instructions: instructions || null,
      subtotal,
      tax,
      total,
      source: "WEB",
      items: {
        create: items.map((item: {
          name: string;
          size?: string;
          crust?: string;
          stuffedCrust?: string;
          sauces?: string[];
          quantity: number;
          unitPrice: number;
          notes?: string;
        }) => ({
          name: item.name,
          size: item.size || null,
          crust: item.crust || null,
          stuffedCrust: item.stuffedCrust || null,
          sauces: item.sauces?.join(", ") || null,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          notes: item.notes || null,
        })),
      },
    },
  });

  // Create Stripe Checkout session
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    currency: "cad",
    line_items: items.map((item: {
      name: string;
      size?: string;
      quantity: number;
      unitPrice: number;
    }) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.size ? `${item.name} (${item.size})` : item.name,
        },
        unit_amount: Math.round(item.unitPrice * 100), // cents
      },
      quantity: item.quantity,
    })).concat([{
      price_data: {
        currency: "cad",
        product_data: { name: "HST (13%)" },
        unit_amount: Math.round(tax * 100),
      },
      quantity: 1,
    }]),
    metadata: {
      orderId: order.id,
      orderNumber,
      customerName,
      phone,
      orderType,
    },
    customer_email: undefined,
    success_url: `${appUrl}/order/confirmation/${order.id}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/order`,
  });

  // Save Stripe session ID
  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: session.id },
  });

  return NextResponse.json({
    success: true,
    orderId: order.id,
    orderNumber,
    checkoutUrl: session.url,
  });
}
