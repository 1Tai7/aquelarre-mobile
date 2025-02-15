import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import HomeT from "./screens/views/Home";
import ForoT from "./screens/views/ForoT";
import PostS from "./screens/views/PostS";
import RegisterT from "./screens/views/Register";
import SelectIcon from "./utils/selectIcon";
import ModalT from "./screens/views/Modal";
import { Text, TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

function PostStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Foro"
        component={ForoT}
        options={{ tabBarLabel: "Foro" }}
      />
      <Stack.Screen name="Post" component={PostS} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator({
  screens: {
    Post: PostS,
  },
});

function TabNavitagor() {
  const [modalVisible, setModalVisible] = useState(false);
  console.log(modalVisible);

  return (
    <>
      <ModalT modalVisible={modalVisible} setModalVisible={setModalVisible} />;
      <Tab.Navigator screenOptions={SelectIcon}>
        <Tab.Screen
          name="Home"
          component={HomeT}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="Foro"
          component={PostStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Modal"
          component={HomeT}
          options={{
            tabBarLabel: "Modal",
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => setModalVisible(true)}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "black" }}>Modal</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Register"
          component={RegisterT}
          options={{ tabBarLabel: "Registro" }}
        />
      </Tab.Navigator>
    </>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <TabNavitagor />
      {/* <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Modal"
          component={Modal}
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
