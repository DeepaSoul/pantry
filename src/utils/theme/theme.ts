interface Spacing {
  space_2: number;
  space_4: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_15: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_24: number;
  space_28: number;
  space_30: number;
  space_32: number;
  space_36: number;
}

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_30: 30,
  space_32: 32,
  space_36: 36,
};

interface Color {
  primaryOrangeHex: string;
  primaryBlackHex: string;
  primaryDarkGreyHex: string;
  secondaryDarkGreyHex: string;
  primaryGreyHex: string;
  secondaryGreyHex: string;
  primaryLightGreyHex: string;
  secondaryLightGreyHex: string;
  primaryWhiteHex: string;
  primaryBlackRGBA: string;
  secondaryBlackRGBA: string;
  backgroundGrey: string;
  primaryFloral: string;
}

export const COLORS: Color = {
  primaryFloral: "#FCF9F5",
  primaryOrangeHex: "#FFFFFF",
  primaryBlackHex: "#FCF9F5", // 2
  primaryDarkGreyHex: "#FCF9F5", // 1
  secondaryDarkGreyHex: "#21262E",
  primaryGreyHex: "#252A32",
  secondaryGreyHex: "#252A32",
  primaryLightGreyHex: "#352329", //grey
  secondaryLightGreyHex: "#AEAEAE",
  primaryWhiteHex: "#FFFFFF",
  primaryBlackRGBA: "#54634B",
  secondaryBlackRGBA: "rgba(0,0,0,0.7)",
  backgroundGrey: "#EBEAE4",
};

interface FontFamily {
  avenir: string;
  avenir_heavy: string;
  avenir_regular: string;
  adobe_garamond: string;
  adobe_garamond_bold: string;
}

export const FONTFAMILY: FontFamily = {
  avenir: "Avenir",
  avenir_heavy: "Avenir-Heavy",
  avenir_regular: "Avenir-Book",
  adobe_garamond: "AGaramondPro-BoldItalic",
  adobe_garamond_bold: "AGaramondPro-Bold",
};

interface FontSize {
  size_8: number;
  size_10: number;
  size_12: number;
  size_14: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_24: number;
  size_28: number;
  size_30: number;
}

export const FONTSIZE: FontSize = {
  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_28: 28,
  size_30: 30,
};

interface BorderRadius {
  radius_4: number;
  radius_8: number;
  radius_10: number;
  radius_15: number;
  radius_20: number;
  radius_25: number;
}

export const BORDERRADIUS: BorderRadius = {
  radius_4: 4,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_20: 20,
  radius_25: 25,
};
