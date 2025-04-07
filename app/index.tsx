import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        if (!sessionToken) {
          router.replace("/auth/register");
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
      <Text>Bienvenue sur l'acccccueiccccl</Text>
      <Button title="Aller à Register" onPress={() => router.push("/auth/register")} />
    </View>
  );
}
