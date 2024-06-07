"use server";

import { authOptions } from "@/auth";
import { adminDb } from "@/firebase-admin";
import { auth } from "firebase-admin";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
});

export async function generatePortalLink() {
    const  session = await getServerSession(authOptions);
    const host = headers().get("host");

    if (!session?.user.id) return console.error("No se encuentra el Id del usuario");

    const {
        user: { id },
    } = session;

    const returnUrl =
        process.env.NODE_ENV === "development"
            ? `http://${host}/register`
            : `https://${host}/register`;

    const doc = await adminDb.collection("customers").doc(id).get();

    if (!doc.data)  return console.error("No se ha encontrado ningún cliente con el siguiente userID:", id);

    const stripeId = doc.data()!.stripeId;

    const stripeSession = await stripe.billingPortal.sessions.create({
        customer: stripeId,
        return_url: returnUrl,
    });

    redirect(stripeSession.url);
}