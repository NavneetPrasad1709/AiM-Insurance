import type {
  NavLink,
  ProcessStep,
  ServiceType,
  SocialLink,
  Stat,
} from "@/types";

export const SITE_CONFIG = {
  name: "AiM Insurance",
  tagline: "Get Insurance Without the Stress. We Negotiate for You",
  description:
    "AiM Insurance connects you with expert negotiators who fight for the best deal on car, home, boat, yacht & jet insurance, same coverage, lower premiums.",
  url: "https://getaiminsurance.com",
  email: "info@getaiminsurance.com",
  phone: "+1-602-910-2500",
  twitterHandle: "@carconciergepro",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Insurance Services",
    href: "#",
    children: [
      {
        label: "Car Insurance",
        href: "/car-insurance",
        icon: "Car",
        description: "Save on auto insurance premiums",
      },
      {
        label: "Home Insurance",
        href: "/home-insurance",
        icon: "Home",
        description: "Protect your home for less",
      },
      {
        label: "Boat Insurance",
        href: "/boat-insurance",
        icon: "Ship",
        description: "Marine insurance savings",
      },
      {
        label: "Yacht Insurance",
        href: "/yacht-insurance",
        icon: "Anchor",
        description: "Luxury vessel coverage",
      },
      {
        label: "Jet Insurance",
        href: "/jet-insurance",
        icon: "Plane",
        description: "Aviation insurance",
      },
    ],
  },
  { label: "Calculator", href: "/calculator" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/carconciergepro",
    icon: "Instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/CarConciergeProUSA/",
    icon: "Facebook",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/carconciergepro/",
    icon: "Linkedin",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@carconciergepro",
    icon: "Youtube",
  },
];

export const SERVICES: ServiceType[] = [
  {
    name: "Car Insurance",
    slug: "car-insurance",
    icon: "Car",
    shortDescription:
      "We help you lock down the best car insurance deal.",
    heroTitle: "Expert Car Insurance Negotiation: Save $1,247+ Annually",
    heroDescription:
      "AiM negotiates with top providers to get you the best car insurance rates with the same coverage.",
  },
  {
    name: "Home Insurance",
    slug: "home-insurance",
    icon: "Home",
    shortDescription:
      "Our team ensures your home is protected without inflated premiums.",
    heroTitle: "Protect Your Home: Pay Less for Premium Coverage",
    heroDescription:
      "Whether you own or rent, our team ensures your home is protected without paying inflated premiums.",
  },
  {
    name: "Boat Insurance",
    slug: "boat-insurance",
    icon: "Ship",
    shortDescription:
      "Keep your boat secure while cutting through confusing pricing.",
    heroTitle: "Navigate Savings on Boat Insurance",
    heroDescription:
      "We help you keep your boat secure on the water while cutting through the industry's confusing pricing.",
  },
  {
    name: "Yacht Insurance",
    slug: "yacht-insurance",
    icon: "Anchor",
    shortDescription:
      "Custom yacht coverage that reflects your lifestyle and budget.",
    heroTitle: "Luxury Yacht Coverage: Negotiated for Your Lifestyle",
    heroDescription:
      "For high-value vessels, we negotiate custom yacht coverage that reflects your lifestyle and your budget.",
  },
  {
    name: "Jet Insurance",
    slug: "jet-insurance",
    icon: "Plane",
    shortDescription:
      "Luxury jets need elite protection at the right price.",
    heroTitle: "Private Jet Insurance: Elite Protection at the Right Price",
    heroDescription:
      "Luxury jets need elite protection. We negotiate premium coverage at the right price.",
  },
];

export const STATS: Stat[] = [
  { value: "1100+", label: "Clients Served" },
  { value: "$6.14M+", label: "Negotiated Savings" },
  { value: "$1,247+", label: "Avg. Annual Savings" },
  { value: "50+", label: "Providers Compared" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Share Your Policy",
    description: "Send us your current policy, and let's get started!",
    icon: "FileText",
  },
  {
    step: 2,
    title: "We Review & Ask Questions",
    description:
      "We'll dive into the details and reach out if we need anything regarding your policy & driving history.",
    icon: "Search",
  },
  {
    step: 3,
    title: "We Assess the Market",
    description:
      "Time to shop around! We compare and negotiate with multiple providers to get the lowest premiums.",
    icon: "BarChart3",
  },
  {
    step: 4,
    title: "Better Premiums, Same Coverage",
    description:
      "We'll share insights and show you how to save without cutting corners on coverage.",
    icon: "Shield",
  },
  {
    step: 5,
    title: "You Pay, We Switch",
    description:
      "Once you're happy, we'll help you make the switch with zero hassle.",
    icon: "CreditCard",
  },
  {
    step: 6,
    title: "Stay Happy",
    description:
      "Enjoy the peace of mind knowing you're paying less for the same great coverage!",
    icon: "Smile",
  },
];
