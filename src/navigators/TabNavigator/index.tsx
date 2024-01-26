import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BlurView} from '@react-native-community/blur';
import HomeScreen from '../../screens/HomeScreen';
import FavoritesScreen from '../../screens/FavoritesScreen';
import CartScreen from '../../screens/CartScreen';
import {TabStyles} from './style';
import {Text, View} from 'react-native';
import Home from '../../assets/icons/home.svg';
import Cart from '../../assets/icons/cart.svg';
import Heart from '../../assets/icons/heart.svg';
import Search from '../../assets/icons/search.svg';
import User from '../../assets/icons/user.svg';
import {COLORS, SPACING} from '../../utils/theme/theme';
import ProfileScreen from '../../screens/Profile';
import SearchScreen from '../../screens/SearchScreen';

const Tab = createBottomTabNavigator();

const blViewCom = () => (
  <BlurView overlayColor="" blurAmount={15} style={TabStyles.BlurViewStyles} />
);

const tabScreenReturn = ({
  tabName,
  icon,
  component,
}: {
  tabName: string;
  icon: any; // using any because React.FC<SvgProps> type not yet defined
  component: any; //Using any as type for ScreenComponentType<ParamListBase, string> not defined
}) => (
  <Tab.Screen
    name={tabName}
    component={component}
    options={{
      tabBarIcon: ({
        focused,
      }: {
        focused: boolean;
        color: string;
        size: number;
      }) => (
        <View style={TabStyles.TabIconContainer}>
          {icon}
          {focused && <Text style={TabStyles.TabIconFocusedStyle}>.</Text>}
        </View>
      ),
    }}
  />
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: TabStyles.tabBarStyle,
        tabBarBackground: blViewCom,
      }}>
      {tabScreenReturn({
        tabName: 'Home',
        component: HomeScreen,
        icon: <Home height={SPACING.space_24} color={COLORS.primaryWhiteHex} />,
      })}
      {tabScreenReturn({
        tabName: 'Favorite',
        component: FavoritesScreen,
        icon: (
          <Heart height={SPACING.space_24} color={COLORS.primaryWhiteHex} />
        ),
      })}
      {tabScreenReturn({
        tabName: 'Search',
        component: SearchScreen,
        icon: (
          <Search height={SPACING.space_24} color={COLORS.primaryWhiteHex} />
        ),
      })}
      {tabScreenReturn({
        tabName: 'Cart',
        component: CartScreen,
        icon: <Cart height={SPACING.space_24} color={COLORS.primaryWhiteHex} />,
      })}
      {tabScreenReturn({
        tabName: 'Profile',
        component: ProfileScreen,
        icon: <User height={SPACING.space_24} color={COLORS.primaryWhiteHex} />,
      })}
    </Tab.Navigator>
  );
};

export default TabNavigator;
