import { API_URL } from "@/conf/keys";

import type { Category } from "@/types/category";

const url = `${API_URL}/categories/`;

export const categoryList = async (): Promise<Array<Category>> => {
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to fetch data");
  return (await res.json()) as Promise<Array<Category>>;
};
