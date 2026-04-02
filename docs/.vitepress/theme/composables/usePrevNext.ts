import { computed } from "vue";
import { useData } from "vitepress";
import { isDraft } from "../../utils/page-status";

function flattenSidebarItems(items: any[], base = "") {
  const result: any[] = [];

  items.forEach((item) => {
    if (item.link && !isDraft(item.text)) {
      const resolvedLink = item.link.startsWith("/") ? item.link : `${base}${item.link}`;
      result.push({
        text: item.text,
        link: resolvedLink,
      });
    }

    if (item.items) {
      result.push(...flattenSidebarItems(item.items, base));
    }
  });

  return result;
}

export function usePrevNext() {
  const { page, theme } = useData();

  return computed(() => {
    const sidebar = theme.value.sidebar;
    if (!sidebar) return {};

    // Find which sidebar section this page belongs to
    const currentPath = page.value.relativePath.replace(".md", "");

    const matchingSidebarKey = Object.keys(sidebar).find((base) =>
      currentPath.startsWith(base.replace("/", ""))
    );

    if (!matchingSidebarKey) return {};

    const group = sidebar[matchingSidebarKey];

    // Flatten group items to a linear list
    const flatList = flattenSidebarItems(group.items, matchingSidebarKey);

    // Find current index
    const currentIndex = flatList.findIndex(
      (i) => i.link.replace(/^\//, "") === currentPath
    );

    const prev = currentIndex > 0 ? flatList[currentIndex - 1] : null;
    const next =
      currentIndex < flatList.length - 1 ? flatList[currentIndex + 1] : null;

    return { prev, next };
  });
}
