import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      console.error("Missing STRIPE_SECRET_KEY");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16" as any,
    });

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "MotivAI - Génération de lettre de motivation",
              description: "Une lettre de motivation premium, personnalisée et optimisée pour l'ATS.",
            },
            unit_amount: 199, // 1.99 EUR
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/generate?paid=true`,
      cancel_url: `${origin}/generate`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
