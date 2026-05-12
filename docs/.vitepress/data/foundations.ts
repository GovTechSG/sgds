import { getFoundationEntryUrl } from "./foundations-sidebar";

export interface FoundationItem {
  id: string;
  title: string;
  url: string;
  image: string;
  imageFit?: "cover" | "contain";
  imageClass?: string;
  phase: number;
  status: "draft" | "beta" | "stable";
}

export const foundations: FoundationItem[] = [
  {
    id: "colour",
    title: "Colour",
    url: getFoundationEntryUrl("colour"),
    image: "/foundations/colour.svg",
    imageFit: "contain",
    imageClass: "sgds:w-[56%] sgds:h-[48%]",
    phase: 1,
    status: "stable",
  },
  {
    id: "iconography",
    title: "Iconography",
    url: getFoundationEntryUrl("iconography"),
    image: "/foundations/iconography.svg",
    imageFit: "contain",
    imageClass: "sgds:w-[36%] sgds:h-[48%]",
    phase: 1,
    status: "stable",
  },
  {
    id: "typography",
    title: "Typography",
    url: getFoundationEntryUrl("typography"),
    image: "/foundations/typography.svg",
    imageFit: "contain",
    imageClass: "sgds:w-[43%] sgds:h-[58%]",
    phase: 1,
    status: "stable",
  },
  {
    id: "layout",
    title: "Layout",
    url: getFoundationEntryUrl("layout"),
    image: "/foundations/layout.svg",
    imageFit: "contain",
    imageClass: "sgds:w-[27%] sgds:h-[48%]",
    phase: 1,
    status: "stable",
  },
  {
    id: "motion",
    title: "Motion",
    url: getFoundationEntryUrl("motion"),
    image: "/foundations/motion.svg",
    imageFit: "contain",
    imageClass: "sgds:w-[43%] sgds:h-[48%]",
    phase: 1,
    status: "stable",
  },
  {
    id: "border",
    title: "Border",
    url: getFoundationEntryUrl("border"),
    image: "/foundations/border.svg",
    imageFit: "contain",
    imageClass: "sgds:w-[45%] sgds:h-[48%]",
    phase: 1,
    status: "stable",
  },
  {
    id: "spacing",
    title: "Spacing",
    url: getFoundationEntryUrl("spacing"),
    image: "/foundations/spacing.svg",
    imageFit: "contain",
    imageClass: "sgds:w-[34%] sgds:h-[48%]",
    phase: 1,
    status: "stable",
  },
  {
    id: "layer",
    title: "Layer",
    url: getFoundationEntryUrl("layer"),
    image: "/foundations/layer.svg",
    imageFit: "contain",
    imageClass: "sgds:w-[34%] sgds:h-[57%]",
    phase: 1,
    status: "stable",
  },
  {
    id: "design-tokens",
    title: "Design tokens",
    url: getFoundationEntryUrl("design-tokens"),
    image: "/foundations/design-tokens.svg",
    imageFit: "contain",
    imageClass: "sgds:w-[34%] sgds:h-[45%]",
    phase: 1,
    status: "stable",
  },
];
