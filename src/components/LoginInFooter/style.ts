import { Dimensions, StyleSheet } from "react-native";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  SPACING,
} from "../../utils/theme/theme";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  FooterContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  FooterButton: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.95,
    height: SPACING.space_28 * 2,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderRadius: BORDERRADIUS.radius_20 * 4,
    marginVertical: SPACING.space_30,
  },
  FooterButtonText: {
    fontFamily: FONTFAMILY.avenir,
    color: COLORS.primaryWhiteHex,
  },
  ScreenChangeText: {
    fontFamily: FONTFAMILY.avenir,
    fontSize: SPACING.space_15,
    color: COLORS.primaryBlackRGBA,
    marginBottom: SPACING.space_8,
  },
  ScreenChangeInnerText: {
    fontFamily: FONTFAMILY.avenir_heavy,
  },
  Options: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: SCREEN_WIDTH * 0.05,
    width: SCREEN_WIDTH * 0.95,
  },
  GreenLine: {
    height: 1,
    width: SCREEN_WIDTH * 0.375,
    backgroundColor: COLORS.primaryBlackRGBA,
  },
  OptionsText: {
    fontFamily: FONTFAMILY.avenir,
    marginHorizontal: SPACING.space_20,
  },
});

export default styles;
