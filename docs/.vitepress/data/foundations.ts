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
    url: "/foundations/colour/our-colours",
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
    url: "/foundations/colour/our-colours",
    image: "/foundations/layout.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "motion",
    title: "Motion",
    url: "/foundations/colour/our-colours",
    image: "",
    phase: 2,
    status: "draft",
  },
  {
    id: "border",
    title: "Border",
    url: "/foundations/colour/our-colours",
    image: "",
    phase: 1,
    status: "stable",
  },
  {
    id: "spacing",
    title: "Spacing",
    url: "/foundations/colour/our-colours",
    image: "",
    phase: 1,
    status: "stable",
  },
  {
    id: "interaction",
    title: "Interaction",
    url: "/foundations/colour/our-colours",
    image: "",
    phase: 2,
    status: "draft",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    url: "/foundations/colour/our-colours",
    image: "",
    phase: 2,
    status: "draft",
  },
  {
    id: "logo",
    title: "Logo",
    url: "/foundations/colour/our-colours",
    image: "",
    phase: 4,
    status: "draft",
  },
  {
    id: "voice-of-tone",
    title: "Voice of tone",
    url: "/foundations/colour/our-colours",
    image: "",
    phase: 4,
    status: "draft",
  },
  {
    id: "photography",
    title: "Photography",
    url: "/foundations/colour/our-colours",
    image: "",
    phase: 4,
    status: "draft",
  },
  {
    id: "illustration",
    title: "Illustration",
    url: "/foundations/colour/our-colours",
    image: "",
    phase: 4,
    status: "draft",
  },
  {
    id: "data-format",
    title: "Data format",
    url: "/foundations/colour/our-colours",
    image: "",
    phase: 2,
    status: "draft",
  },
  {
    id: "data-visualisation",
    title: "Data visualisation",
    url: "/foundations/colour/our-colours",
    image: "",
    phase: 3,
    status: "draft",
  },
];
