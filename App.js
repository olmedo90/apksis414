import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

export default function App() {
  const API_URL_POST = "http://192.168.0.26:5000/api/users/createUsers";
  const API_URL_GET = "http://192.168.0.26:5000/api/users/listUsers";

  const [username, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [informacion, setInformacion] = useState([]);

  const saludar = async () => {
    try {
      const response = await fetch(API_URL_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      setMensaje(data.username);
    } catch (error) {
      console.error("Error al saludar:", error);
    }
  };

  const obtenerInformacion = async () => {
      await fetch(API_URL_GET)
        .then((response) => response.json())
        .then((json) => {
          console.log("🚀 ~ .then ~ json:", json)
          setInformacion(json);
        })

  };

  // useEffect(() => {
  // }, []);


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese sus Nombre"
        onChangeText={(texto) => setNombre(texto)}
        value={username}
      />
      <Button title="Saludar" onPress={saludar} />
      <Text style={styles.saludo}>{`Hola  ${mensaje} bienvenido a mi 1er app mobil`}</Text>
      <Button
        title="Lista de las personas saludadas"
        onPress={obtenerInformacion}
      />
        {
          informacion? informacion.map((inf, index)=>(
            <View>
              <Text>{inf.username}</Text>
            </View>
          )):<></>
        }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  saludo: {
    marginTop: 20,
    fontSize: 18,
  },
  informacion: {
    marginTop: 20,
    fontSize: 18,
  },
});
