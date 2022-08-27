import { useFonts } from 'expo-font';
import { useCallback, useEffect } from 'react';
import Login from './src/pages/Login';
import * as SplashScreen from 'expo-splash-screen';
import { Provider, View } from '@ant-design/react-native';
import ptBR from '@ant-design/react-native/lib/locale-provider/pt_BR'

export default function App() {
  const [fontsLoaded] = useFonts({
    'antoutline':
      require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
    'antfill':
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const PTBR = {
    value: 'Português - BR',
    label: 'Português - BR',
    language: ptBR,
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider locale={PTBR.language}>
        <Login />
      </Provider>

    </View>
  );
}
