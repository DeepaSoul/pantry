import {SafeAreaView} from 'react-native';
import React from 'react';
import {ContainerStyles} from './style';

const Container = ({children}: React.PropsWithChildren) => {
  return (
    <SafeAreaView style={ContainerStyles.ScreenContainer}>
      {children}
    </SafeAreaView>
  );
};

export default Container;
