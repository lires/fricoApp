import { Stack } from "expo-router";

export default function ScanStack() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="scan" options={{ title: "Scan" }} />
      {/* autres écrans scan ici */}
    </Stack>
  );
}
