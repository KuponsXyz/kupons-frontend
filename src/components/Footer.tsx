import _ from "lodash";

import { categoryList } from "@/services/categories";
import { languageList } from "@/services/languages";

import Logo from "./Logo";

type FooterLink = Readonly<{
  name: string;
  url: string;
}>;

type FooterLinksProps = Readonly<{
  name: string;
  items: Array<FooterLink>;
}>;

const FooterLinks = ({ name, items }: FooterLinksProps) => {
  return (
    <div className="py-4">
      <h5 className="pb-2 font-semibold text-gray-200">{name}</h5>
      <div className="flex flex-col gap-1">
        {_.map(items, (item) => (
          <a
            href={item.url}
            key={item.name}
            className="text-sm text-gray-400 hover:underline"
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

const Footer = async () => {
  const categories = await categoryList();
  const languages = await languageList();

  const links: Array<FooterLinksProps> = [
    {
      name: "Languages",
      items: _.map(languages, (language) => ({
        name: language.name,
        url: `/items?language=${language.name}`,
      })),
    },
    {
      name: "Categories",
      items: _.map(categories, (category) => ({
        name: category.name,
        url: `/items?category=${category.name}`,
      })),
    },
    {
      name: "Links",
      items: [
        {
          name: "Home",
          url: "/",
        },
        {
          name: "Coupons",
          url: "/items",
        },
        {
          name: "Contact us",
          url: "/contact-us",
        },
        {
          name: "Privacy Policy",
          url: "/privacy-policy",
        },
        {
          name: "Terms of Service",
          url: "/terms-of-service",
        },
      ],
    },
    {
      name: "Socials",
      items: [
        {
          name: "Twitter",
          url: "https://twitter.com/KuponsXyz",
        },
        {
          name: "Reddit",
          url: "https://reddit.com/u/KuponsXyz",
        },
        {
          name: "Discord",
          url: "https://discord.gg/pYXGbTFS3v",
        },
        {
          name: "GitHub",
          url: "https://github.com/KuponsXyz",
        },
      ],
    },
  ];

  return (
    <footer className="bg-gray-800">
      <div className="container">
        <div className="grid grid-cols-2 py-4 lg:grid-cols-4 ">
          {_.map(links, (link) => (
            <FooterLinks key={link.name} name={link.name} items={link.items} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
          <div className="flex items-center justify-center md:justify-start">
            <Logo />
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <p className="text-xs font-light text-gray-600">
              © {new Date().getFullYear()} Kupons. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
