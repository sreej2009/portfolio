export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: NavLink[] = [
  { label: "Email", href: "mailto:hello@sree.dev" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sree" },
  { label: "GitHub", href: "https://github.com/sree" },
  { label: "Instagram", href: "https://instagram.com/sree" },
];
