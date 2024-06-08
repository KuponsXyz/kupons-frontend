import { API_URL } from "@/conf/keys";

import type { Language } from "@/types/language";

const url = `${API_URL}/languages/`;

export const languageList = async (): Promise<Array<Language>> => {
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to fetch data");
  return (await res.json()) as Promise<Array<Language>>;
};
