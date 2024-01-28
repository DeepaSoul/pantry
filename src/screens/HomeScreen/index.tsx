import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
} from "react-native";
import { useStore } from "../../store/store";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../../utils/theme/theme";
import HeaderBar from "../../components/HeaderBar";
import { Dimensions } from "react-native";
import Container from "../../components/Container";
import Filter from "../../assets/icons/filter.svg";
import Title from "../../components/Title";
import { TYPE_MeatData, TYPE_MeatType } from "../../utils/types";
import MeatCard from "../../components/MeatCard";

const getCategoriesFromData = (data: any): TYPE_MeatType[] => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].type] == undefined) {
      temp[data[i].type] = 1;
    } else {
      temp[data[i].type]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories as TYPE_MeatType[];
};

const getmeatList = (
  selectedCategories: TYPE_MeatType[],
  data: TYPE_MeatData[]
) => {
  if (selectedCategories.length < 1 || selectedCategories.includes("All")) {
    return data;
  } else {
    let meatlist = data.filter((item) =>
      selectedCategories.includes(item.type)
    );
    return meatlist;
  }
};

const HomeScreen = ({ navigation }: any) => {
  const meatList = useStore((state: any) => state.meatList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const categories = getCategoriesFromData(meatList);
  const [selectedCategories, setSelectedCategories] = useState<TYPE_MeatType[]>(
    ["All"]
  );

  const [sortedMeat, setSortedMeat] = useState(
    getmeatList(selectedCategories, meatList)
  );

  useEffect(() => {
    setSortedMeat([...getmeatList(selectedCategories, meatList)]);
  }, [selectedCategories]);

  const CoffeCardAddToCart = (meatdata: TYPE_MeatData) => {
    addToCart(meatdata);
    calculateCartPrice();
    Platform.OS == "android" &&
      ToastAndroid.showWithGravity(
        `${meatdata.name} is Added to Cart`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
  };

  const updateCategories = (selectedCategory: TYPE_MeatType) => {
    if (selectedCategory == "All") {
      setSelectedCategories(["All"]);
    } else if (!selectedCategories.includes(selectedCategory)) {
      setSelectedCategories((values) =>
        [...values, selectedCategory].filter((value) => value != "All")
      );
    } else {
      setSelectedCategories((values) =>
        values.filter((value) => value != selectedCategory)
      );
    }
  };

  const returnItemCard = (item: TYPE_MeatData, index: number) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          navigation.push("Details", {
            index: index,
            id: item.id,
            type: item.type,
          });
        }}
      >
        <MeatCard item={item} buttonPressHandler={CoffeCardAddToCart} />
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        {/* App Header */}
        <HeaderBar
          title="Meat"
          rightSection={[
            <Text key={0} style={{ fontFamily: FONTFAMILY.avenir, color: COLORS.primaryBlackRGBA, fontSize: FONTSIZE.size_16, marginRight: SPACING.space_4 }}>Filter</Text>,
            <Filter
              height={SPACING.space_18}
              key={1}
              color={COLORS.primaryBlackRGBA}
            />,
          ]}
        />
        <Title title="" />

        {/* Category Scroller */}

        {meatList && (
          <View style={styles.CategoryScrollViewStyle}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  updateCategories(category);
                }}
              >
                <Text
                  style={[
                    styles.CategoryText,
                    selectedCategories.includes(category)
                      ? {
                          color: COLORS.primaryBlackRGBA,
                          fontFamily: FONTFAMILY.avenir_heavy,
                        }
                      : {},
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text
          style={{
            fontFamily: FONTFAMILY.avenir,
            color: COLORS.primaryBlackRGBA,
          }}
        >
          Based on your selection
        </Text>
        <Text
          style={{
            fontFamily: FONTFAMILY.adobe_garamond_bold,
            color: COLORS.primaryBlackRGBA,
            fontSize: FONTSIZE.size_30,
            marginTop: SPACING.space_10,
            marginBottom: SPACING.space_20
          }}
        >
          Our products
        </Text>

        {/* meat Flatlist */}

        {meatList && sortedMeat?.length > 0 ? (
          <View
            style={{
              gap: 10,
              marginHorizontal: "auto",
              width: "auto",
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: SPACING.space_30 * 3,
            }}
          >
            {sortedMeat.map(returnItemCard)}
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
    flexDirection: "row",
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
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
    flexDirection: "row",
    marginVertical: SPACING.space_20,
  },
  CategoryScrollViewItem: {
    alignItems: "center",
    marginRight: SPACING.space_36,
  },
  CategoryText: {
    fontFamily: FONTFAMILY.avenir,
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
    width: Dimensions.get("window").width - SPACING.space_30 * 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.space_36 * 3.6,
  },
});

export default HomeScreen;
