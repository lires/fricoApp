import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await AsyncStorage.getItem("sessionUser");
        if (!session) {
          router.replace("/auth/register");
        } else {
          const sessionUser = JSON.parse(session);
          setUsername(sessionUser.user.username);
        }
      } catch (error) {
        console.error("Erreur lors de la lecture du local storage", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {username ? (
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Bienvenue, {username} 👋
        </Text>
      ) : (
        <Text>Chargement...</Text>
      )}

      <Button
        title="Aller à Register"
        onPress={() => router.push("/auth/register")}
      />
    </View>
  );
}
