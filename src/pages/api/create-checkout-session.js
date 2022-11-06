const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items, email } = req.body;

    // implicit return
    // переводим наш продукт в продукт, что принимает stripe
    const transformedItems = items.map((item) => ({
        price_data: {
            currency: 'gbp',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                description: item.description,
                images: [item.image] // тк принимается только массив, но у нас одно изображение
            },
        },
        quantity: 1
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_options: [{
            shipping_rate: 'shr_1M0ufoFXB5cKtTnuKRof5TKf',
        }],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        }
    });

    res.status(200).json({ id: session.id });
}
