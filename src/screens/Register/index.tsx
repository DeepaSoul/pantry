import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import {COLORS, SPACING} from '../../utils/theme/theme';
import HeaderBar from '../../components/HeaderBar';
import Title from '../../components/Title';
import {TYPE_LoggedInUserInfo} from '../../utils/types';
import LoginInFooter from '../../components/LoginInFooter';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const RegisterScreen = ({navigation}: any) => {
  const [userLoginFormData, setUserLoginFormData] =
    useState<TYPE_LoggedInUserInfo>({email: '', password: ''});

  const renderInput = ({
    placeholder,
    label,
    name,
    type = 'none',
  }: {
    placeholder: string;
    label: string;
    name: keyof TYPE_LoggedInUserInfo;
    type?: 'name' | 'password' | 'none' | 'emailAddress' | 'telephoneNumber';
  }) => {
    return (
      <View style={{gap: SPACING.space_4}}>
        <Text>{label}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: SPACING.space_4,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.primaryBlackRGBA,
          }}>
          {type === 'telephoneNumber' && (
            <TextInput
              textContentType={type}
              placeholder={placeholder}
              value={userLoginFormData[name]}
              onChangeText={text => {
                setUserLoginFormData({...userLoginFormData, [name]: text});
              }}
              placeholderTextColor={COLORS.backgroundGrey}
              style={{
                color: COLORS.primaryBlackRGBA,
                //   marginHorizontal: SPACING.space_8,
                width: SCREEN_WIDTH * 0.8,
                paddingRight: SPACING.space_4,
                borderRightWidth: 1,
                borderRightColor: COLORS.primaryBlackRGBA,
              }}
            />
          )}
          <TextInput
            textContentType={type}
            placeholder={placeholder}
            value={userLoginFormData[name]}
            secureTextEntry={type === 'password'}
            onChangeText={text => {
              setUserLoginFormData({...userLoginFormData, [name]: text});
            }}
            placeholderTextColor={COLORS.backgroundGrey}
            style={{
              color: COLORS.primaryBlackRGBA,
              //   marginHorizontal: SPACING.space_8,
              width: SCREEN_WIDTH * 0.8,
            }}
          />
          <TouchableOpacity style={{}}>
            {type === 'password' ? <Text>P</Text> : <Text>X</Text>}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Container>
      <View style={{padding: SPACING.space_15}}>
        <Text>Welcome to Pantry by Marble</Text>
        <Title title="Sign up for easy payment, collection and much more" />
        {renderInput({
          placeholder: 'john.doe@email.com',
          name: 'email',
          label: 'Email',
          type: 'emailAddress',
        })}
        {renderInput({
          placeholder: '********************',
          name: 'password',
          label: 'Password',
          type: 'password',
        })}
       <LoginInFooter type="register" />
      </View>
    </Container>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
