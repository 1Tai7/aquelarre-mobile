import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PostS() {
  const route = useRoute();
  const { title, text, autor, tags } = route.params; // Obtén los parámetros

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.autor}>@{autor}</Text>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8", // Un fondo gris claro para mayor contraste
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Un color más oscuro para el título
    marginBottom: 10,
  },
  autor: {
    fontSize: 16,
    color: "#666", // Un color grisáceo para el autor
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    color: "#444", // Un color de texto legible
    lineHeight: 24, // Espacio entre líneas para mejor lectura
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Permite que los tags se ajusten a varias líneas
  },
  tag: {
    fontSize: 16,
    color: "#007bff", // Color azul para los tags
    marginRight: 10,
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#e0f2f7", // Un fondo azul claro para los tags
  },
});
