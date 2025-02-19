import { useEffect, useState } from "react";
import Navigation from "./navigation";
import { getItem } from "./utils/AsyncStorage";

export default function App() {
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false); // Nuevo estado para forzar la actualización

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getItem("USER");
        setUser(userData);
      } catch (error) {
        console.error("Error getting user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, [update]); // El useEffect se ejecuta cuando 'update' cambia

  // Llama a esta función cada vez que guardes el usuario en AsyncStorage
  const handleUserUpdate = () => {
    setUpdate(!update); // Invierte el valor de 'update' para forzar la actualización
  };

  console.log("Usuario en App:", user);

  return <Navigation user={user} handleUserUpdate={handleUserUpdate} />;
}
