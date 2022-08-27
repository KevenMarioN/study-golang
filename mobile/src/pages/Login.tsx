import { View, Button } from "@ant-design/react-native";
import { useCallback, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import LoginForm from "../components/organism/LoginForm";


export default function Login() {

  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 30, justifyContent: 'center'}}>
      <StatusBar />
      <LoginForm />
    </View>
  )
}