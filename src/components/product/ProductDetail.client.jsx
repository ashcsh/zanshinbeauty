// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import { Disclosure } from '@headlessui/react';
import { Link } from '@shopify/hydrogen';

import Descriere from "../../assets/descriere-produs-alb.svg"
import Ingrediente from "../../assets/ingrediente-alb.svg"
import ModUtilizare from "../../assets/mod-de-utilizare-alb.svg"
import Livrare from "../../assets/livrare-rapida-alb.svg"
import { Text, IconClose } from '~/components';

export function ProductDetail({ title, content, learnMore }) {
  return (
    <>
      <Disclosure key={title} as="div" className="grid w-full gap-2">
        {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
        {({ open }) => (
          <>
            <Disclosure.Button className="text-left">
              <div className="flex justify-between">
                <img src={Descriere} alt="descriere_produs" className="max-w-[30px] max-h-[30px] "/>
                <Text size="lead" as="h4">
                  Descriere Produs
                </Text>
                <IconClose
                  className={`${open ? '' : 'rotate-[45deg]'
                    } transition-transform transform-gpu duration-200`}
                />
              </div>
            </Disclosure.Button>

            <Disclosure.Panel className={'pb-4 pt-2 grid gap-2'}>
              <div
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              {learnMore && (
                <div className="">
                  <Link
                    className="pb-px border-b border-primary/30 text-primary/50"
                    to={learnMore}
                  >
                    Learn more
                  </Link>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure key={title} as="div" className="grid w-full gap-2">
        {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
        {({ open }) => (
          <>
            <Disclosure.Button className="text-left">
              <div className="flex justify-between">
                <img src={Ingrediente} alt="descriere_produs" className="max-w-[30px] max-h-[30px] text-white"/>
                <Text size="lead" as="h4">
                  Ingrediente
                </Text>
                <IconClose
                  className={`${open ? '' : 'rotate-[45deg]'
                    } transition-transform transform-gpu duration-200`}
                />
              </div>
            </Disclosure.Button>

            <Disclosure.Panel className={'pb-4 pt-2 grid gap-2'}>
              <div
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              {learnMore && (
                <div className="">
                  <Link
                    className="pb-px border-b border-primary/30 text-primary/50"
                    to={learnMore}
                  >
                    Learn more
                  </Link>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure key={title} as="div" className="grid w-full gap-2">
        {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
        {({ open }) => (
          <>
            <Disclosure.Button className="text-left">
              <div className="flex justify-between">
              <img src={ModUtilizare} alt="descriere_produs" className="max-w-[40px] max-h-[40px] text-white"/>
                <Text size="lead" as="h4">
                  Mod de Utilizare
                </Text>
                <IconClose
                  className={`${open ? '' : 'rotate-[45deg]'
                    } transition-transform transform-gpu duration-200`}
                />
              </div>
            </Disclosure.Button>

            <Disclosure.Panel className={'pb-4 pt-2 grid gap-2'}>
              <div
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              {learnMore && (
                <div className="">
                  <Link
                    className="pb-px border-b border-primary/30 text-primary/50"
                    to={learnMore}
                  >
                    Learn more
                  </Link>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="flex ">
        <img src={Livrare} className="max-w-[40px] max-h-[40px] mr-[10px]"/>
      <Text size="lead" as="h4" className="ml-[50px]">Livrare 2-4 zile lucratoare</Text>
      </div>
    </>
  );
}
