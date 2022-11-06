import { Header } from "../components/Header";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import db  from '../../fiberase';
import moment from "moment";
import { Order } from "../components/Order";

export default function Orders({ orders }: any) {
    const { data: session } = useSession();

    console.log(orders);

    return (
        <div>
            <Header/>
            <main className={'max-w-screen-lg mx-auto p-10'}>
                <h1 className={'text-3xl border-b mb-2 pb-1 border-yellow-400'}>
                    Your Orders
                </h1>
                {session ? (
                    <h2>{orders.length} Orders</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}

                <div className={'mt-5 space-y-4'}>
                    {orders?.map(({id, amount, amountShipping, items, timestamp, images }: any) => (
                        <Order id={id} amount={amount} amountShipping={amountShipping} items={items} timestamp={timestamp} images={images} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    // Get the users logged in credentials
    const session = await getSession(context);

    if (!session) {
        return {
            props: {}
        }
    }

    // Бдшка firebase
    const stripeOrders = await db
        .collection('users')
        .doc(session?.user?.email ?? undefined)
        .collection('orders')
        .orderBy('timestamp', 'desc')
        .get();

    // Stripe заказы
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order: any) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions?.listLineItems(order.id, {
                    limit: 100
                })
            )?.data,
        }))
    )

    return {
        props: {
            orders,
        }
    }
}
