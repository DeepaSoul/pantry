import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Text,
} from "react-native";
import { useStore } from "../../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BORDERRADIUS, COLORS, SPACING } from "../../utils/theme/theme";
import HeaderBar from "../../components/HeaderBar";
import EmptyListAnimation from "../../components/EmptyListAnimation";
import PaymentFooter from "../../components/PaymentFooter";
import CartItem from "../../components/CartItem";
import Container from "../../components/Container";
import Title from "../../components/Title";
import AuthContext from "../../authContext";
import Loader from "../../components/Loader";

const CARD_HEIGHT = Dimensions.get("window").height;
const CARTSCREEN_WIDTH = Dimensions.get("window").width;

const CartScreen = ({ navigation }: any) => {
  const { exploreApp, setExploreApp } = useContext(AuthContext);
  navigation.setOptions({ tabBarStyle: { display: "none" } });

  const [promoCode, setPromoCode] = useState("");
  const CartList = useStore((state: any) => state.CartList);

  const CartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity
  );
  const removeCartItem = useStore((state: any) => state.removeCartItem);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    navigation.push("Payment", { amount: CartPrice });
  };

  const incrementCartItemQuantityHandler = (id: string) => {
    incrementCartItemQuantity(id);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string) => {
    decrementCartItemQuantity(id);
    calculateCartPrice();
  };

  useEffect(() => {
    if (exploreApp) {
      setExploreApp?.(false);
    }
  }, [exploreApp]);

  if (exploreApp) {
    return <Loader />;
  }

  return (
    <Container>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <View
        style={[
          styles.ItemContainer,
          { height: CARD_HEIGHT * (CartList.length === 0 ? 0.9 : 0.6) },
        ]}
      >
        <HeaderBar title="Cart" />
        <Title title="" />

        {CartList.length === 0 ? (
          <EmptyListAnimation title={"Cart is Empty"} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ScrollViewFlex}
          >
            <View style={styles.ListItemContainer}>
              {CartList.map((data: any) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("Details", {
                      index: data.index,
                      id: data.id,
                      type: data.type,
                    });
                  }}
                  key={data.id}
                >
                  <CartItem
                    item={data}
                    incrementCartItemQuantityHandler={
                      incrementCartItemQuantityHandler
                    }
                    decrementCartItemQuantityHandler={
                      decrementCartItemQuantityHandler
                    }
                    removeCartItem={(id) => {
                      removeCartItem(id);
                      calculateCartPrice();
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      {CartList.length !== 0 && (
        <View style={styles.CartContainer}>
          <TextInput
            placeholder="Add your promo code"
            value={promoCode}
            onChangeText={(text) => {
              setPromoCode(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={{
              color: COLORS.primaryBlackRGBA,
              marginHorizontal: SPACING.space_8,
              width: CARTSCREEN_WIDTH * 0.68,
            }}
          />
          <View style={styles.PromoCodeInputBorder} />
          <Text>Apply</Text>
        </View>
      )}
      <View style={{ marginBottom: tabBarHeight }}>
        {CartList.length !== 0 && (
          <PaymentFooter
            buttonPressHandler={buttonPressHandler}
            buttonTitle="Pay"
            price={{ price: CartPrice, currency: "$" }}
          />
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    marginTop: SPACING.space_8,
  },
  ItemContainer: {
    padding: SPACING.space_15,
  },
  ListItemContainer: {
    gap: SPACING.space_20,
  },
  CartContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.primaryBlackRGBA,
    borderRadius: BORDERRADIUS.radius_25,
    padding: SPACING.space_8,
    margin: SPACING.space_15,
    backgroundColor: COLORS.primaryFloral,
    shadowColor: "rgba(84, 99, 75, 0.2)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0,
    elevation: 6,
  },
  PromoCodeInputBorder: {
    borderLeftWidth: 1,
    borderLeftColor: COLORS.primaryBlackRGBA,
    marginRight: SPACING.space_8,
  },
});

export default CartScreen;
