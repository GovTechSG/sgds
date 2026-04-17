export interface GuidelineItem {
  id: string;
  title: string;
  url: string;
  image: string;
  phase: number;
  status: "draft" | "beta" | "stable";
}

export const guidelines: GuidelineItem[] = [
  {
    id: "overview",
    title: "Overview",
    url: "/guidelines/overview",
    image: "/guidelines/coming-soon-preview.svg",
    phase: 1,
    status: "stable",
  },
  {
    id: "content-guidelines",
    title: "Content guidance",
    url: "/guidelines/overview",
    image: "/guidelines/coming-soon-preview.svg",
    phase: 2,
    status: "draft",
  },
  {
    id: "interaction-guidelines",
    title: "Interaction guidance",
    url: "/guidelines/overview",
    image: "/guidelines/coming-soon-preview.svg",
    phase: 2,
    status: "draft",
  },
];
