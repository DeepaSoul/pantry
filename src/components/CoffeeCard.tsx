import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../utils/theme/theme';
import Cart from '../assets/icons/cart.svg';

const CARD_WIDTH = Dimensions.get('window').width;

interface meatCardProps {
  id: string;
  index: number;
  type: string;
  roasted: string;
  imagelink_square: ImageProps;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
}

const meatCard: React.FC<meatCardProps> = ({
  id,
  index,
  type,
  roasted,
  imagelink_square,
  name,
  special_ingredient,
  price,
  buttonPressHandler,
}) => {
  return (
    <View style={styles.CardLinearGradientContainer}>
      <ImageBackground
        source={imagelink_square}
        style={styles.CardImageBG}
        resizeMode="cover"
      />
      <Text style={styles.CardTitle}>{name}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          R <Text style={styles.CardPrice}>{price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler({
              id,
              index,
              type,
              roasted,
              imagelink_square,
              name,
              special_ingredient,
              prices: [{...price, quantity: 1}],
            });
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 25,
              height: 25,
              borderWidth: 1,
              borderColor: COLORS.primaryBlackRGBA,
              borderRadius: 16,
            }}>
            <Cart height={16} color={COLORS.primaryBlackRGBA} />
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
    width: '100%',
    height: CARD_WIDTH * 0.5,
    borderRadius: BORDERRADIUS.radius_4,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default meatCard;
