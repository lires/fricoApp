import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={({ route }) => ({

        headerBackVisible: !["auth/login", "auth/register"].includes(route.name),
      })}
    >
      {/*option ici*/}
      <Stack.Screen name="auth/login" options={{ title: "Connexion" }} />
      <Stack.Screen name="auth/register" options={{ title: "Inscription" }} />
      <Stack.Screen name="condition/privacy" options={{ title: "Politique de confidentialité" }} />
      <Stack.Screen name="condition/terms" options={{ title: "Conditions de service" }} />
    </Stack>
  );
}