import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Boton from "../../components/boton";
import { useNavigation } from "@react-navigation/native";

// const MyIcon = () => <Icon name="caret-right" size={30} color="#000" />;

const ForoT = () => {
  const navigation = useNavigation();
  console.log(navigation.navigate);
  return (
    <>
      <View style={styles.postContainer}>
        <View style={styles.headerPost}>
          <Text style={styles.title}>Titulo</Text>
          <Text style={styles.username}>@usuario</Text>
        </View>
        <Text style={styles.paragraph}>parrafo</Text>
        <View style={styles.hashtagButton}>
          <Text style={styles.hashtag}>#hola</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Post")}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>Entrar al post</Text>
            <Boton
              handleClick={() => {
                navigation.navigate("Post");
              }}
            ></Boton>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ForoT;
const styles = StyleSheet.create({
  postContainer: {
    padding: 15,
  },
  headerPost: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    fontSize: 16,
    color: "gray",
  },
  paragraph: {
    fontSize: 14,
    marginVertical: 10,
  },
  hashtagButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  hashtag: {
    fontSize: 16,
    color: "#007bff", // Color para el hashtag
    marginRight: 10,
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
  icon: {
    marginLeft: 5,
  },
});
