import _ from "lodash";
import type { Metadata } from "next";

import { itemList } from "@/services/items";
import { languageList } from "@/services/languages";
import { categoryList } from "@/services/categories";

import Filter from "@/components/Filter";
import ItemList from "@/components/ItemList";
import ItemPagination from "@/components/ItemPagination";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Coupons",
};

type Props = Readonly<{
  searchParams: Record<string, string>;
}>;

const Page = async ({ searchParams }: Props) => {
  const items = await itemList(searchParams);
  const languages = await languageList();
  const categories = await categoryList();

  return (
    <>
      <Filter
        searchParams={searchParams}
        languages={languages}
        categories={categories}
      />
      <section className="py-8">
        {_.isEmpty(items.results) ? (
          <p>No Items found</p>
        ) : (
          <ItemList items={items.results} />
        )}

        <ItemPagination
          next={items.next}
          previous={items.previous}
          nextLink={{
            pathname: "/items",
            query: { ...searchParams, page: items.current + 1 },
          }}
          previousLink={{
            pathname: "/items",
            query: { ...searchParams, page: items.current - 1 },
          }}
        />
      </section>
    </>
  );
};

export default Page;
