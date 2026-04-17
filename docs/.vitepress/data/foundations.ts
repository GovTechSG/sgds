import { getFoundationEntryUrl } from "./foundations-sidebar";

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
    url: getFoundationEntryUrl("colour"),
    image: "/foundations/colour.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "iconography",
    title: "Iconography",
    url: getFoundationEntryUrl("iconography"),
    image: "/foundations/iconography.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "typography",
    title: "Typography",
    url: getFoundationEntryUrl("typography"),
    image: "/foundations/typography.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "layout",
    title: "Layout",
    url: getFoundationEntryUrl("layout"),
    image: "/foundations/layout.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "border",
    title: "Border",
    url: getFoundationEntryUrl("border"),
    image: "",
    phase: 1,
    status: "stable",
  },
  {
    id: "spacing",
    title: "Spacing",
    url: getFoundationEntryUrl("spacing"),
    image: "",
    phase: 1,
    status: "stable",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    url: getFoundationEntryUrl("accessibility"),
    image: "",
    phase: 2,
    status: "draft",
  },
  {
    id: "layer",
    title: "Layer",
    url: getFoundationEntryUrl("layer"),
    image: "",
    phase: 1,
    status: "stable",
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
