import PricingCards from "@/components/ui/PricingCards";

function PricingPage() {
    return (
        <div className="isolate overflow-hidden bg-zinc-900">
            <div className="mx-auto max-w-7xl px-6 pt-24 text-center sm:pt-32 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-base font-semibold leading-7 text-orange-400">
                        Planes
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        El precio adecuado para ti,{" "}
                        <br className="hidden sm:inline lg:hidden" />
                        sea quien seas
                    </p>
                </div>
                <div className="relative mt-6">
                    <p className="mx-auto max-w-2xl text-lg leading-8 text-white/60">
                        Estamos 99% seguros de que tenemos un plan que te satisfará al 100%
                    </p>
                    <svg
                        viewBox="0 0 1208 1024"
                        className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
                    >
                        <ellipse
                            cx={604}
                            cy={512}
                            fill="url(#radial-gradient)"
                            rx={604}
                            ry={512}
                        />
                        <defs>
                            <radialGradient id="radial-gradient">
                                <stop stopColor="#FF1D1F" />
                                <stop offset={1} stopColor="#AB0329" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
            <div className="mt-20">
                <PricingCards redirect={true} />
            </div>
        </div>
    );
}
export default PricingPage;
