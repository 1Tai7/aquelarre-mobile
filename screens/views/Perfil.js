import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Íconos de Expo
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  authWithEmailAndPassword,
  updateWithEmailAndPassword,
} from "../../firebase/auth";
import { setItem, clear } from "../../utils/AsyncStorage";

const Perfil = ({ user, handleUserUpdate }) => {
  const navigation = useNavigation();
  const [selectedEmoji, setSelectedEmoji] = useState(user?.photoURL);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    nombre: user?.name,
    alias: user?.displayName,
    password: user?.password,
    email: user?.email,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const emojis = ["😸", "😋", "👩", "🙆‍♀️", "💃", "👧"];

  const toggleEmojiContainer = () => {
    setIsVisible(!isVisible);
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    setIsVisible(false);
  };

  const cerrarSesion = () => {
    clear();
    handleUserUpdate();
    navigation.navigate("Home", { replace: true });
    handleUserUpdate();
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validarFormulario = async () => {
    let newErrors = {};
    if (!selectedEmoji) newErrors.icon = "Seleccione un emoji para iniciar";
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.alias) newErrors.alias = "El alias es obligatorio.";
    if (!formData.password)
      newErrors.password = "La contraseña es obligatoria.";
    if (!formData.email)
      newErrors.email = "El correo electrónico es obligatorio.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
      const { user } = await updateWithEmailAndPassword({
        email: formData.email,
        password: formData.password,
        displayName: formData.alias,
        photoUrl: selectedEmoji,
        name: formData.nombre,
      });
      setItem("USER", user);
      handleUserUpdate();
      navigation.navigate("Home", { replace: true });
      handleUserUpdate();
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        {/* Contenedor de Avatares */}

        <View style={styles.avatarContainer}>
          <View style={styles.containerAvatar}>
            <Text style={styles.text}>{selectedEmoji}</Text>
          </View>
          <TouchableOpacity
            onPress={toggleEmojiContainer}
            style={styles.button}
          >
            <MaterialCommunityIcons
              name="emoticon-happy-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>{errors.icon}</Text>
        {isVisible && (
          <View style={styles.emojis}>
            {emojis.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                onPress={() => handleEmojiClick(emoji)}
                style={[
                  styles.emoji,
                  selectedEmoji === emoji && styles.selectedEmojiBorder,
                ]}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Formulario */}
        <View style={styles.form}>
          <Text style={styles.label}>
            Nombre completo: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={formData.nombre}
            onChangeText={(value) => handleInputChange("nombre", value)}
          />
          <Text style={styles.errorText}>{errors.nombre}</Text>

          <Text style={styles.label}>
            Alias: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={formData.alias}
            onChangeText={(value) => handleInputChange("alias", value)}
          />
          <Text style={styles.errorText}>{errors.alias}</Text>

          <Text style={styles.label}>
            Correo electrónico: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
          />
          <Text style={styles.errorText}>{errors.email}</Text>

          <Text style={styles.label}>
            Contraseña: <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
            secureTextEntry
          />
          <Text style={styles.errorText}>{errors.password}</Text>

          <TouchableOpacity
            onPress={validarFormulario}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Actualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={cerrarSesion} style={styles.closeButton}>
            <Text style={styles.submitButtonText}>Cerrar sesion</Text>
          </TouchableOpacity>

          {success && (
            <Text style={styles.successText}>¡Registro Exitoso!</Text>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40, // Equivalente a 3rem
    color: "white", // Ajusta el color del texto según tu diseño
  },
  containerAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(106, 73, 191, 0.89)",
    backgroundGradient: {
      colors: ["rgba(106, 73, 191, 0.89)", "rgba(71, 211, 191, 0.89)"],
    },
    elevation: 5, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  logo: {
    flex: 1,
    height: 120,
    width: 200,
    alignSelf: "center",
    margin: "auto",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  selectedEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  emojis: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  emoji: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  selectedEmojiBorder: {
    borderColor: "#007bff",
    borderWidth: 2,
  },
  emojiText: {
    fontSize: 24,
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  successText: {
    marginTop: 10,
    color: "green",
    fontSize: 16,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    fontSize: 16,
    color: "#007bff",
    marginRight: 10,
  },
});

export default Perfil;
