/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Loader from './src/components/Loader';
import {getLoggedInUser} from './src/store/database';
import {Dimensions, StyleSheet, View} from 'react-native';
import AuthContext, {AuthProvider} from './src/authContext';
import NavigationStacks from './src/navigators';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const App = () => {
  const {setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    SplashScreen.hide();
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    const loggedInUser = await getLoggedInUser();
    if (loggedInUser.success && loggedInUser.data) {
      setUser?.(loggedInUser.data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.LoaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationStacks />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  LoaderContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default App;
