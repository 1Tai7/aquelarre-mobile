import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";

const HomeT = () => {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require("./../../assets/fondo-aquellare-app.png")} // Imagen local en la carpeta 'assets'
          style={styles.background}
          imageStyle={styles.image}
        ></ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a49bf",
    justifyContent: "flex-end",
  },

  background: {
    flex: 0.3, // Ocupa todo el espacio disponible
  },
});

export default HomeT;
