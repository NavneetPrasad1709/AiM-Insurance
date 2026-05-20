export interface HomepageFaq {
  q: string;
  a: string;
}

export const HOMEPAGE_FAQS: HomepageFaq[] = [
  {
    q: "How does pricing work?",
    a: "Success-based. We only charge when we actually save you money — a small portion of the savings we negotiate. No savings, no fee. No upfront cost, no subscription, no card required.",
  },
  {
    q: "Do you charge for negotiating insurance?",
    a: "The review and negotiation are free. If we beat your current premium, we keep a small share of the savings we secure for you. If we can't beat it, you owe us nothing.",
  },
  {
    q: "Can you really get me a better rate than going direct?",
    a: "Most of the time, yes. Direct quotes are anchored to whatever the carrier's website algorithm spits out — they don't account for negotiation, multi-line discounts, or underwriter relationships. Our team works the levers carriers won't show you. Average client savings: $1,247 per year for the same coverage.",
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
