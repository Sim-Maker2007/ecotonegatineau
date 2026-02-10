import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key
const STRIPE_PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

let stripePromise = null;

export function getStripe() {
  if (!stripePromise && STRIPE_PK) {
    stripePromise = loadStripe(STRIPE_PK);
  }
  return stripePromise;
}

/**
 * Redirect to Stripe Checkout
 * Call this when user clicks "CHECKOUT" in the cart.
 * You'll need a backend endpoint that creates a Stripe Checkout Session
 * and returns the session ID.
 * 
 * Example usage:
 *   const sessionId = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify({ items: cart }) });
 *   await redirectToCheckout(sessionId);
 */
export async function redirectToCheckout(sessionId) {
  const stripe = await getStripe();
  if (!stripe) {
    console.warn('Stripe not configured. Set VITE_STRIPE_PUBLISHABLE_KEY in .env');
    return;
  }
  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    console.error('Stripe checkout error:', error);
  }
}
