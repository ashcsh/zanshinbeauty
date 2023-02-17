import {Heading, Input, PageHeader} from '~/components';
import {Layout} from '~/components/index.server';

export function SearchPage({searchTerm, children}) {
  return (
    <Layout>
      <PageHeader>
        <Heading as="h1" size="copy">
        </Heading>
        <form className="relative flex w-full text-heading">
          <Input
            defaultValue={searchTerm}
            placeholder="..."
            type="search"
            variant="search"
            name="q"
          />
          <button className="absolute right-0 py-2" type="submit">
            Cauta
          </button>
        </form>
      </PageHeader>
      {children}
    </Layout>
  );
}
