export type GovtechColourCard = {
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  bordered?: boolean;
};

export type GovtechColourGroup = {
  title: string;
  colours: GovtechColourCard[];
};

export const govtechColourPaletteGroups: GovtechColourGroup[] = [
  {
    title: "Primary colour",
    colours: [
      {
        name: "Red",
        hex: "#F4333D",
        rgb: "244, 51, 61",
        hsl: "357deg, 90%, 58%",
      },
      {
        name: "Magenta",
        hex: "#BA2FA2",
        rgb: "186, 47, 162",
        hsl: "310deg, 60%, 46%",
      },
      {
        name: "Cyan",
        hex: "#00C0F3",
        rgb: "0, 192, 243",
        hsl: "193deg, 100%, 48%",
      },
    ],
  },
  {
    title: "Extended colour",
    colours: [
      {
        name: "Blue",
        hex: "#448DDD",
        rgb: "68, 141, 221",
        hsl: "211deg, 69%, 57%",
      },
      {
        name: "Purple",
        hex: "#885AC6",
        rgb: "136, 90, 198",
        hsl: "266deg, 49%, 56%",
      },
      {
        name: "Pink",
        hex: "#E02D77",
        rgb: "224, 45, 119",
        hsl: "335deg, 74%, 53%",
      },
    ],
  },
  {
    title: "Neutral colour",
    colours: [
      {
        name: "White",
        hex: "#FFFFFF",
        rgb: "255, 255, 255",
        hsl: "0deg, 0%, 100%",
        bordered: true,
      },
      {
        name: "Black",
        hex: "#0E0E0E",
        rgb: "14, 14, 14",
        hsl: "0deg, 0%, 5%",
        bordered: true,
      },
    ],
  },
];
