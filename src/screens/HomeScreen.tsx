import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
} from 'react-native';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../utils/theme/theme';
import HeaderBar from '../components/HeaderBar';
import {FlatList} from 'react-native';
import meatCard from '../components/meatCard';
import {Dimensions} from 'react-native';
import Container from '../components/Container';
import Filter from '../assets/icons/filter.svg';
import Title from '../components/Title';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getmeatList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let meatlist = data.filter((item: any) => item.name == category);
    return meatlist;
  }
};

const HomeScreen = ({navigation}: any) => {
  const meatList = useStore((state: any) => state.meatList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const categories = getCategoriesFromData(meatList);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedmeat, setSortedmeat] = useState(
    getmeatList(categoryIndex.category, meatList),
  );

  const ListRef: any = useRef<FlatList>();

  const CoffeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    Platform.OS == 'android' &&
      ToastAndroid.showWithGravity(
        `${name} is Added to Cart`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
  };

  const returnItemCard = (item: any) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          navigation.push('Details', {
            index: item.index,
            id: item.id,
            type: item.type,
          });
        }}>
        <meatCard
          id={item.id}
          index={item.index}
          type={item.type}
          roasted={item.roasted}
          imagelink_square={item.imagelink_square}
          name={item.name}
          special_ingredient={item.special_ingredient}
          average_rating={item.average_rating}
          price={item.prices[2]}
          buttonPressHandler={CoffeCardAddToCart}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar
          title="Meat"
          rightSection={[
            <Text key={0}>Filter</Text>,
            <Filter
              height={SPACING.space_16}
              key={1}
              color={COLORS.primaryBlackRGBA}
            />,
          ]}
        />
        <Title title="" />

        <Text>Based on your selection</Text>
        <Text>Our products</Text>

        {/* Category Scroller */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => (
            <View key={index.toString()}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({index: index, category: categories[index]});
                  setSortedmeat([
                    ...getmeatList(categories[index], meatList),
                  ]);
                }}>
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index == index
                      ? {color: COLORS.primaryBlackRGBA}
                      : {},
                  ]}>
                  {data}
                </Text>
                {categoryIndex.index == index ? (
                  <View style={styles.ActiveCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* meat Flatlist */}

        {sortedmeat?.length > 0 ? (
          <View
            style={{
              gap: 10,
              marginHorizontal: 'auto',
              width: 'auto',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: SPACING.space_30 * 3,
            }}>
            {sortedmeat.map((item: any) => returnItemCard(item))}
          </View>
        ) : (
          <View style={styles.EmptyListContainer}>
            <Text style={styles.CategoryText}>No meat Available</Text>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  ScrollViewFlex: {
    flexGrow: 1,
    padding: SPACING.space_15,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.avenir,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    marginBottom: SPACING.space_20,
  },

  CategoryScrollViewItem: {
    alignItems: 'center',
    marginRight: SPACING.space_8,
  },
  CategoryText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryBlackRGBA,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_15,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
});

export default HomeScreen;
