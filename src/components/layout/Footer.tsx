import { Link } from "@/i18n/routing";
import LogoIcon from "../icons/logo";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const c = await getTranslations("common");
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-8 text-white md:px-[5%] md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          {/* Brand */}
          <div className="col-span-2 sm:flex-1">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-70"
            >
              <LogoIcon />
            </Link>

            <p className="mt-3 max-w-xs md:max-w-full text-sm leading-6 text-general-text-mid">
              {c("footer")}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-8 md:flex-row md:gap-0">
            <div className="flex flex-col gap-2 sm:mr-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                {c("contact")}
              </span>

              <a
                href={`mailto:${EMAIL}`}
                className="break-all text-sm text-general-text-mid md:text-white/60 transition-colors md:hover:text-white"
              >
                {EMAIL}
              </a>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                {c("connect")}
              </span>

              <div className="flex flex-col gap-2 sm:flex-row sm:gap-5">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-general-text-mid md:text-white/60 transition-colors md:hover:text-white"
                >
                  GitHub
                </a>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-general-text-mid md:text-white/60 transition-colors md:hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-white/25">
          © {new Date().getFullYear()} Movix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
