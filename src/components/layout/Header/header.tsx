import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import SearchIcon from "../../icons/search-icon";
import BookmarkIcon from "@/components/icons/bookmark-icon";
import BookmarkFilledIcon from "@/components/icons/bookmark-filled-icon";
import HeaderBackground from "./HeaderBackground";
import LogoIcon from "@/components/icons/logo";
import HeaderLink from "./HeaderLink";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default async function Header() {
  const navigation = await getTranslations("navigation");
  const centerLinks = (
    <>
      <HeaderLink
        href="/"
        label="home"
        activeClassName="border-b-2 border-general-text-high"
      >
        <div>{navigation("home")}</div>
      </HeaderLink>
      <HeaderLink
        href="/movies"
        label="movies"
        activeClassName="border-b-2 border-general-text-high"
      >
        {navigation("movies")}
      </HeaderLink>
      <HeaderLink
        href="/series"
        label="series"
        activeClassName="border-b-2 border-general-text-high"
      >
        {navigation("series")}
      </HeaderLink>
    </>
  );
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <HeaderBackground />
      <div className="relative flex items-center justify-between px-4 md:px-[5%] pt-6 pb-5 md:py-6 text-white">
        {/* LEFT - LOGO */}
        <div className="font-bold text-xl">
          <Link href="/">
            <LogoIcon></LogoIcon>
          </Link>
        </div>

        {/* CENTER - NAV (responsive) */}
        <nav className="text-md font-semibold hidden sm:flex gap-8 text-sm">
          {centerLinks}
        </nav>

        {/* RIGHT - ICONS */}
        <div className="flex items-center gap-8">
          <HeaderLink
            href="/search"
            label="search"
            activeClassName="header-active"
          >
            <SearchIcon
              width={26}
              height={26}
              className="group-hover:text-white"
            />
          </HeaderLink>
          <HeaderLink
            href="/my-stuff"
            label="my-stuff"
            activeClassName="header-active"
            activeIcon={<BookmarkFilledIcon></BookmarkFilledIcon>}
          >
            <BookmarkIcon
              className="
                header-icon
                text-general-text-mid
                transition-colors
                group-hover:text-white
                group-data-[active=true]:text-white
              "
            />
          </HeaderLink>
          <LanguageSwitcher></LanguageSwitcher>
        </div>
      </div>
      <nav className="relative pb-4 text-md font-semibold flex w-ful justify-center sm:hidden gap-12 text-sm">
        {centerLinks}
      </nav>
    </header>
  );
}
