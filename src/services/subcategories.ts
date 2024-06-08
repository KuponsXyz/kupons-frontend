import { API_URL } from "@/conf/keys";

import type { Subcategory } from "@/types/subcategory";

const url = `${API_URL}/subcategories/`;

export const subcategoryList = async (): Promise<Array<Subcategory>> => {
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to fetch data");
  return (await res.json()) as Promise<Array<Subcategory>>;
};
