import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ImageProps,
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
import { TYPE_MeatData, TYPE_MeatType } from "../../utils/types";

const CARD_WIDTH = Dimensions.get("window").width;

interface meatCardProps {
  item: TYPE_MeatData;
  buttonPressHandler: (params: TYPE_MeatData) => void;
}

const MeatCard: React.FC<meatCardProps> = ({ item, buttonPressHandler }) => {
  const [submitted, setSubmitted] = useState(false);

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
          R <Text style={styles.CardPrice}>{item?.priceQuantity?.price ?? 1}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler({
              ...item,
            });
            setSubmitted(true);
            setTimeout(() => {
              setSubmitted(false);
            }, 1000);
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 25,
              height: 25,
              borderWidth: 1,
              borderColor: COLORS.primaryBlackRGBA,
              borderRadius: 16,
              backgroundColor: submitted ? COLORS.primaryBlackRGBA : undefined,
            }}
          >
            {submitted ? (
              <Correct height={16} color={COLORS.primaryWhiteHex} />
            ) : (
              <Cart height={16} color={COLORS.primaryBlackRGBA} />
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
