import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import Container from '../../components/Container';
import HeaderBar from '../../components/HeaderBar';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  SPACING,
} from '../../utils/theme/theme';
import AuthContext from '../../authContext';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const ProfileScreen = () => {
  const {exploreApp, setExploreApp, signOutUser} = useContext(AuthContext);

  return (
    <Container>
      <HeaderBar title="" />

      <View style={styles.ScreenContainer}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            exploreApp ? setExploreApp?.(false) : signOutUser?.();
          }}>
          <Text style={styles.ButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    padding: SPACING.space_15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.95,
    height: SPACING.space_28 * 2,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderRadius: BORDERRADIUS.radius_20 * 4,
    marginVertical: SPACING.space_30,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.avenir,
    color: COLORS.primaryWhiteHex,
  },
});
