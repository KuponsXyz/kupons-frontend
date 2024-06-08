import _ from "lodash";

import type { Item } from "@/types/item";
import type { Pagination } from "@/types/pagination";

import { API_URL } from "@/conf/keys";

const url = `${API_URL}/items/`;

export const itemList = async (
  params?: Record<string, string>,
): Promise<Pagination<Item>> => {
  const searchParams = new URLSearchParams(params).toString()
  const res = await fetch(`${url}?${searchParams}`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to fetch data");
  return (await res.json()) as Promise<Pagination<Item>>;
};

export const itemRetrieve = async (id: string): Promise<Item> => {
  const res = await fetch(`${url}${id}/`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to fetch data");
  return (await res.json()) as Promise<Item>;
};
