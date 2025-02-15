import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Íconos de Expo

const RegisterT = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    alias: "",
    contrasena: "",
    email: "",
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

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validarFormulario = () => {
    let newErrors = {};

    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.alias) newErrors.alias = "El alias es obligatorio.";
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
    }
  };

  return (
    <View style={styles.container}>
      {/* Contenedor de Avatares */}
      <View style={styles.avatarContainer}>
        <Text style={styles.selectedEmoji}>
          {selectedEmoji || "Selecciona un emoji"}
        </Text>
        <TouchableOpacity onPress={toggleEmojiContainer} style={styles.button}>
          <MaterialCommunityIcons
            name="emoticon-happy-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

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
          Contraseña: <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={formData.contrasena}
          onChangeText={(value) => handleInputChange("contrasena", value)}
          secureTextEntry
        />
        <Text style={styles.errorText}>{errors.contrasena}</Text>

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

        <TouchableOpacity
          onPress={validarFormulario}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Enviar</Text>
        </TouchableOpacity>

        {success && <Text style={styles.successText}>¡Registro Exitoso!</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
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
});

export default RegisterT;
