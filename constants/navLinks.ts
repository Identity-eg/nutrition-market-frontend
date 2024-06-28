import {
  Home,
  Layers3,
  MessagesSquare,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

export const navLinks = [
  { id: 1, label: "Home", path: "/", icon: Home },
  { id: 2, label: "Shop", path: "/shop", icon: ShoppingCart },
  { id: 3, label: "Benefit health", path: "/benefit-health", icon: Package },
  { id: 4, label: "Contact us", path: "/contact-us", icon: Layers3 },
  {
    id: 5,
    label: "About us",
    path: "/about-us",
    icon: Users,
  },
];
