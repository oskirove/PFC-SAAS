import { CheckIcon } from "lucide-react";
import CheckoutButton from "./CheckoutButton";
import Link from "next/link";

const tiers = [
  {
    name: "Estándar",
    id: null,
    href: "#",
    priceMonthly: null,
    description: "Empieza a chatear ahora con quien quieras y donde quieras.",
    features: [
      "Límite de 300 Mensajes por Chat",
      "2 Participantes por Chat",
      "Límite de 3 Salas",
      "Admite 5 5diomas",
      "48 Horas de Asistencia",
    ],
  },
  {
    name: "Pro",
    id: "pro",
    href: "#",
    priceMonthly: "4.99€",
    description: "¡Libera todo tu potencial con Pro!",
    features: [
      "Mensages Ilimitados",
      "Participantes Ilimitados en las Salas",
      "Sin Límite de Chats",
      "Admite Hasta 10 Idiomas",
      "Soporte Multimedia en los Chats (próximamente)",
      "Tiempo de Asistencia Dedicado de 1 Hora",
      "Acceso Anticipado a Nuevas Funciones",
    ],
  },
];

function PricingCards({ redirect }: { redirect: boolean }) {
  return (
    <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
      {tiers.map((tier) => (
        <div
          key={tier.id}
          className="flex flex-col justify-between mb-20 rounded-3xl bg-white p-8 shadow-xl
          ring-1 ring-zinc-900/10 sm:p-10"
        >
          <div>
            <h3
              id={tier.id + tier.name}
              className="text-base font-semibold leading-7 text-orange-600"
            >
              {tier.name}
            </h3>
            <div className="mt-4 flex items-baseline gap-x-2">
              {tier.priceMonthly ? (
                <>
                  <span className="text-5xl font-bold tracking-tight text-zinc-900">
                    {tier.priceMonthly}
                  </span>
                  <span className="text-base font-semibold leading-7 text-zinc-600">
                    /mes
                  </span>
                </>
              ) : (
                <span className="text-5xl font-bold tracking-tight text-zinc-900">
                  Gratis
                </span>
              )}
            </div>
            <p className="mt-6 text-base leading-7 text-zinc-600">
              {tier.description}
            </p>
            <ul
              role="list"
              className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-orange-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          {redirect ? (
            <Link
              href='/register'
              className="mt-8 block rounded-md bg-orange-600 px-3.5 py-2 text-center text-sm font-semibold
              leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600
              cursor-pointer disabled:opacity-80"
            >
              Empieza Hoy Mismo
            </Link>
          ) : (
            tier.id && <CheckoutButton />
          )}
        </div>
      ))}

    </div>
  )
}

export default PricingCards