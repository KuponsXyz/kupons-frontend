import _ from "lodash";

import type { Item } from "@/types/item";

import ItemCard from "./ItemCard";

type Props = Readonly<{
  items: Array<Item>;
}>;

const ItemList = ({ items }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {_.map(items, (item) => (
        <ItemCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default ItemList;
