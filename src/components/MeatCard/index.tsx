import React, { useContext, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../../utils/theme/theme";
import Cart from "../../assets/icons/cart.svg";
import Correct from "../../assets/icons/correct.svg";
import { TYPE_MeatData } from "../../utils/types";
import AuthContext from "../../authContext";

const CARD_WIDTH = Dimensions.get("window").width;

interface meatCardProps {
  item: TYPE_MeatData;
  buttonPressHandler: (params: TYPE_MeatData) => void;
}

const MeatCard: React.FC<meatCardProps> = ({ item, buttonPressHandler }) => {
  const [submitted, setSubmitted] = useState(false);
  const { exploreApp, setExploreApp } = useContext(AuthContext);

  return (
    <View style={styles.CardLinearGradientContainer}>
      <ImageBackground
        source={item.imagelink}
        style={styles.CardImageBG}
        resizeMode="cover"
      />
      <Text style={styles.CardTitle}>{item?.name}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          R <Text style={styles.CardPrice}>{item?.price ?? 1}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (exploreApp) {
              setExploreApp?.(false);
            } else {
              buttonPressHandler({
                ...item,
              });
              setSubmitted(true);
              setTimeout(() => {
                setSubmitted(false);
              }, 1000);
            }
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 22,
              height: 22,
              borderWidth: 1,
              borderColor: COLORS.primaryBlackRGBA,
              borderRadius: 16,
              backgroundColor: submitted ? COLORS.primaryBlackRGBA : undefined,
              marginLeft: -SPACING.space_4
            }}
          >
            {submitted ? (
              <Correct height={14} color={COLORS.primaryWhiteHex} />
            ) : (
              <Cart height={14} color={COLORS.primaryBlackRGBA} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    width: CARD_WIDTH * 0.44,
  },
  CardImageBG: {
    width: "100%",
    height: CARD_WIDTH * 0.5,
    borderRadius: BORDERRADIUS.radius_4,
    marginBottom: SPACING.space_15,
    overflow: "hidden",
  },
  CardTitle: {
    fontFamily: FONTFAMILY.avenir,
    lineHeight: 20,
    color: COLORS.primaryBlackRGBA,
    fontSize: FONTSIZE.size_16,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.avenir,
    color: COLORS.primaryBlackRGBA,
    fontSize: FONTSIZE.size_10,
  },
  CardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.space_15,
    paddingRight: SPACING.space_2
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.avenir_heavy,
    color: COLORS.primaryBlackRGBA,
    fontSize: FONTSIZE.size_18,
  },
  CardPrice: {
    color: COLORS.primaryBlackRGBA,
  },
});

export default MeatCard;
