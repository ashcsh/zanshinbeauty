import { Link, useUrl, useCart } from '@shopify/hydrogen';
import { useWindowScroll } from 'react-use';
import zanshinLogo from "../../assets/zanshin-logo.png"
import phoneLogo from "../../assets/phoneLogo.svg"
import {
  Heading,
  IconAccount,
  IconBag,
  IconMenu,
  IconSearch,
  Input,
} from '~/components';


import { CartDrawer } from './CartDrawer.client';
import { MenuDrawer } from './MenuDrawer.client';
import { useDrawer } from './Drawer.client';

import productsSvg from "../../assets/products.svg";

/**
 * A client component that specifies the content of the header on the website
 */
export function Header({ title, menu }) {
  const { pathname } = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      {/* <DesktopHeader
        countryCode={countryCode}
        isHome={isHome} 
        title={title}
        menu={menu}
        openCart={openCart}
        pathname={pathname}
      /> */}
      <MobileHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
        pathname={pathname}
      />
    </>
  );
}

function MobileHeader({ countryCode, title, isHome, openCart, openMenu, pathname }) {
  const { y } = useWindowScroll();

  const styles = {
    button: 'relative flex items-center justify-center w-8 h-8',
    container: `${isHome
      ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
      : 'bg-contrast/80 text-primary'
      } ${y > 50 && !isHome ? 'shadow-lightHeader ' : ''
      }flex  items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`,
  };

  return (
    <header role="banner" className={styles.container}>
      <div className="flex items-center justify-start w-full gap-4">
        <button onClick={openMenu} className={styles.button}>
          <img src={productsSvg} alt="products" className="forthswitch:w-[25px] forthswitch:-[25px]"/>
        </button>
        <form
          action={`/${countryCode ? countryCode + '/' : ''}search`}
          className="items-center gap-2 sm:flex"
        >
          <button type="submit" className={styles.button}>
            <IconSearch />
          </button>
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </form>
      </div>

      {(pathname !== "/") && (
        <Link
          className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
          to="/"
        >
          <Heading className="font-bold text-center" as={isHome ? 'h1' : 'h2'}>
            <img src={zanshinLogo} alt="Logo" className={`forthswitch:hidden h-[140px] w-[140px] transition duration-700 ease-in-out pt-[20px] ${y > 50 && !isHome ? "shadow-none" : "shadow-md"} thirdswitch:h-[100px] thirdswitch:w-[100px] thirdswitch:h-[80px] thirdswitch:p-[5px]`} />
            <img src={phoneLogo} alt="Logo" className={`forthswitch:flex hidden min-h-[50px] min-w-[50px] transition duration-700 ease-in-out p-[10px] ${y > 50 && !isHome ? "shadow-none" : "shadow-md"} `}/>
          </Heading>
        </Link>)}

      <div className="flex items-center justify-end w-full gap-4">
        <Link to="/wishlist">
          <svg className="fill-[#52616B] w-[18px] h-[18px] mr-[7px]" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.41 46.66">
            <g id="Layer_1-2" data-name="Layer 1">
              <path d="M26.27,8.06c1.49-1.41,2.95-2.91,4.52-4.26,5.27-4.51,10.69-4.99,15.54-1.46,5.47,3.98,7.64,10.83,4.89,16.75-1.25,2.7-3.01,5.32-5.07,7.45-6.58,6.8-13.41,13.35-20.26,20.11-.53-.6-1.26-1.52-2.08-2.35-4.93-4.98-9.85-9.96-14.83-14.88-3.29-3.25-6.52-6.51-8.17-10.99C-2.09,10.61,3.19,1.39,11.36,.12c3.13-.49,5.92,.49,8.35,2.32,2.26,1.7,4.31,3.67,6.56,5.62Z" />
            </g>
          </svg>
        </Link>
        <Link to={'/account'} className={styles.button}>
          <IconAccount />
        </Link>
        <button onClick={openCart} className={styles.button}>
          <IconBag />
          <CartBadge dark={isHome} />
        </button>
      </div>
    </header>
  );
}

function DesktopHeader({ countryCode, isHome, menu, openCart, title, pathname }) {
  const { y } = useWindowScroll();

  const styles = {
    button:
      'relative flex items-center justify-center w-8 h-8 focus:ring-primary/5',
    container: `${isHome
      ? 'bg-contrast dark:bg-contrast text-contrast dark:text-primary shadow-darkHeader'
      : 'bg-contrast text-primary'
      } ${y > 50 && !isHome ? 'shadow-lightHeader ' : ''
      }hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8`,
  };
  return (
    <header role="banner" className={styles.container}>
      <div className="flex gap-12 justify-between">
        <nav className="flex gap-8">
          {/* Top level menu items */}
          {(pathname !== "/") && (
            <Link to="/" className="mr-[50px]">Acasa</Link>
          )}
          {(menu?.items || []).map((item) => (
            <Link key={item.id} to={item.to} target={item.target}>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div>
        {(pathname !== "/") && (
          <Link className={`font-bold`} to="/">
            <img src={zanshinLogo} alt="sal" className="mr-[150px] h-[100px] w-[100px]" />
            {/* {title} */}
          </Link>)}
      </div>
      <div className="flex items-center gap-1">
        <form
          action={`/${countryCode ? countryCode + '/' : ''}search`}
          className="flex items-center gap-2"
        >
          {/* <Link to="/">
            <img src={zanshinLogo} alt="zanshin-logo" className="h-[120px] w-[120px]" />
          </Link> */}

          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
          <button type="submit" className={styles.button}>
            <IconSearch />
          </button>
        </form>
        <Link to={'/account'} className={styles.button}>
          <IconAccount />
        </Link>
        <button onClick={openCart} className={styles.button}>
          <IconBag />
          <CartBadge dark={isHome} />
        </button>
      </div>
    </header>
  );
}

function CartBadge({ dark }) {
  const { totalQuantity } = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`${dark
        ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary '
        : 'text-contrast bg-primary'
        } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}
