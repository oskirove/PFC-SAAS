'use client'

import LogoImage from "@logos/lo.png";
import Link from "next/link";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

function Logo() {
  return <Link href='/' prefetch={false} className="overflow-hidden">
    <div className="flex items-center w-72 h-14">
        <AspectRatio
        ratio={16 / 9}
        className="flex items-center justify-center">
            <Image
                priority
                src={LogoImage}
                alt="Logo"
                className="dark:filter dark:invert"
            />
        </AspectRatio>
    </div>
  </Link>;
}

export default Logo