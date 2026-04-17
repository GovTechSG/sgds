export interface FoundationItem {
  id: string;
  title: string;
  url: string;
  image: string;
  phase: number;
  status: "draft" | "beta" | "stable";
}

export const foundations: FoundationItem[] = [
  {
    id: "colour",
    title: "Colour",
    url: "/foundations/colour/our-colours",
    image: "/foundations/colour.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "iconography",
    title: "Iconography",
    url: "/foundations/iconography/iconography-principles",
    image: "/foundations/iconography.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "typography",
    title: "Typography",
    url: "/foundations/typography/our-typography",
    image: "/foundations/typography.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "layout",
    title: "Layout",
    url: "/foundations/layout/layout-principle",
    image: "/foundations/layout.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "border",
    title: "Border",
    url: "/foundations/border",
    image: "",
    phase: 1,
    status: "stable",
  },
  {
    id: "spacing",
    title: "Spacing",
    url: "/foundations/spacing",
    image: "",
    phase: 1,
    status: "stable",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    url: "/foundations/accessibility/accessibility",
    image: "",
    phase: 2,
    status: "draft",
  },
  {
    id: "motion",
    title: "Motion",
    url: "",
    image: "",
    phase: 2,
    status: "draft",
  },
  {
    id: "interaction",
    title: "Interaction",
    url: "",
    image: "",
    phase: 2,
    status: "draft",
  },
  {
    id: "data-format",
    title: "Data format",
    url: "",
    image: "",
    phase: 2,
    status: "draft",
  },
  {
    id: "data-visualisation",
    title: "Data visualisation",
    url: "",
    image: "",
    phase: 2,
    status: "draft",
  },
  {
    id: "logo",
    title: "Logo",
    url: "",
    image: "",
    phase: 3,
    status: "draft",
  },
  {
    id: "voice-of-tone",
    title: "Voice of tone",
    url: "",
    image: "",
    phase: 3,
    status: "draft",
  },
  {
    id: "photography",
    title: "Photography",
    url: "",
    image: "",
    phase: 3,
    status: "draft",
  },
  {
    id: "illustration",
    title: "Illustration",
    url: "",
    image: "",
    phase: 3,
    status: "draft",
  },
];
