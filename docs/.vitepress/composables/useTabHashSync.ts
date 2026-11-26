import { ref, nextTick, onMounted, onBeforeUnmount, type Ref } from "vue";

/**
 * Syncs a `<sgds-tab-group>` with the URL hash.
 *
 * @param panels        Panel names the tab group accepts (used to validate the hash).
 * @param options.slug  Convert a panel name to a URL-safe hash slug. Defaults to lowercase identity.
 * @param options.defaultPanel  Panel to skip when writing the hash (avoids `#design` on every component page).
 */
export function useTabHashSync(
  panels: Ref<string[]> | string[],
  options: {
    slug?: (panel: string) => string;
    defaultPanel?: string;
  } = {},
) {
  const tabGroupRef = ref<Element | null>(null);

  const toSlug = options.slug ?? ((p: string) => p.toLowerCase());

  const resolvePanels = () => (Array.isArray(panels) ? panels : panels.value);

  const panelFromHash = (hash: string): string | undefined => {
    const slug = hash.toLowerCase().replace(/[^a-z0-9]+/g, "");
    return resolvePanels().find((p) => toSlug(p).replace(/[^a-z0-9]+/g, "") === slug);
  };

  const activateTabFromHash = async () => {
    await nextTick();
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const panel = panelFromHash(hash);
    if (!panel || panel === options.defaultPanel) return;

    await customElements.whenDefined("sgds-tab-group");

    // Find the tab group that contains the matching panel.
    // When there's a single ref it's used directly; when there are multiple
    // tab groups on the page (e.g. Getting Started) we query the DOM.
    let tabGroup: any = tabGroupRef.value;
    if (!tabGroup || !tabGroup.querySelector?.(`[panel="${panel}"]`)) {
      const groups = document.querySelectorAll("sgds-tab-group");
      for (const g of groups) {
        if (g.querySelector(`[panel="${panel}"]`)) {
          tabGroup = g;
          break;
        }
      }
    }

    await tabGroup?.updateComplete;
    tabGroup?.show?.(panel);

    // Scroll the tab group into view so the activated tab is visible
    (tabGroup as Element)?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  };

  const handleTabClick = (panel: string) => {
    history.replaceState(null, "", `${window.location.pathname}#${toSlug(panel)}`);
  };

  onMounted(() => {
    void activateTabFromHash();
    window.addEventListener("hashchange", activateTabFromHash);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("hashchange", activateTabFromHash);
  });

  return { tabGroupRef, handleTabClick, activateTabFromHash };
}
