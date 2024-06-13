'use client'

import LogoImage from "@logos/lo.png";
import Link from "next/link";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

function Logo() {
  return <Link href='/' prefetch={false} className="overflow-hidden">
    <div className="flex items-center w-20 h-20">
        <AspectRatio
        ratio={16 / 9}
        className="flex items-center justify-center">
            <Image
                priority
                src={LogoImage}
                alt="Logo"
            />
        </AspectRatio>
    </div>
  </Link>;
}

export default Logo