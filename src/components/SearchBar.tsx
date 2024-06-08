"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import _ from "lodash";
import Link from "next/link";
import Image from "next/image";
import { MdSearch as SearchIcon } from "react-icons/md";

import { Item } from "@/types/item";
import { API_URL } from "@/conf/keys";
import type { Pagination } from "@/types/pagination";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState<Array<Item>>([]);

  const searchQuery = searchParams.get("search");

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    return () => {
      setSearch("");
      setSearchItems([]);
    };
  }, [searchQuery, searchParams]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;

    const params = new URLSearchParams({ search }).toString();
    router.push(`/items?${params}`);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearch(value);

    if (!value) {
      setSearchItems([]);
      return;
    }
    const params = new URLSearchParams({ search: value }).toString();
    const response = await fetch(`${API_URL}/items/?${params}`);
    const data: Pagination<Item> = await response.json();
    setSearchItems(data.results);
  };

  return (
    <div className="relative w-full">
      <form noValidate onSubmit={submitHandler} className="relative">
        <Input
          type="text"
          placeholder="Search..."
          className="rounded-md py-5 pl-6 text-xs"
          value={search}
          onChange={handleChange}
        />
        <SearchIcon
          size={20}
          className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <Button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 px-4 text-xs md:px-8"
        >
          Search
        </Button>
      </form>

      {searchItems.length > 0 && (
        <div className="absolute left-0 top-12 z-20 grid w-full grid-cols-1 gap-2 rounded-md border-2 border-gray-200 bg-white shadow-md">
          {_.map(_.slice(searchItems, 0, 4), (item) => (
            <Link
              key={item.id}
              href={`/items/${item.id}`}
              className="flex overflow-clip rounded-md p-2 transition-all hover:bg-gray-200"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={750}
                height={422}
                className="mr-2 h-full max-w-24 bg-cover bg-center bg-no-repeat object-cover"
              />
              <div>
                <span className="text-xs font-semibold">{item.title}</span>
                <div className="flex flex-col text-[10px] font-light">
                  <span>{item.language}</span>
                  <span>
                    {item.category} {">"} {item.subcategory}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
