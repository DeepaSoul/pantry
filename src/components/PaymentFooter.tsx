import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../utils/theme/theme";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface PriceProps {
  price: string;
  currency: string;
}

interface PaymentFooterProps {
  price: PriceProps;
  buttonPressHandler: any;
  buttonTitle: string;
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonPressHandler,
}) => {
  return (
    <View style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text
          style={[
            styles.PriceTitle,
            { fontFamily: FONTFAMILY.avenir, fontSize: FONTSIZE.size_12 },
          ]}
        >
          Sub total
        </Text>
        <Text
          style={[
            styles.PriceText,
            { fontFamily: FONTFAMILY.avenir_heavy, fontSize: FONTSIZE.size_14 },
          ]}
        >
          R <Text style={styles.Price}>{price.price}</Text>
        </Text>
      </View>
      <View style={styles.PriceContainer}>
        <Text
          style={[
            styles.PriceTitle,
            { fontFamily: FONTFAMILY.avenir, fontSize: FONTSIZE.size_12 },
          ]}
        >
          Delivery
        </Text>
        <Text
          style={[
            styles.PriceText,
            { fontFamily: FONTFAMILY.avenir_heavy, fontSize: FONTSIZE.size_14 },
          ]}
        >
          R{" "}
          <Text style={styles.Price}>
            {(parseFloat(price.price) / 10).toFixed(2)}
          </Text>
        </Text>
      </View>
      <View style={styles.PriceTotalContainer}>
        <Text style={styles.PriceText}>Total</Text>
        <Text style={styles.PriceText}>
          R{" "}
          <Text style={[styles.Price, { fontSize: FONTSIZE.size_18 }]}>
            {(parseFloat(price.price) + parseFloat(price.price) / 10).toFixed(
              2
            )}
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.PayButton}
        onPress={() => buttonPressHandler()}
      >
        <Text style={styles.ButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  PriceFooter: {
    alignItems: "flex-start",
    backgroundColor: COLORS.backgroundGrey,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_15,
    gap: SPACING.space_8,
  },
  PriceContainer: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  PriceTotalContainer: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.primaryBlackRGBA,
  },
  PriceTitle: {
    fontFamily: FONTFAMILY.avenir,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackRGBA,
  },
  PriceText: {
    fontFamily: FONTFAMILY.adobe_garamond_bold,
    fontSize: FONTSIZE.size_18,
    marginTop: SPACING.space_8,
    color: COLORS.primaryBlackRGBA,
  },
  Price: {
    color: COLORS.primaryBlackRGBA,
  },
  PayButton: {
    width: SCREEN_WIDTH * 0.9,
    marginTop: SPACING.space_8,
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: "center",
    justifyContent: "center",
    height: SPACING.space_20 * 2.2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.avenir,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});

export default PaymentFooter;
