const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

// Create a Stripe Checkout session for subscription
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Matrix Monthly Subscription',
                        },
                        unit_amount: 200, // $2.00 in cents
                        recurring: { interval: 'month' },
                    },
                    quantity: 1,
                },
            ],
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });
        res.json({ url: session.url });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
