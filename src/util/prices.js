// Map our custom plan IDs ("basic", "premium", etc) to Stripe price IDs
const stripePriceIds = {
  monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_SUBSCRIPTION,
};

// Get Stripe priceId
export function getStripePriceId(planId) {
  return stripePriceIds[planId];
}

// Get friendly plan ID ("basic", "premium", etc) by Stripe plan ID
// Used in auth.js to include planId in the user object
export function getFriendlyPlanId(stripePriceId) {
  return Object.keys(stripePriceIds).find(
    (key) => stripePriceIds[key] === stripePriceId
  );
}
