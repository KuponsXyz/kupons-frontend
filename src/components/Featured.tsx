import _ from "lodash";
import Link from "next/link";
import type { UrlObject } from "url";

import type { Item } from "@/types/item";
import { Button } from "./ui/button";
import ItemList from "./ItemList";

type Props = Readonly<{
  name: string;
  url: UrlObject;
  items: Array<Item>;
}>;

const Featured = ({ name, url, items }: Props) => {
  return (
    <section className="grid gap-4 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <Button variant="outline" asChild>
          <Link href={url} className="text-sm hover:underline">
            See more
          </Link>
        </Button>
      </div>
      <ItemList items={_.slice(items, 0, 8)} />
    </section>
  );
};

export default Featured;
