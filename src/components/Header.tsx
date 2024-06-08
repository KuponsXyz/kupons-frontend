import _ from "lodash";

import { languageList } from "@/services/languages";
import { categoryList } from "@/services/categories";

import SearchBar from "./SearchBar";
import NavMenu from "./NavMenu";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";

const Header = async () => {
  const languages = await languageList();
  const categories = await categoryList();

  return (
    <header className="shadow-md">
      <div className="container flex flex-wrap items-center justify-between gap-2 py-2 md:gap-4">
        <Logo />
        <NavMenu languages={languages} categories={categories} />
        <MobileMenu languages={languages} categories={categories} />
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
