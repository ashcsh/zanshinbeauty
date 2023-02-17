import { useUrl } from '@shopify/hydrogen';

import { Section, Heading, FooterMenu, CountrySelector } from '~/components';

// import instagram from "../../assets/igLogo.png"

/**
 * A server component that specifies the content of the footer on the website
*/
export function Footer({ menu }) {
  const { pathname } = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : null;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  return (
    <>
      <div className="forthswitch:flex forthswitch:flex-col forthswitch:z-50 relative forthswitch:bg-primary forthswitch:dark:bg-contrast">

        <div className="w-max h-max absolute right-[10%] top-[30%] ">
          {/* <a href="https://instagram.com/zanshin.beauty?igshid=YmMyMTA2M2Y=" className="w-max h-max ">
            <img className="w-[40px] h-[40px]" src={instagram} alt="instagram" />
          </a> */}
        </div>
        <Section
          divider={isHome ? 'none' : 'top'}
          as="footer"
          role="contentinfo"
          className={`grid min-h-[25rem] items-start grid-flow-row w-full gap-6 py-8 px-6 md:px-8 lg:px-12 
        border-b md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsCount}
        bg-primary dark:bg-contrast dark:text-primary text-contrast overflow-hidden z-50 `}
        >
          <FooterMenu menu={menu} />
          {/* <section className="grid gap-4 w-full md:max-w-[335px] md:ml-auto">
        <Heading size="lead" className="cursor-default" as="h3">
          Country
        </Heading>
        <CountrySelector />
      </section> */}

          <div className="w-max h-full  flex flex-col items-start justify-start gap-4 text-[1rem] ">
            <h2 className="font-bold">Relații cu clienții</h2>
            <h2>L-V: 08:00 - 20:00</h2>
            <h2>0742.965.568</h2>
            <h2>office@zanshinbeauty.ro</h2>
            {/* <a href="https://instagram.com/zanshin.beauty?igshid=YmMyMTA2M2Y=" className="w-max my-[10px] h-max hidden forthswitch:flex ">
            <img className="w-[30px] h-[30px]" src={instagram} alt="instagram" />
          </a> */}
          </div>
          <div
            className={`self-end opacity-50 md:col-span-2 lg:col-span-${itemsCount}`}
          >Copyright
            &copy; {new Date().getFullYear()} /  Zanshin Beauty S.R.L., CUI: , Reg. Com. J / /2023
          </div>
        </Section>

      </div>
    </>
  );
}
