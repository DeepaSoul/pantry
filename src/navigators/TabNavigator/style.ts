import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/theme/theme';

const TabStyles = StyleSheet.create({
  tabBarStyle: {
    height: 68,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  TabIconFocusedStyle: {
    color: COLORS.primaryWhiteHex,
    fontSize: 50,
    position: 'absolute',
    textAlign: 'center',
    top: -15,
  },
  TabIconContainer: {justifyContent: 'center', alignItems: 'center'},
});

export {TabStyles};
