export type NavItem = {
  text: string;
  link: string;
  activeMatch: string;
};

export const mainNavItems: NavItem[] = [
  { text: "Get started", link: "/get-started/", activeMatch: "/get-started" },
  { text: "Foundations", link: "/foundations/", activeMatch: "/foundations" },
  { text: "Components", link: "/components/accordion", activeMatch: "/components" },
  { text: "Patterns", link: "/patterns/page-templates/form-page", activeMatch: "/patterns" },
  { text: "Guidelines", link: "/guidelines/", activeMatch: "/guidelines" },
  { text: "Resources", link: "/resources/", activeMatch: "/resources" },
  { text: "AI", link: "/ai/introduction", activeMatch: "/ai" },
];
