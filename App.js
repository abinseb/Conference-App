import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import MyStack from './src/navigation/StackNavigation';
import { Provider } from 'react-redux';
import store from './src/redux';


enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <MyStack/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
