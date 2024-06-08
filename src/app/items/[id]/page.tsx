import Link from "next/link";
import Image from "next/image";
import { type Metadata } from "next";
import { Rating } from "@smastrom/react-rating";
import { isPast, formatDistanceToNow } from "date-fns";
import { MdOutlineLanguage as LanguageIcon } from "react-icons/md";
import { CiClock1 as ClockIcon } from "react-icons/ci";

import { itemRetrieve } from "@/services/items";

import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

type Props = Readonly<{
  params: { id: string };
}>;

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const item = await itemRetrieve(params.id);

  return {
    title: item.title,
    description: item.headline,
    openGraph: {
      images: [
        {
          url: item.image,
          alt: item.title,
          width: 750,
          height: 422,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: item.image,
          alt: item.title,
          width: 750,
          height: 422,
        },
      ],
    },
  };
};

const page = async ({ params }: Props) => {
  const item = await itemRetrieve(params.id);

  const isEnded = isPast(new Date(item.ending));

  return (
    <section className="flex items-center justify-center">
      <div className="grid max-w-[750px] grid-cols-1 gap-3 py-4">
        <div className="text-sm font-semibold">
          <Link
            href={{
              pathname: "/items",
              query: { category: item.category },
            }}
            className="hover:underline"
          >
            {item.category}
          </Link>
          {"  >  "}
          <Link
            href={{
              pathname: "/items",
              query: { subcategory: item.subcategory },
            }}
            className="hover:underline"
          >
            {item.subcategory}
          </Link>
        </div>
        <div className="flex items-center justify-center ">
          <Image
            src={item.image}
            alt={item.title}
            width={750}
            height={422}
            className="rounded-md"
            priority
          />
        </div>
        <h1 className="text-xl font-bold md:text-2xl">{item.title}</h1>
        <h2 className="text-xs md:text-sm">{item.headline}</h2>
        <div className="flex flex-wrap items-center justify-start gap-1">
          <span className="font-sm font-semibold">
            {item.rating.toFixed(1)}
          </span>
          <Rating
            style={{ maxWidth: 90 }}
            value={item.rating}
            transition="zoom"
            readOnly
            className="mb-[3px]"
          />
          <span className="text-xs md:text-sm">
            ({item.reviews.toLocaleString()} reviews)
          </span>
          <span className="text-xs md:text-sm">
            {item.subscribers.toLocaleString()} subscribers
          </span>
        </div>
        <div className="flex items-center text-xs md:text-sm">
          <LanguageIcon className="mr-1 inline-block size-4" />
          {item.language}
        </div>
        <div className="my-4 flex flex-col gap-2">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black md:text-3xl">$0.00</span>
            <span className="text-light text-sm text-gray-400 line-through">
              ${item.price}
            </span>
            <span className="text-sm text-gray-500">100% off</span>
          </div>
          <div className="flex gap-1 text-[10px]">
            <span className="flex flex-wrap items-center gap-1">
              <ClockIcon className="inline-block size-3" />
              {isEnded ? "Ended" : "Ending"}{" "}
              {formatDistanceToNow(new Date(item.ending), {
                addSuffix: true,
              })}
            </span>
            <span>
              ({isEnded ? 0 : item.remaining.toLocaleString()} available)
            </span>
          </div>

          <Button asChild className="my-2 w-full">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Get coupon
            </a>
          </Button>
        </div>
        <div>
          <h3 className="my-2 text-lg font-bold">Description</h3>
          <article
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></article>
        </div>
      </div>
    </section>
  );
};

export default page;
