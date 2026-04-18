import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import QRCodeScanner from './components/QRCodeScanner';
import QRCodeGenerator from './components/QRCodeGenerator';
import QRScanResults from './components/ScanResult';
import History from './components/History';
import "expo-dev-client";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

//Drawer Navigator for QR code screens
function QRCodeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Scan Code"
      screenOptions={{
        drawerStyle: { backgroundColor: "white", width: 240 },
        drawerLabelStyle: { fontStyle: 16 },
        drawerActiveBackgroundColor: "black",
        drawerActiveTintColor: "white",
        headerShown: true,
      }}
    >
      <Drawer.Screen name="Scan Code" component={QRCodeScanner} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="Create QR Code" component={QRCodeGenerator} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="QRCodeScreens"
          component={QRCodeDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Results" component={QRScanResults} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
