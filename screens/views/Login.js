import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Boton from "../../components/boton";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { loginWithEmailAndPassword } from "../../firebase/auth";
import { setItem } from "../../utils/AsyncStorage";

const LoginScreen = ({ handleUserUpdate }) => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    contrasena: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validarFormulario = async () => {
    let newErrors = {};
    if (!formData.contrasena)
      newErrors.contrasena = "La contraseña es obligatoria.";
    if (!formData.email)
      newErrors.email = "El correo electrónico es obligatorio.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
      const { user } = await loginWithEmailAndPassword({
        email: formData.email,
        password: formData.contrasena,
      });
      setItem("USER", user);
      handleUserUpdate();
      navigation.replace("Home", { replace: true });
      handleUserUpdate();
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("./../../assets/logo-aquellare-app.png")}
        />
        {/* Formulario */}
        <View style={styles.form}>
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
            value={formData.contrasena}
            onChangeText={(value) => handleInputChange("contrasena", value)}
            secureTextEntry
          />
          <Text style={styles.errorText}>{errors.contrasena}</Text>

          <TouchableOpacity
            onPress={validarFormulario}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                paddingTop: 20,
              }}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.linkText}>Aun no tengo una cuenta</Text>
              <Boton
                handleClick={() => {
                  navigation.navigate("Register");
                }}
              ></Boton>
            </TouchableOpacity>
          </View>
          {success && <Text style={styles.successText}>¡Benvenido!</Text>}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
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

export default LoginScreen;
