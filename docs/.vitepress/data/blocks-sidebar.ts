import {
  blockTemplateCategoryOrder,
  blockTemplateRecommendedOrder,
  templateOverviewGroups,
} from "./pattern-docs";

type SidebarItem = {
  text: string;
  link?: string;
  items?: SidebarItem[];
};

type Sidebar = {
  base: string;
  items: SidebarItem[];
};

const blockItems =
  templateOverviewGroups.find((templateGroup) => templateGroup.group === "block templates")?.items ?? [];

const getRecommendedOrder = (key: string) => {
  const index = blockTemplateRecommendedOrder.indexOf(key);
  return index === -1 ? blockTemplateRecommendedOrder.length : index;
};

export const blocksSidebar: Sidebar = {
  base: "/blocks/",
  items: blockTemplateCategoryOrder
    .map((category) => ({
      text: category,
      items: blockItems
        .filter((item) => item.groupLabel === category)
        .sort((current, next) => getRecommendedOrder(current.key) - getRecommendedOrder(next.key))
        .map((item) => ({
          text: item.title,
          link: item.previewHref,
        })),
    }))
    .filter((category) => category.items.length),
};
