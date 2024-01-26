import {View, Text} from 'react-native';
import React from 'react';
import {TitleStyles} from './style';

type TitleProps = {
  title: string;
  titleStyle?: object;
};

const Title = ({title, titleStyle}: TitleProps) => {
  return (
    <View>
      <Text style={titleStyle}>{title}</Text>
      <View style={TitleStyles.GreenBar} />
    </View>
  );
};

export default Title;
