import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForoT from "../../screens/views/ForoT";
import PostS from "../../screens/views/PostS";

const PostStack = ({ user }) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Foro"
        component={() => <ForoT user={user} />}
        options={{ tabBarLabel: "Foro" }}
      />
      <Stack.Screen name="Post" component={() => <PostS user={user} />} />
    </Stack.Navigator>
  );
};

export default PostStack;
