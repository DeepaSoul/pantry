import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Container from '../../components/Container';
import {COLORS, FONTFAMILY, SPACING} from '../../utils/theme/theme';
import HeaderBar from '../../components/HeaderBar';
import Title from '../../components/Title';
import {TYPE_LoggedInUserInfo} from '../../utils/types';
import LoginInFooter from '../../components/LoginInFooter';
import Left from '../../assets/icons/left.svg';
import AuthContext from '../../authContext';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const LoginScreen = ({navigation}: any) => {
  const {setExploreApp} = useContext(AuthContext);

  const [userLoginFormData, setUserLoginFormData] =
    useState<TYPE_LoggedInUserInfo>({email: '', password: ''});

  const onSignIn = () => {};

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
        <View style={{marginLeft: -SCREEN_WIDTH * 0.01}}>
          <Left color={COLORS.primaryBlackRGBA} />
        </View>

        <TouchableOpacity
          style={{alignItems: 'flex-end'}}
          onPress={() => {
            setExploreApp?.(true);
          }}>
          <Text style={{fontFamily: FONTFAMILY.avenir}}>Explore app</Text>
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: FONTFAMILY.adobe_garamond,
            fontSize: SPACING.space_20 * 2,
            color: COLORS.primaryBlackRGBA,
          }}>
          Welcome to
        </Text>
        <Text
          style={{
            fontFamily: FONTFAMILY.adobe_garamond,
            fontSize: SPACING.space_20 * 2,
            color: COLORS.primaryBlackRGBA,
            marginBottom: SPACING.space_10,
          }}>
          Pantry by Marble
        </Text>

        <Text
          style={{
            fontFamily: FONTFAMILY.avenir,
            fontSize: SPACING.space_16,
            color: COLORS.primaryBlackRGBA,
          }}>
          Sign up for easy payment, collection
        </Text>
        <Text
          style={{
            fontFamily: FONTFAMILY.avenir,
            fontSize: SPACING.space_16,
            color: COLORS.primaryBlackRGBA,
          }}>
          and much more
        </Text>

        <Title title="" />

        <View style={{marginTop: SCREEN_HEIGHT * 0.08}} />

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

        <LoginInFooter onClickHandler={onSignIn} type="login" />
      </View>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
