"use client";

import { useState, useEffect } from "react";
import _ from "lodash";
import Link from "next/link";

import type { Language } from "@/types/language";
import type { Category } from "@/types/category";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const orderings: Record<string, string> = {
  created: "Most recent",
  subscribers: "Most popular",
  ending: "Ending soon",
  remaining: "Uses remaining",
  reviews: "Most reviewed",
  rating: "Most rated",
};

type Props = Readonly<{
  searchParams: Record<string, string>;
  languages: Array<Language>;
  categories: Array<Category>;
}>;

const Filter = ({ searchParams, languages, categories }: Props) => {
  const [filter, setFilter] = useState<Record<string, string>>({
    ordering: "",
    language: "",
    category: "",
  });

  useEffect(() => {
    setFilter(searchParams);
    return () => setFilter({});
  }, [searchParams]);

  const filteredParams = _.pickBy(filter, (value) => value !== "");

  return (
    <section className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
      {/* Sort By */}
      <Select
        value={filter.ordering || ""}
        onValueChange={(value) => setFilter({ ...filter, ordering: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {_.map(_.keys(orderings), (ordering) => (
            <SelectItem key={ordering} value={ordering}>
              {_.startCase(orderings[ordering])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Language */}
      <Select
        value={filter.language || ""}
        onValueChange={(value) => setFilter({ ...filter, language: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {_.map(languages, (language) => (
            <SelectItem key={language.id} value={language.name}>
              {language.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Category */}
      <Select
        value={filter.category || ""}
        onValueChange={(value) => setFilter({ ...filter, category: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {_.map(categories, (category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Filter Button */}
      <div className="grid grid-cols-2 gap-2">
        <Button asChild>
          <Link
            href={{
              pathname: "/items",
              query: { ...searchParams, ...filteredParams, page: 1 }, // Reset page to 1
            }}
          >
            Filter
          </Link>
        </Button>

        {/* Reset Button */}
        <Button
          asChild
          variant="outline"
          onClick={() =>
            setFilter({ ordering: "", language: "", category: "" })
          }
        >
          <a href="/items">Reset</a>
        </Button>
      </div>
    </section>
  );
};

export default Filter;
