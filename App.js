import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import MyStack from './src/navigation/StackNavigation';


enableScreens();

export default function App() {
  return (
    <>
      <MyStack/>
    </>
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
