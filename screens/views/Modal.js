import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createPost } from "../../firebase/post";

const ModalT = ({ modalVisible, setModalVisible, user, handleUserUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    text: "",
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
    if (!formData.title) newErrors.title = "El titulo es obligatorio.";
    if (!formData.tag) {
      newErrors.tag = "Agregue Tags";
    } else if (!formData.tag?.includes(",")) {
      newErrors.tag = "separalos por , #tag, #example";
    } else if (!formData?.tag?.includes("#")) newErrors.tag = "usa #";
    else if (!formData?.text) newErrors.text = "Escribe algo";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(false);
    } else {
      const data = await createPost({
        userId: user.uid,
        autor: user.displayName,
        title: formData.title,
        tags: formData.tag,
        text: formData.text,
      });
      console.log("DATAAAA", data);
      setErrors({});
      setSuccess(true);
    }
  };

  return (
    <Modal
      presentationStyle="formSheet"
      animationType="slide"
      statusBarTranslucent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setModalVisible(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View
              style={{
                width: 300,
                padding: 20,
                backgroundColor: "white",
                borderRadius: 10,
              }}
              pointerEvents="box-none"
            >
              <Text style={styles.label}>Registre un articulo</Text>
              <View style={styles.form}>
                <Text style={styles.label}>
                  Titulo: <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={formData.title}
                  onChangeText={(value) => handleInputChange("title", value)}
                />
                <Text style={styles.errorText}>{errors.title}</Text>

                <Text style={styles.label}>
                  Tags: <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={formData.tag}
                  onChangeText={(value) => handleInputChange("tag", value)}
                />
                <Text style={styles.errorText}>{errors.tag}</Text>

                <Text style={styles.label}>
                  Descripcion: <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.inputArea}
                  value={formData.text}
                  onChangeText={(value) => handleInputChange("text", value)}
                />
                <Text style={styles.errorText}>{errors.text}</Text>

                <TouchableOpacity
                  onPress={validarFormulario}
                  style={styles.submitButton}
                >
                  <Text style={styles.submitButtonText}>Enviar</Text>
                </TouchableOpacity>

                {success && (
                  <Text style={styles.successText}>¡Registro Exitoso!</Text>
                )}
              </View>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text
                  style={{ color: "black", textAlign: "center", padding: 20 }}
                >
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  inputArea: {
    height: 200,
    textAlignVertical: "top",
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

export default ModalT;
