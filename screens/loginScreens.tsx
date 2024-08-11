import React, {useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'AIzaSyDJLQjzJqAmnlyQo_dk3CwLKVOSj6MG3Aw',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      console.log('User signed in!');
    } catch (error) {
      if (error === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login process');
      } else if (error === statusCodes.IN_PROGRESS) {
        console.log('Signin in progress');
      } else if (error === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Google" onPress={onGoogleButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
