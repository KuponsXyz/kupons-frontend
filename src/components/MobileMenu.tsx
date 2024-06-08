"use client";

import _ from "lodash";
import { MdMenu as MenuIcon } from "react-icons/md";
import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  // SheetDescription,
  // SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { Language } from "@/types/language";
import type { Category } from "@/types/category";
import type { UrlObject } from "url";

type ItemProps = Readonly<{
  name: string;
  param: string;
  items: Array<Language | Category>;
}>;

const Item = ({ name, param, items }: ItemProps) => {
  return (
    <AccordionItem value={name}>
      <AccordionTrigger className="text-xl">{name}</AccordionTrigger>
      <AccordionContent className="grid gap-2">
        {_.map(items, (item) => (
          <SheetClose
            key={item.id}
            className="w-full rounded-md px-2 py-2 hover:bg-gray-200 hover:underline"
            asChild
          >
            <Link
              href={{
                pathname: "/items",
                query: { [param]: item.name },
              }}
            >
              {item.name}
            </Link>
          </SheetClose>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

type LinkItemProps = Readonly<{ name: string; url: UrlObject }>;

const LinkItem = ({ name, url }: LinkItemProps) => {
  return (
    <>
      <SheetClose className="block py-3 hover:underline" asChild>
        <Link href={url} className="text-xl font-medium">
          {name}
        </Link>
      </SheetClose>
      <Separator />
    </>
  );
};

type Props = Readonly<{
  languages: Array<Language>;
  categories: Array<Category>;
}>;

const MobileMenu = ({ languages, categories }: Props) => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <MenuIcon size={32} />
        </SheetTrigger>
        <SheetContent side="left" className="overflow-y-scroll py-8">
          <LinkItem name="Home" url={{ pathname: "/" }} />
          <LinkItem name="Coupons" url={{ pathname: "/items" }} />

          <Accordion type="multiple">
            <Item name="Languages" param="language" items={languages} />
            <Item name="Categories" param="category" items={categories} />
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
