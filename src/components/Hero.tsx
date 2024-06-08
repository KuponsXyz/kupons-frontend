"use client";

import _ from "lodash";
import Link from "next/link";
import Image from "next/image";

import type { Item } from "@/types/item";
import { cn } from "@/lib/utils";

type Props = Readonly<{
  items: Array<Item>;
}>;

const Hero = ({ items }: Props) => {
  return (
    <section className="row-span-3 grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-4">
      {_.map(_.slice(items, 0, 9), (item, index) => (
        <Link
          href={`/items/${item.id}`}
          key={item.id}
          className={`relative overflow-clip rounded-md ${
            index === 1 && cn("lg:col-span-2 lg:row-span-2")
          }`}
        >
          <Image
            priority
            src={item.image}
            alt={item.title}
            width={750}
            height={422}
            className="h-full w-full bg-cover bg-center bg-no-repeat object-cover"
          />
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-start justify-end bg-gradient-to-t from-gray-800 to-transparent to-40%">
            <span
              className={`line-clamp-2 p-2 text-xs font-medium text-gray-200 ${
                index === 1 && cn("lg:text-xl ")
              }`}
            >
              {item.title}
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default Hero;
