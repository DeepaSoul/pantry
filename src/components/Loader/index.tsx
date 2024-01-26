import {ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/theme/theme';

type LoaderProps = {
  color?: string;
};

const Loader = ({color}: LoaderProps) => {
  return (
    <ActivityIndicator
      size="large"
      color={color ?? COLORS.primaryBlackRGBA}
      style={{alignSelf: 'center'}}
    />
  );
};

export default Loader;
