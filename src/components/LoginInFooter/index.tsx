import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  SPACING,
} from '../../utils/theme/theme';
import {useNavigation} from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const LoginInFooter = ({
  type,
  onClickHandler,
}: {
  type: 'login' | 'register';
  onClickHandler: () => void;
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.FooterContainer}>
      <TouchableOpacity style={styles.FooterButton} onPress={onClickHandler}>
        <Text style={styles.FooterButtonText}>
          {type === 'login' ? 'Sign In' : 'Sign up'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          type === 'login'
            ? navigation.navigate('Login')
            : navigation.navigate('Register');
        }}>
        <Text style={styles.ScreenChangeText}>
          {`${type === 'login' ? 'Do not have' : 'Have'}`} an account?{' '}
          <Text style={styles.ScreenChangeInnerText}>
            {type === 'login' ? 'Register' : 'Login'}
          </Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.Options}>
        <View style={styles.GreenLine} />
        <Text style={styles.OptionsText}>or</Text>
        <View style={styles.GreenLine} />
      </View>
      <TouchableOpacity style={styles.FooterButton}>
        <Text style={styles.FooterButtonText}>Explore our app</Text>
      </TouchableOpacity>
      {type === 'register' && (
        <View>
          <Text>
            By sigining up you agree to our, <Text>Terms</Text>,{' '}
            <Text>Data Policy</Text> and
          </Text>
          <TouchableOpacity>
            <Text>Cookies Policy</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LoginInFooter;

const styles = StyleSheet.create({
  FooterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  FooterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.95,
    height: SPACING.space_28 * 2,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderRadius: BORDERRADIUS.radius_20 * 4,
    marginVertical: SPACING.space_30,
  },
  FooterButtonText: {
    fontFamily: FONTFAMILY.avenir,
    color: COLORS.primaryWhiteHex,
  },
  ScreenChangeText: {
    fontFamily: FONTFAMILY.avenir,
    fontSize: SPACING.space_15,
    color: COLORS.primaryBlackRGBA,
    marginBottom: SPACING.space_8,
  },
  ScreenChangeInnerText: {
    fontFamily: FONTFAMILY.avenir_heavy,
  },
  Options: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SCREEN_WIDTH * 0.05,
    width: SCREEN_WIDTH * 0.95,
  },
  GreenLine: {
    height: 1,
    width: SCREEN_WIDTH * 0.375,
    backgroundColor: COLORS.primaryBlackRGBA,
  },
  OptionsText: {
    fontFamily: FONTFAMILY.avenir,
    marginHorizontal: SPACING.space_20,
  },
});
