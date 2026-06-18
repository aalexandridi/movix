import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default async function Header() {
  const locale = await getLocale();
  const navigation = await getTranslations("navigation");

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />

      <div className="relative flex items-center justify-between px-4 md:px-8 py-6 text-white">
        {/* LEFT - LOGO */}
        <div className="font-bold text-xl">
          <Link href="/">MOVIX</Link>
        </div>

        {/* CENTER - NAV (responsive) */}
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/">{navigation("home")}</Link>
          <Link href="/movies">{navigation("movies")}</Link>
          <Link href="/series">{navigation("series")}</Link>
        </nav>

        {/* RIGHT - ICONS */}
        <div className="flex items-center gap-4">
          <Link href="/search" aria-label="my-stuff">
            <Image
              className="dark:invert"
              src="/icons/search.png"
              alt="search icon"
              width={24}
              height={24}
              priority
            />
          </Link>

          <Link href="/my-stuff" aria-label="my-stuff">
            <Image
              className="dark:invert"
              src="/icons/save-outline.png"
              alt="bookamrk icon"
              width={22}
              height={22}
              priority
            />
          </Link>
          <button aria-label="Profile">
            <Image
              className="dark:invert"
              src="/icons/user.png"
              alt="user icon"
              width={31}
              height={31}
              priority
            />
          </button>
        </div>
      </div>
    </header>
  );
}
