export interface ResourceItem {
  id: string;
  title: string;
  url: string;
  image: string;
  phase: number;
  status: "draft" | "beta" | "stable";
}

export const resources: ResourceItem[] = [
  {
    id: "overview",
    title: "Overview",
    url: "/resources/overview",
    image: "/guidelines/coming-soon-preview.svg",
    phase: 1,
    status: "stable",
  },
  {
    id: "starter-kits",
    title: "Starter kits",
    url: "/resources/overview",
    image: "/guidelines/coming-soon-preview.svg",
    phase: 2,
    status: "draft",
  },
  {
    id: "downloadables",
    title: "Downloadables",
    url: "/resources/overview",
    image: "/guidelines/coming-soon-preview.svg",
    phase: 2,
    status: "draft",
  },
];
