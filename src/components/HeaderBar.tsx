import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../utils/theme/theme';
import Left from '../assets/icons/left.svg';
import {useNavigation} from '@react-navigation/native';

interface HeaderBarProps {
  title: string;
  showBackSection?: boolean;
  showBackText?: boolean;
  rightSection?: React.JSX.Element[];
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  showBackSection = true,
  showBackText = true,
  rightSection,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.HeaderContainerTop}>
        {showBackSection ? (
          <TouchableOpacity
            style={styles.HeaderSectionStyle}
            onPress={() => navigation.goBack()}>
            <Left height={SPACING.space_28} color={COLORS.primaryBlackRGBA} />
            {showBackText && <Text>Back</Text>}
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <TouchableOpacity>
          {rightSection && (
            <View style={styles.HeaderSectionStyle}>{rightSection}</View>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.ScreenTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderSectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.avenir,
    color: COLORS.primaryBlackRGBA,
  },
});

export default HeaderBar;
