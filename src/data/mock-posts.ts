/**
 * Mock blog posts. Used as a fallback when Sanity is not configured
 * and as the source for /blog/[slug] static params during early dev.
 *
 * Content style: short, scannable paragraphs. Plain text; when Sanity
 * is wired up, body becomes Portable Text. The renderer in
 * `components/blog/post-content` accepts either.
 */

export type MockCategory =
  | "Insurance Tips"
  | "Savings Stories"
  | "Guides"
  | "Industry News";

export interface MockAuthor {
  name: string;
  role: string;
  bio: string;
}

export interface MockPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: MockCategory;
  author: MockAuthor;
  publishedAt: string; // ISO
  readingTime: number; // minutes
  tags: string[];
  /** Body as plain HTML-ish blocks, headings + paragraphs. */
  content: string;
}

const TEAM_AUTHOR: MockAuthor = {
  name: "AiM Team",
  role: "Insurance Negotiators",
  bio: "Independent negotiators who fight for better insurance rates on behalf of 1100+ clients across the US, Canada, and UAE.",
};

const ANALYST_AUTHOR: MockAuthor = {
  name: "Marcus Chen",
  role: "Senior Insurance Analyst",
  bio: "Twelve years inside underwriting at three top-15 carriers. Now translates carrier rate manuals for AiM clients.",
};

const CASE_STUDY_AUTHOR: MockAuthor = {
  name: "Priya Shah",
  role: "Client Success Lead",
  bio: "Runs the post-negotiation handoff at AiM. Has personally walked 400+ clients through carrier switches.",
};

export const mockPosts: MockPost[] = [
  {
    _id: "post-1",
    title: "How AiM Saved Our Client $1,500 on Car Insurance",
    slug: "how-aim-saved-client-1500-car-insurance",
    excerpt:
      "A four-driver Austin family was paying $4,820 a year for the exact coverage they could get for $3,310. Here's the negotiation, line by line.",
    category: "Savings Stories",
    author: CASE_STUDY_AUTHOR,
    publishedAt: "2026-05-12T09:00:00.000Z",
    readingTime: 5,
    tags: ["car insurance", "savings", "case study", "auto"],
    content: `## The starting point

The Reyes family came to us in February. Two parents, two teen drivers, three vehicles: a 2019 Honda Pilot, a 2017 Subaru Outback, and a 2014 Toyota Corolla used by their oldest at college. Their renewal notice had jumped from $4,210 to $4,820, a 14.5 percent increase with no claims, no tickets, and no household changes.

## What we found

Their carrier had quietly re-tiered them after a state-wide loss-cost adjustment. The Corolla, driven less than 4,000 miles a year, was rated as a daily commuter. Both teens were rated against their highest-cost vehicle instead of the lowest. And the family was carrying 100/300/100 liability with comp-and-collision deductibles of $250, the carrier's most expensive default tier.

## The negotiation

We pulled three competing quotes from carriers we knew were aggressive in Travis County for multi-vehicle households. Two of them, once we corrected the usage classification on the Corolla and reassigned the youngest driver to the Outback, came in dramatically cheaper. We then went back to the existing carrier with those quotes and a written request for a re-rate. They matched within $90.

## The outcome

Final premium: $3,310 a year, same 100/300/100 limits, same $250 collision deductible, same roadside and rental coverage. Annual savings: $1,510. Same carrier, same policy number, no lapse, no DMV paperwork, just a corrected usage classification and a competitive quote in writing.

## Why this works

Carriers will re-rate existing customers when shown evidence that they're losing the policy to a competitor. Most drivers never ask. The Reyes family had been a loyal customer for nine years. Loyalty, in auto insurance, is rarely rewarded. It's usually priced.`,
  },
  {
    _id: "post-2",
    title: "5 Common Car Insurance Mistakes You're Probably Making",
    slug: "5-common-car-insurance-mistakes",
    excerpt:
      "Most drivers overpay because of five fixable mistakes: usage class, deductible math, coverage stacking, paid-in-full discounts, and bundling traps.",
    category: "Insurance Tips",
    author: ANALYST_AUTHOR,
    publishedAt: "2026-04-22T09:00:00.000Z",
    readingTime: 6,
    tags: ["car insurance", "tips", "premiums"],
    content: `## 1. Letting your usage classification go stale

If you bought a policy when you were commuting 40 miles a day and you now work from home three days a week, you are paying for miles you no longer drive. Most carriers offer a "pleasure use" or low-mileage tier that runs 8 to 18 percent cheaper. Carriers will not move you into it automatically. You have to call and ask.

## 2. Choosing the wrong deductible

A $250 collision deductible feels safer than $1,000, but the premium difference is often $300 to $450 a year. If you go three years without a claim, and most drivers do, you have spent more on the lower deductible than a single claim would have cost you out of pocket. Run the math against your driving record before defaulting to the lowest deductible offered.

## 3. Stacking coverage you already have elsewhere

Rental reimbursement, roadside assistance, and accidental death payouts are commonly bundled into auto policies. Most credit cards already include rental reimbursement. AAA members already have roadside. Life insurance handles accidental death better and cheaper. Check what overlaps before paying for it twice.

## 4. Paying monthly instead of in full

The "convenience" of monthly billing usually carries a 6 to 12 percent service charge baked into the premium. Paying in full at renewal, or even semi-annually, typically unlocks a discount that pays you back more than what you would earn parking that money in a high-yield savings account.

## 5. Bundling without doing the math

Multi-policy bundling discounts are real, but they are not always the cheapest path. We regularly see homeowners save $400 to $700 a year by splitting their auto and home across two carriers. The bundle discount is a marketing number: the only number that matters is the sum of the two final premiums.`,
  },
  {
    _id: "post-3",
    title: "Why Your Insurance Premium Keeps Going Up Every Year",
    slug: "why-insurance-premium-keeps-going-up",
    excerpt:
      "Even with a clean record, your premium climbs. The reason is rarely you. It's loss cost adjustments, reinsurance pricing, and insurer churn.",
    category: "Industry News",
    author: ANALYST_AUTHOR,
    publishedAt: "2026-04-08T09:00:00.000Z",
    readingTime: 7,
    tags: ["industry", "premiums", "rates"],
    content: `## The "loss cost" cycle nobody explains to consumers

State insurance departments approve carrier rate filings based on the carrier's projected losses across an entire book of business. When repair costs spike, as they did 22 percent across collision claims in 2023, every customer in that state gets re-priced, regardless of whether they had a claim. Your driving record protects you from surcharges. It does not protect you from the rate filing itself.

## Reinsurance pricing trickles down

Carriers buy their own insurance from reinsurers in Bermuda, London, and Zurich. After back-to-back catastrophic loss years, the 2024 hurricane season alone drove $51 billion in insured losses, reinsurance rates rose roughly 18 percent. That cost is passed through to your monthly premium even if you live in a state that has never seen a hurricane.

## Vehicle technology is now a cost driver

Replacing a windshield on a 2015 sedan costs around $300. Replacing one on a 2024 sedan with lane-departure cameras embedded in the glass costs $1,400 to $1,900 because the camera array has to be recalibrated. Carriers are pricing this in. Newer vehicles often cost more to insure than older ones, even when they are objectively safer to drive.

## The retention game

Carriers count on customers staying. Internal studies, leaked across multiple class actions in 2022, show that long-tenure customers are charged more than new customers for identical risk profiles. The industry calls this "price optimization." Twelve states have outlawed it; 38 still allow it. Shopping every two to three years is the only consumer-side defense.

## What you can actually do

You cannot control loss cost filings or reinsurance pricing. You can control whether you accept the renewal at face value. A 15-minute negotiation, or a competitive quote that you bring to your existing carrier, is usually enough to neutralize one or two years of compounded increases.`,
  },
  {
    _id: "post-4",
    title: "Home Insurance 101: What Every Homeowner Needs to Know",
    slug: "home-insurance-101-homeowner-guide",
    excerpt:
      "Replacement cost vs. market value, the dwelling-coverage trap, and the four endorsements most homeowners discover only after a claim.",
    category: "Guides",
    author: TEAM_AUTHOR,
    publishedAt: "2026-03-25T09:00:00.000Z",
    readingTime: 9,
    tags: ["home insurance", "guide", "homeowner"],
    content: `## Replacement cost is not market value

Your home's market value includes the land, the neighborhood, the school district. Your insurance dwelling coverage covers only the cost to rebuild the structure with current materials and labor. A $750,000 home in a hot market might rebuild for $380,000. A $300,000 home in a slow market might rebuild for $410,000. Get a current rebuild estimate, most agents will run one for free, and rate your dwelling coverage off that number, not your Zillow estimate.

## The 80 percent coinsurance trap

Most homeowner policies require you to insure your dwelling for at least 80 percent of its replacement cost. If you fall below that threshold and file a partial claim, the carrier reduces your payout proportionally. A $50,000 kitchen fire on a home insured at 70 percent of replacement cost might pay out only $43,750, and you discover the gap at the worst possible moment.

## The four endorsements people miss

Standard policies often exclude four things homeowners assume are covered: water backup from sewer or sump pump, service line breaks between the street and the house, ordinance and law coverage for code-required upgrades during a rebuild, and extended replacement cost that covers the gap when post-disaster construction inflation outruns your dwelling limit. Each costs $25 to $80 a year. Each saves you tens of thousands when you need them.

## Personal property settlement matters

Read whether your contents are covered at "actual cash value" or "replacement cost." Actual cash value depreciates everything: a five-year-old laptop pays out at its used resale value, not what a new one costs. Replacement cost coverage typically adds 10 to 15 percent to your premium and pays you back the first time you file.

## Liability coverage is the cheapest part

Increasing your personal liability limit from $100,000 to $500,000 usually costs $30 to $60 a year. A single dog bite, slip-and-fall, or teen-driver-at-the-wheel incident can blow through $100,000 in a week. If you own a home, you have assets worth defending. Buy the higher limit.`,
  },
  {
    _id: "post-5",
    title: "Boat Insurance: Seasonal Tips for Maximum Savings",
    slug: "boat-insurance-seasonal-tips-savings",
    excerpt:
      "Lay-up periods, navigation territory limits, and the survey timing trick that most owners only learn after their second renewal.",
    category: "Insurance Tips",
    author: TEAM_AUTHOR,
    publishedAt: "2026-03-10T09:00:00.000Z",
    readingTime: 6,
    tags: ["boat insurance", "marine", "savings"],
    content: `## Use a lay-up period if your boat is seasonal

Most marine carriers offer a "lay-up" credit for the months your boat is not in the water, typically November through March in northern latitudes. The discount runs 30 to 45 percent of your premium, prorated to the lay-up window. Many policies default to "all-year navigation" because it is easier for the agent to write. Always ask explicitly.

## Right-size your navigation territory

A policy that covers you "anywhere in coastal US waters" costs significantly more than one limited to a 75-mile radius from your home port. If you have not crossed state lines in two seasons, narrow the territory at renewal. You can always endorse it back up for a single trip.

## Schedule the survey before you need it

Boats over $75,000 in hull value, or over 25 years old, almost always require a fresh marine survey to get the best rates. Carriers accept surveys up to three to five years old. Get yours done in the off-season when surveyors are cheaper and faster, and time it so the survey is fresh going into your next two renewal cycles, not the one after.

## Bundle hull, liability, and tender separately

The combined policy your agent quotes is convenient but rarely optimal. Hull coverage on a 32-foot center console, liability protection, and tender (dinghy) coverage are often cheaper through specialist marine carriers than through a generalist's package. AiM regularly splits these and saves clients 20 to 35 percent on identical coverage.`,
  },
  {
    _id: "post-6",
    title: "The Real Cost of Not Comparing Insurance Quotes",
    slug: "real-cost-not-comparing-insurance-quotes",
    excerpt:
      "Loyal customers pay an average $890 a year more than shoppers, according to multi-state filings. Compounded, that is real money.",
    category: "Savings Stories",
    author: CASE_STUDY_AUTHOR,
    publishedAt: "2026-02-18T09:00:00.000Z",
    readingTime: 5,
    tags: ["savings", "case study", "comparison shopping"],
    content: `## The loyalty penalty is measurable

Multi-state rate filings analyzed by Consumer Federation in 2023 showed that customers who held the same auto policy for over five years paid an average of $890 a year more than new customers with identical risk profiles. That gap widens with each year of tenure. By year ten, the loyal customer is paying roughly $1,400 more annually for the exact same coverage.

## Compounded over a decade

A driver who never shops their auto insurance for ten years effectively pays $9,000 to $14,000 more than a driver who shops every two years. The shopping driver is not getting better coverage. They are getting the same coverage at the price the carrier offers to a new customer instead of the price the carrier charges a captive one.

## The home insurance version is worse

Homeowner policies have less price transparency than auto. Renewals can climb 12 to 28 percent in a single year without a claim, particularly in states with active wildfire or storm exposure. Most homeowners accept the renewal because the alternative (a fresh quote, a new application, a roof inspection, a possible re-rate of their mortgage escrow) feels like work. It usually takes 45 minutes and saves four figures.

## What "shopping" really means

You do not have to switch carriers to capture the savings. Pulling two or three competing quotes and bringing them to your existing agent triggers a re-rate request roughly 60 percent of the time. Carriers would rather discount than lose the policy. They just will not volunteer it.`,
  },
  {
    _id: "post-7",
    title: "How Insurance Negotiation Works: Behind the Scenes at AiM",
    slug: "how-insurance-negotiation-works-behind-scenes",
    excerpt:
      "We pull declarations pages, run carrier-side rate comparisons, and present a written counter. Here is the actual workflow, step by step.",
    category: "Guides",
    author: TEAM_AUTHOR,
    publishedAt: "2026-01-30T09:00:00.000Z",
    readingTime: 8,
    tags: ["how it works", "negotiation", "AiM"],
    content: `## Step one: declarations page audit

Every negotiation starts with your current declarations page, the document that lists every coverage, limit, deductible, discount, and surcharge on your policy. We read it line by line looking for misclassifications: vehicle usage codes that no longer fit your routine, unmarried-driver flags that should have been removed when you got married, anti-theft discounts that were never applied, even garaging zip codes that are out of date. Roughly 1 in 4 audits finds at least one error worth correcting before we even shop.

## Step two: carrier-side rate runs

We have appointed access to underwriting tools at most major carriers, which means we can run quotes against your actual driving record, credit-based insurance score, and household composition, not the simplified online estimator that consumer-facing sites use. The quotes we generate are bind-ready, not marketing approximations.

## Step three: the competitive set

We pull three to five quotes from carriers known to be aggressive on your specific risk profile. A young driver in Phoenix and a retired homeowner in Tampa do not get the same shortlist. We choose carriers whose appetite, their internal preference for the kind of customer you are, actually matches what you are buying.

## Step four: the written counter

We present our findings to your existing carrier in writing, with the competitive quotes attached. Carriers rarely re-rate over the phone, but they almost always re-rate in response to a documented retention request. Roughly 60 percent of our negotiations result in a same-carrier discount with no policy switch.

## Step five: the switch, only if it wins

If the existing carrier will not match, we handle the switch end-to-end: bind the new policy, time the cancellation to avoid a coverage lapse, transfer any prepaid balances, and update your lender or DMV if required. Most clients see savings of $1,247 or more annually with no change in coverage limits or deductibles.`,
  },
  {
    _id: "post-8",
    title: "State-by-State Car Insurance Requirements Guide 2025",
    slug: "state-by-state-car-insurance-requirements-2025",
    excerpt:
      "Minimum liability limits vary wildly by state. Here is what is actually required, what you should carry instead, and where the new 2025 rules apply.",
    category: "Guides",
    author: ANALYST_AUTHOR,
    publishedAt: "2026-01-14T09:00:00.000Z",
    readingTime: 10,
    tags: ["car insurance", "guide", "state requirements"],
    content: `## Minimums vs. recommended

Every state sets a minimum liability limit drivers must carry to register a vehicle. Almost none of those minimums are enough to cover an actual accident. Florida's 10/20/10 minimum, for example, will pay $10,000 per injured person up to $20,000 per accident, numbers that have not been updated since 1971. A single ER visit today can exceed that. The minimum keeps you legal; it does not keep you protected.

## States that changed in 2025

California raised minimums to 30/60/15 effective January 1, 2025. Utah moved to 30/65/25. Virginia eliminated the option to pay an "uninsured motor vehicle fee" in lieu of carrying insurance. If your renewal date crossed a state boundary, your premium likely rose to reflect the new floor, even if you were already carrying higher limits.

## What we actually recommend

For most homeowners and earners, 100/300/100 with a $500,000 to $1,000,000 personal umbrella is the right baseline. The cost difference between state minimums and 100/300/100 is typically $80 to $180 a year. The cost difference between not having an umbrella and having a $1M umbrella is usually $180 to $300 a year. Together, that buys you roughly fifty times the protection.

## No-fault vs. tort states

Twelve states use a no-fault system, where your own insurer pays your medical bills regardless of who caused the crash, in exchange for limits on suing the other driver. The remaining states use a tort system, where the at-fault driver's insurer pays. No-fault premiums tend to run higher because the insurer is on the hook more often, but recovery is faster and does not require litigation.

## Uninsured/underinsured motorist coverage

Roughly 14 percent of US drivers are uninsured. Another 30 percent carry only state minimums, which means they are functionally underinsured for any serious crash. UM/UIM coverage on your own policy steps in when the at-fault driver cannot. It is one of the cheapest line items on any policy and one of the most likely to actually be used. Carry it at the same limit as your liability coverage.`,
  },
  {
    _id: "post-9",
    title: "Yacht Insurance: What High-Net-Worth Individuals Need to Know",
    slug: "yacht-insurance-high-net-worth-guide",
    excerpt:
      "Hull valuation methods, P&I limits, captain endorsements, and the four flag-state quirks that decide your premium more than the boat itself.",
    category: "Insurance Tips",
    author: ANALYST_AUTHOR,
    publishedAt: "2025-12-20T09:00:00.000Z",
    readingTime: 9,
    tags: ["yacht insurance", "high net worth", "marine"],
    content: `## Agreed value vs. actual cash value

For yachts above roughly $200,000 in hull value, always insure on an "agreed value" basis. The carrier and the owner agree at policy inception what the vessel is worth, and that figure is paid in the event of a total loss. Full stop, no depreciation argument at the moment of greatest stress. Actual cash value policies, common at the lower end of the pleasure-craft market, leave you negotiating with an adjuster about depreciation after a constructive total loss. Not where you want to be.

## Protection and indemnity (P&I) limits

P&I covers third-party bodily injury and property damage arising from operation of the vessel, the marine equivalent of liability. For yachts that carry guests, employ crew, or operate in busy harbors, $1M is the absolute floor; $5M to $10M is more appropriate. Larger vessels with paid crew should also consider Jones Act coverage for crew injuries, which is mandatory rather than optional.

## Captain endorsements matter

If you employ a paid captain, the policy must endorse them by name and license number. If you sometimes operate the vessel yourself, that needs a separate "owner-operator" endorsement. Mismatches between actual operation and policy endorsements are the single most common reason marine claims are denied. Get the endorsements right at binding, not after a loss.

## Flag-state and home-port quirks

A vessel flagged in the Cayman Islands but home-ported in Florida is rated very differently than one flagged and home-ported domestically. Some carriers will not write a US-flagged vessel that winters in the Caribbean unless a specific endorsement is added; others write that risk natively at lower cost. The cheapest carrier for a 60-foot motor yacht in Newport is rarely the cheapest carrier for the same vessel in Fort Lauderdale.

## Coordinate with personal liability

Your homeowner umbrella does not extend over your yacht by default. You need either a marine-specific umbrella or a primary umbrella explicitly endorsed to cover watercraft above a stated horsepower. Getting this wrong leaves a coverage gap that is invisible until a serious incident exposes it.`,
  },
  {
    _id: "post-10",
    title: "2025 Insurance Industry Trends That Affect Your Premiums",
    slug: "2025-insurance-industry-trends-premiums",
    excerpt:
      "Telematics expansion, AI claims handling, climate re-rating, and the carrier consolidation wave: what each means for what you actually pay.",
    category: "Industry News",
    author: ANALYST_AUTHOR,
    publishedAt: "2025-11-25T09:00:00.000Z",
    readingTime: 8,
    tags: ["industry", "trends", "2025", "premiums"],
    content: `## Telematics is no longer optional

Twenty-eight states now allow carriers to offer mandatory telematics-based policies, programs that track your driving via a phone app or plug-in device and price your premium accordingly. Safe drivers can save 15 to 30 percent. Drivers flagged for hard braking, late-night trips, or phone-handling-while-moving can see surcharges that wipe out any savings. Read the program terms before opting in. You usually cannot opt back out at the next renewal.

## AI-driven claims handling speeds up payouts, and disputes

Most major carriers now route low-severity auto claims through automated estimation tools that produce a settlement offer within hours of a photo upload. This is good for legitimate small claims. It is bad when the algorithm undervalues your loss and offers you 60 percent of what a human adjuster would have written. The appeals process exists for a reason; use it.

## Climate re-rating is hitting non-coastal states

Wildfire exposure is no longer just a California story. Colorado, Arizona, New Mexico, Oregon, and Washington have all seen double-digit homeowner premium increases tied to revised wildfire models. Some carriers have stopped writing new business entirely in zip codes flagged as high-risk. If you live in a wildfire interface zone, expect to shop more aggressively at every renewal.

## Carrier consolidation reduces choice

Three of the top fifteen US property-casualty carriers were acquired or merged in the past 24 months. Consolidation typically means narrower underwriting appetites: the surviving carrier keeps the most profitable book and quietly stops writing the rest. If your carrier was acquired, your renewal terms may change materially even if your risk profile did not.

## What you should do

Pay attention to your renewal letter, not just the new premium. Look for changes to deductibles, exclusions, coverage limits, and discount eligibility. Two policies with the same premium can have wildly different protection. The savings number is a starting point, not the answer.`,
  },
];

export const mockCategories = [
  { title: "All", slug: "all" },
  { title: "Insurance Tips", slug: "insurance-tips" },
  { title: "Savings Stories", slug: "savings-stories" },
  { title: "Guides", slug: "guides" },
  { title: "Industry News", slug: "industry-news" },
] as const;

export type MockCategorySlug = (typeof mockCategories)[number]["slug"];

const CATEGORY_TO_SLUG: Record<MockCategory, MockCategorySlug> = {
  "Insurance Tips": "insurance-tips",
  "Savings Stories": "savings-stories",
  Guides: "guides",
  "Industry News": "industry-news",
};

export function categoryToSlug(category: MockCategory): MockCategorySlug {
  return CATEGORY_TO_SLUG[category];
}

const CATEGORY_GRADIENTS: Record<MockCategory, string> = {
  "Insurance Tips":
    "linear-gradient(135deg, rgb(255 200 61 / 0.18), rgb(79 224 176 / 0.10))",
  "Savings Stories":
    "linear-gradient(135deg, rgb(79 224 176 / 0.20), rgb(255 200 61 / 0.10))",
  Guides:
    "linear-gradient(135deg, rgb(255 200 61 / 0.22), rgb(255 140 66 / 0.12))",
  "Industry News":
    "linear-gradient(135deg, rgb(255 140 66 / 0.18), rgb(255 200 61 / 0.10))",
};

export function categoryGradient(category: MockCategory): string {
  return CATEGORY_GRADIENTS[category];
}

export function getRelatedMockPosts(slug: string, limit = 3): MockPost[] {
  const current = mockPosts.find((p) => p.slug === slug);
  if (!current) return mockPosts.slice(0, limit);

  const sameCategory = mockPosts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = mockPosts.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
