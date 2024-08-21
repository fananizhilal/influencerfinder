import * as React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import {
  Beranda,
  Pencarian,
  Wishlist,
  ProfilInfluencer,
  About,
} from "./screens";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#E8D0E8",
        tabBarStyle: { height: "8%", backgroundColor: "#bf7cbf", shadow: "9" },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10,
        },
        headerShown: false,
        unmountOnBlur: true,
      })}
    >
      <Tab.Screen
        name="Beranda"
        component={Beranda}
        options={{
          tabBarLabel: "Beranda",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="ios-home" size={18} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Pencarian"
        component={Pencarian}
        options={{
          tabBarLabel: "Pencarian",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="search" size={18} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarLabel: "Wishlist",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="md-bookmarks" size={18} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons
                name="md-information-circle-sharp"
                size={20}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Berandas"
            component={BottomNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profil Influencer"
            component={ProfilInfluencer}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
