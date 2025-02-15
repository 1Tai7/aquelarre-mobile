import Icon from "react-native-vector-icons/FontAwesome";

const SelectIcon = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    // Define el ícono según la pantalla
    let iconName;

    if (route.name === "Home") {
      iconName = "home"; // Ícono para "Home"
    } else if (route.name === "Foro") {
      iconName = "comment"; // Ícono para "Settings"
    } else if (route.name === "Modal") {
      iconName = "plus-circle"; // Ícono para "Settings"
    } else if (route.name === "Register") {
      iconName = "user"; // Ícono para "Settings"
    }

    // Retorna el ícono correspondiente
    return <Icon name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: "green", // Color para el tab activo
  tabBarInactiveTintColor: "gray", // Color para el tab inactivo
});

export default SelectIcon;
