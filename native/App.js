import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';

async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: '944363662100-vtptmm9aemekbkeijmv88i12n4n57dek.apps.googleusercontent.com',
      androidStandaloneAppClientId: '944363662100-18mclfjmarm7ssnqo04mh1qpk72mqoi0.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      return result.user.email;
    } else {
      return 'cancelled';
    }
  } catch(e) {
    console.log('Google Signin Error: ', e)
    return 'error: ' + e;
  }
}

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      googleResponse: 'waiting for signin',
    }
    this.googleSigninCallback = this.googleSigninCallback.bind(this)
  }

  googleSigninCallback (googleResponse) {
    console.log('googleResponse: ', googleResponse);
    this.setState({
      googleResponse: googleResponse,
    })
  }

  componentDidMount () {
    signInWithGoogleAsync()
      .then(this.googleSigninCallback)
      .catch(this.googleSigninCallback)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.googleResponse}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
