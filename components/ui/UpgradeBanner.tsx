'use client'

import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { Button } from "./button";

function UpgradeBanner() {

    const subscription = useSubscriptionStore(state => state.subscription);
    const isPro = subscription?.role === 'pro';
    const router = useRouter();

    console.log(subscription)
    if (subscription === undefined || isPro) return null;

  return (
    <Button
    onClick={() => router.push('/register')}
    className="w-full rounded-none bg-gradient-to-r from-[#FF1D1F] to-[#AB0329]
    text-center text-white px-5 py-2 hover:from-[#FF1D1F] hover:to-[#AB0329] hover-shadow-md hover:opacity-75"
    >
        ¡Actualiza a Pro para desbloquear todas las funciones!
    </Button>
  )
}

export default UpgradeBanner