import { Stack } from "expo-router";
import { Button } from "react-native";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export default function RootLayout() {
  const router = useRouter();

  const goToProfile = useCallback(() => {
    router.push("/user/profil");
  }, [router]);

  return (
    <Stack
      screenOptions={({ route }) => ({
        headerBackVisible: !["auth/login", "auth/register"].includes(route.name),
      })}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Accueil",
          headerRight: () => (
            <Button title="Profil" onPress={goToProfile} />
          ),
        }}
      />
      <Stack.Screen name="auth/login" options={{ title: "Connexion" }} />
      <Stack.Screen name="auth/register" options={{ title: "Inscription" }} />
      <Stack.Screen name="tos-privacy/privacy" options={{ title: "Politique de confidentialité" }} />
      <Stack.Screen name="tos-privacy/terms" options={{ title: "Conditions de service" }} />
    </Stack>
  );
}
