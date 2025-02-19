import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//screens
import HomeT from "./screens/views/Home";
import SelectIcon from "./utils/selectIcon";
import ModalT from "./screens/views/Modal";
import { TouchableOpacity } from "react-native";
import PostStack from "./utils/PostStack";
import StackRegister from "./utils/RegisterStack";
import Perfil from "./screens/views/Perfil";

const Tab = createBottomTabNavigator();

function TabNavitagor({ user, handleUserUpdate }) {
  const [modalVisible, setModalVisible] = useState(false);

  const MyTabs = () => (
    <>
      <ModalT
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        user={user}
        handleUserUpdate={handleUserUpdate}
      />
      <Tab.Navigator screenOptions={SelectIcon}>
        <Tab.Screen
          name="Home"
          component={HomeT}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="Foro"
          component={() => <PostStack user={user} />}
          options={{ headerShown: false }}
        />

        {user ? (
          <>
            <Tab.Screen
              name="Crear articulo"
              component={HomeT}
              options={{
                tabBarButton: (props) => (
                  <TouchableOpacity
                    {...props}
                    onPress={() => setModalVisible(true)}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="Perfil"
              component={() => (
                <Perfil user={user} handleUserUpdate={handleUserUpdate} />
              )}
              options={{ headerShown: true }}
            />
          </>
        ) : (
          <Tab.Screen
            name="Register"
            component={() => (
              <StackRegister handleUserUpdate={handleUserUpdate} />
            )}
            options={{ headerShown: false }}
          />
        )}
      </Tab.Navigator>
    </>
  );

  return user ? <MyTabs /> : <MyTabs />;
}

export default function Navigation({ user, handleUserUpdate }) {
  return (
    <NavigationContainer>
      <TabNavitagor user={user} handleUserUpdate={handleUserUpdate} />
    </NavigationContainer>
  );
}
