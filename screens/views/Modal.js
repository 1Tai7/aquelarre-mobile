import React from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
const ModalT = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
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
            <Text style={{ marginBottom: 20 }}>¡Este es un Modal!</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: "black", textAlign: "center" }}>
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ModalT;
