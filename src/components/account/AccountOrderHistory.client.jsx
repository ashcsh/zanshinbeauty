import {Button, Text, OrderCard} from '~/components';

export function AccountOrderHistory({orders}) {
  return (
    <div className="mt-6">
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h2 className="font-bold text-lead">Istoricul Comenzilor</h2>
        {orders?.length ? <Orders orders={orders} /> : <EmptyOrders />}
      </div>
    </div>
  );
}

function EmptyOrders() {
  return (
    <div>
      <Text className="mb-1" size="fine" width="narrow" as="p">
        Momentan nu ai plasat comenzi.
      </Text>
      <div className="w-48">
        <Button className="text-sm mt-2 w-full" variant="secondary" to={'/'}>
          Incepe Cumparaturile
        </Button>
      </div>
    </div>
  );
}

function Orders({orders}) {
  return (
    <ul className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </ul>
  );
}
