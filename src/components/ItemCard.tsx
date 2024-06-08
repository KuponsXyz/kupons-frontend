import _ from "lodash";
import Link from "next/link";
import Image from "next/image";
import millify from "millify";
import { formatDistanceToNow } from "date-fns";

import { Rating } from "@smastrom/react-rating";

import type { Item } from "@/types/item";

type Props = Readonly<{
  item: Item;
}>;

const ItemCard = ({ item }: Props) => {
  return (
    <Link
      href={`/items/${item.id}`}
      className="relative overflow-clip rounded-md shadow-md"
    >
      <div className="absolute left-0 top-0 flex w-full items-center justify-between text-[10px] text-gray-400 [&>*]:bg-gray-800 [&>*]:px-2 [&>*]:py-[2px] [&>*]:font-light">
        <span className="rounded-br-md">
          {formatDistanceToNow(new Date(item.ending), {
            addSuffix: true,
          })}
        </span>
        <span className="rounded-bl-md">
          {millify(item.remaining)} remaining
        </span>
      </div>
      <Image
        priority
        src={item.image}
        alt={item.title}
        width={750}
        height={422}
        className="bg-cover bg-center object-cover"
      />
      <div className="grid grid-cols-1 gap-1 p-2">
        <div>
          <span className="line-clamp-2 h-8 text-sm font-semibold leading-4">
            {item.title}
          </span>
        </div>
        <div>
          <span className="line-clamp-1 text-[10px] font-light text-gray-600">
            {item.category} {">"} {item.subcategory}
          </span>
        </div>
        <div className="flex items-center justify-start">
          <span className="text-xs font-medium">{item.rating.toFixed(1)}</span>
          <div className="mx-1 mb-[3px]">
            <Rating
              style={{ maxWidth: 70 }}
              value={item.rating}
              transition="zoom"
              readOnly
            />
          </div>
          <span className="text-[10px] font-light text-gray-600">
            ({millify(item.reviews)} reviews)
          </span>
        </div>
        <div className="line-clamp-1 flex text-[10px] font-light text-gray-600">
          <span className="">{item.language} </span>
          <span className="mx-1">({millify(item.subscribers)} students)</span>
        </div>
        <div className="line-clamp-1 text-xs font-medium">
          <span>
            Free
            <span className="ml-1 font-extralight text-gray-600 line-through">
              ${item.price}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
