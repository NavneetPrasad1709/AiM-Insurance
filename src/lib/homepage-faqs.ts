export interface HomepageFaq {
  q: string;
  a: string;
}

export const HOMEPAGE_FAQS: HomepageFaq[] = [
  {
    q: "Do you charge for negotiating insurance?",
    a: "Our consultation and negotiation service is free for our clients. We're paid by partner carriers when we place your business — and only if the coverage and price are genuinely better than what you have. If we can't beat your current policy, you owe us nothing.",
  },
  {
    q: "Can you really get me a better rate than going direct?",
    a: "Most of the time, yes. Direct quotes are anchored to whatever the carrier's website algorithm spits out — they don't account for negotiation, multi-line discounts, or underwriter relationships. Our team works the levers carriers won't show you. Average client savings: $1,200+ per year for the same coverage.",
  },
  {
    q: "Do I still sign up with the insurance company directly?",
    a: "Yes. The policy is between you and the carrier — we just negotiate the terms and handle the paperwork. You own the policy, you make the payments, you control everything. We're your advocate, not a middleman billing you.",
  },
  {
    q: "What if I already have insurance?",
    a: "Even better. Send us your declarations page and we'll audit it for free. If we find savings, we'll show you the side-by-side comparison and let you decide. If we don't, we'll tell you that too — and you'll know your current policy is competitive.",
  },
];
