"use client";

import _ from "lodash";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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
    <NavigationMenuItem>
      <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-64 gap-2 p-2">
          {_.map(items, (item) => (
            <li key={item.id}>
              <Link
                href={{
                  pathname: "/items",
                  query: { [param]: item.name },
                }}
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

type LinkItemProps = Readonly<{ name: string; url: UrlObject }>;

const LinkItem = ({ name, url }: LinkItemProps) => {
  return (
    <Link href={url} className="px-4 text-sm font-medium hover:underline">
      {name}
    </Link>
  );
};

type Props = Readonly<{
  languages: Array<Language>;
  categories: Array<Category>;
}>;
const NavMenu = ({ languages, categories }: Props) => {
  return (
    <div className="hidden items-center md:flex">
      <LinkItem name="Home" url={{ pathname: "/" }} />
      <LinkItem name="Coupons" url={{ pathname: "/items" }} />
      <NavigationMenu>
        <NavigationMenuList>
          <Item name="Languages" param="language" items={languages} />
          <Item name="Categories" param="category" items={categories} />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavMenu;
