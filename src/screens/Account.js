import { View, Text } from 'react-native'
import React from 'react'

import { LoginForm, UserData } from '../components/Auth';

export default function Account() {
  const auth = null;
  return (
    <View>
      {auth ? <UserData /> : <LoginForm />}
    </View>
  )
}