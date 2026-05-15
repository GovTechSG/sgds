import { ref } from "vue";
import updatesData from "../data/generated-component-updates.json";

export type UpdateRow = { Date: string; Version: string; Description: string };

const releaseMap = updatesData as Record<string, UpdateRow[]>;

export function useComponentUpdates(componentKey: string) {
  const rows = ref<UpdateRow[]>(releaseMap[componentKey] ?? []);
  const loading = ref(false);
  const error = ref(false);

  return { rows, loading, error };
}
