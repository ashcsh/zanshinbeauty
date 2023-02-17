import { Text } from '~/components';
import { Drawer } from './Drawer.client';
import { Link } from '@shopify/hydrogen';
import { startTransition } from 'react';

export function MenuDrawer({ isOpen, onClose, menu }) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Colectii">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({ menu, onClose }) {
  return (
    <>
      <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
        {/* Top level menu items */}
        {(menu?.items || []).map((item) => (
          <Link
            key={item.id}
            to={item.to}
            target={item.target}
            onClick={() => startTransition(onClose)}
          >
            <Text as="span" size="copy">
              {item.title}
            </Text>
          </Link>
        ))}

      </nav>
      <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
        <Link to="/collections/toate-tipurile-de-ten">
        <Text as="span" size="copy">
          Toate tipurile de ten
        </Text>
        </Link>
        <Link to="/collections/ten-gras">
        <Text as="span" size="copy">
          Ten gras
        </Text>
        </Link>
        <Link to="/collections/ten-mixt">
        <Text as="span" size="copy">
          Ten mixt
        </Text>
        </Link>
        <Link to="/collections/ten-normal">
        <Text as="span" size="copy">
          Ten normal
        </Text>
        </Link>
        <Link to="/collections/ten-uscat">
        <Text as="span" size="copy">
          Ten uscat
        </Text>
        </Link>
        <Link to="/collections/ten-acneic">
        <Text as="span" size="copy">
          Ten acneic
        </Text>
        </Link>
        <Link to="/collections/ten-sensibil">
        <Text as="span" size="copy">
          Ten sensibil
        </Text>
        </Link>
      </nav>
    </>
  );
}
