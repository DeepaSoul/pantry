import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../utils/theme/theme";
import { TYPE_MeatData } from "../utils/types";

const CARD_WIDTH = Dimensions.get("window").width;
interface CartItemProps {
  item: TYPE_MeatData;
  incrementCartItemQuantityHandler: (id: string) => void;
  decrementCartItemQuantityHandler: (id: string) => void;
  removeCartItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
  removeCartItem,
}) => {
  return (
    <View style={styles.CartItemSContainer}>
      <Image source={item.imagelink} style={styles.CartItemSingleImage} />
      <View style={styles.CartItemSingleInfoContainer}>
        <Text style={styles.CartItemTitle}>{item.name}</Text>
        <Text style={styles.CartItemSubtitle}>
          R {(item.price ?? 1 * item.quantity).toFixed(2)}
        </Text>
        <View style={styles.CartItemSingleQuantityContainer}>
          <TouchableOpacity
            style={styles.CartItemRemoveButton}
            onPress={() => {
              removeCartItem(item.id);
            }}
          >
            <Text style={{ color: COLORS.primaryBlackRGBA }}>Remove</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: SPACING.space_8,
            }}
          >
            <TouchableOpacity
              style={styles.CartItemIcon}
              onPress={() => {
                decrementCartItemQuantityHandler(item.id);
              }}
            >
              <Text style={{ color: COLORS.primaryBlackRGBA }}>-</Text>
            </TouchableOpacity>
            <Text style={styles.CartItemQuantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.CartItemIcon}
              onPress={() => {
                incrementCartItemQuantityHandler(item.id);
              }}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CartItemSContainer: {
    width: CARD_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.space_12,
    paddingBottom: SPACING.space_10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryBlackRGBA,
  },
  CartItemLinearGradient: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CartItemRow: {
    flexDirection: "row",
    gap: SPACING.space_12,
    flex: 1,
  },
  CartItemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
  CartItemInfo: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: "space-between",
  },
  CartItemTitle: {
    fontFamily: FONTFAMILY.avenir,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryBlackRGBA,
  },
  CartItemSubtitle: {
    fontFamily: FONTFAMILY.adobe_garamond,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackRGBA,
  },
  CartItemRoastedContainer: {
    height: 50,
    width: 50 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryBlackRGBA,
  },
  CartItemRoastedText: {
    fontFamily: FONTFAMILY.avenir,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryBlackRGBA,
  },
  CartItemSizeRowContainer: {
    flex: 1,
    alignItems: "center",
    gap: SPACING.space_20,
    flexDirection: "row",
    justifyContent: "center",
  },
  CartItemSizeValueContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SizeBox: {
    backgroundColor: COLORS.primaryBlackRGBA,
    height: 40,
    width: 100,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: "center",
    alignItems: "center",
  },
  SizeText: {
    fontFamily: FONTFAMILY.avenir,
    color: COLORS.primaryBlackRGBA,
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.avenir,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryBlackRGBA,
  },
  SizePrice: {
    color: COLORS.primaryBlackRGBA,
  },
  CartItemIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CartItemRemoveButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_25,
    padding: SPACING.space_4,
    marginRight: CARD_WIDTH * 0.05,
  },
  CartItemQuantityContainer: {
    backgroundColor: COLORS.primaryBlackRGBA,
    width: 80,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: COLORS.primaryBlackRGBA,
    alignItems: "center",
    paddingVertical: SPACING.space_4,
  },
  CartItemQuantityText: {
    fontFamily: FONTFAMILY.avenir,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackRGBA,
  },

  CartItemSingleImage: {
    height: 130,
    width: 130,
  },
  CartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-around",
  },
  CartItemSingleSizeValueContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  CartItemSingleQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CartItem;
