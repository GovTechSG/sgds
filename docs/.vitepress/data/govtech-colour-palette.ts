export type GovtechColourCard = {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
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
        rgb: "244 / 51 / 61",
        cmyk: "0 / 79 / 75 / 4",
      },
      {
        name: "Magenta",
        hex: "#BA2FA2",
        rgb: "186 / 47 / 162",
        cmyk: "0 / 75 / 13 / 27",
      },
      {
        name: "Cyan",
        hex: "#00C0F3",
        rgb: "0 / 192 / 243",
        cmyk: "100 / 21 / 0 / 5",
      },
    ],
  },
  {
    title: "Extended colour",
    colours: [
      {
        name: "Blue",
        hex: "#448DDD",
        rgb: "68 / 141 / 221",
        cmyk: "69 / 36 / 0 / 13",
      },
      {
        name: "Purple",
        hex: "#885AC6",
        rgb: "136 / 90 / 198",
        cmyk: "31 / 55 / 0 / 22",
      },
      {
        name: "Pink",
        hex: "#E02D77",
        rgb: "224 / 45 / 119",
        cmyk: "0 / 80 / 47 / 12",
      },
    ],
  },
  {
    title: "Neutral colour",
    colours: [
      {
        name: "White",
        hex: "#FFFFFF",
        rgb: "255 / 255 / 255",
        cmyk: "0 / 0 / 0 / 0",
        bordered: true,
      },
      {
        name: "Black",
        hex: "#0E0E0E",
        rgb: "14 / 14 / 14",
        cmyk: "0 / 0 / 0 / 95",
        bordered: true,
      },
    ],
  },
];
