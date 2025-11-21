import { foundations } from "../data/foundations";

export const isDraft = (title: string) => {
  return foundations.some(
    (f) => f.title.toLowerCase() === title.toLowerCase() && f.status === "draft"
  );
};
