import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Boton({ handleClick }) {
  return (
    <>
      <TouchableOpacity onPress={handleClick}>
        <Icon name="caret-right" size={30} color="#000" />
      </TouchableOpacity>
    </>
  );
}
