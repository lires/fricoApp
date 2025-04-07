import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={({ route }) => ({
        headerBackVisible: !["auth/login", "auth/register"].includes(route.name),
      })}
    >
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/register" />
    </Stack>
  );
}
