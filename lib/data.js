import {
  Calendar,
  Video,
  CreditCard,
  User,
  FileText,
  ShieldCheck,
} from "lucide-react";

// JSON data for features
export const features = [
  {
    icon: <User className="h-6 w-6 text-teal-400" />,
    title: "Set Up Your Digital Chart",
    description:
      "Register securely to create your comprehensive health profile, unlocking tailored medical care and quick access to specialists.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-teal-400" />,
    title: "Instant Scheduling",
    description:
      "Filter through top-tier specialists, view real-time availability, and secure your appointment slot in seconds.",
  },
  {
    icon: <Video className="h-6 w-6 text-teal-400" />,
    title: "Virtual Care Rooms",
    description:
      "Meet face-to-face with your physician via our encrypted, crystal-clear video streaming platform without leaving home.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-teal-400" />,
    title: "Flexible Care Plans",
    description:
      "Manage your healthcare budget effortlessly using our transparent credit system, designed for both one-off visits and continuous care.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-teal-400" />,
    title: "Elite Medical Network",
    description:
      "Every practitioner on CareConnect undergoes a rigorous clinical vetting process, guaranteeing you receive premium medical expertise.",
  },
  {
    icon: <FileText className="h-6 w-6 text-teal-400" />,
    title: "Secure Health Records",
    description:
      "Centralize your healthcare journey. Review past visits, physician notes, and prescribed treatments in one private dashboard.",
  },
];

// JSON data for testimonials
export const testimonials = [
  {
    initials: "EM",
    name: "Elena M.",
    role: "Patient",
    quote:
      "CareConnect completely changed how I manage my chronic condition. Being able to securely video chat with my specialist from my living room is an absolute game changer.",
  },
  {
    initials: "MC",
    name: "Dr. Marcus Chen",
    role: "Neurologist",
    quote:
      "The encrypted virtual care rooms on CareConnect are phenomenal. I can review high-res scans and consult with my patients seamlessly, providing top-tier care without the commute.",
  },
  {
    initials: "RJ",
    name: "Rachel J.",
    role: "Mother of two",
    quote:
      "When my son got sick late at night, the instant scheduling feature was a lifesaver. We used our CareConnect credits and had a pediatrician on screen within minutes.",
  },
];

// JSON data for credit system benefits
export const creditBenefits = [
  "Each consultation requires <strong class='text-teal-400'>2 credits</strong> regardless of duration",
  "Credits <strong class='text-teal-400'>never expire</strong> - use them whenever you need",
  "Monthly subscriptions give you <strong class='text-teal-400'>fresh credits every month</strong>",
  "Cancel or change your subscription <strong class='text-teal-400'>anytime</strong> without penalties",
];