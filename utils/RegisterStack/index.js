import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterT from "../../screens/views/Register";
import LoginScreen from "../../screens/views/Login";
import HomeT from "../../screens/views/Home";

const StackRegister = ({ handleUserUpdate }) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={() => <RegisterT handleUserUpdate={handleUserUpdate} />}
        options={{ tabBarLabel: "Registro" }}
      />
      <Stack.Screen
        name="Login"
        component={() => <LoginScreen handleUserUpdate={handleUserUpdate} />}
      />
      <Stack.Screen name="Home" component={HomeT} />
    </Stack.Navigator>
  );
};

export default StackRegister;
