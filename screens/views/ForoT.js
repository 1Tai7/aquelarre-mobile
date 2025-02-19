import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Boton from "../../components/boton";
import { useNavigation } from "@react-navigation/native";
import { getPosts } from "../../firebase/post";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForoT = ({ user }) => {
  const navigation = useNavigation();
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const data = await getPosts();
      setPost(data || []);
    };
    getAllData();
  }, []);
  return (
    <>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        {posts &&
          posts?.map((item) => {
            return (
              <View style={styles.postContainer}>
                <View style={styles.headerPost}>
                  <Text style={styles.title}>{item?.title}</Text>
                  <Text style={styles.username}>{`@${item?.autor}`}</Text>
                </View>
                <Text style={styles.paragraph}>{item.text}</Text>
                <View style={styles.hashtagButton}>
                  {item?.tags.map((tag) => (
                    <Text style={styles.hashtag}>{tag}</Text>
                  ))}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Post", {
                        title: item.title,
                        text: item.text,
                        autor: item.autor,
                        tags: item.tags,
                      })
                    }
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
            );
          })}
      </KeyboardAwareScrollView>
    </>
  );
};

export default ForoT;
const styles = StyleSheet.create({
  postContainer: {
    padding: 20,
    // Sombras para iOS
    shadowColor: "#000", // Color de la sombra
    shadowOffset: { width: 0, height: 0.5 }, // Desplazamiento de la sombra
    shadowOpacity: 0.5, // Opacidad de la sombra
    shadowRadius: 10, // Radio de la sombra

    // Sombra para Android (elevation)
    elevation: 3, // Valor de elevación (ajusta según necesites)

    // Borde (opcional)
    borderWidth: 0.2, // Ancho del borde
    borderColor: "#ddd", // Color del borde (gris claro en este ejemplo)
    borderRadius: 0.5,
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
