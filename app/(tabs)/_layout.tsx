import { Tabs } from "expo-router";
import { View, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, UI } from "../src/config";

function TabIcon({
  name,
  focused,
  size,
  color,
}: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  focused: boolean;
  size: number;
  color: string;
}) {
  return (
    <View
      style={{
        width: UI.tabItemSize,
        height: UI.tabItemSize,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: focused ? COLORS.orange : "transparent",
      }}
    >
      <FontAwesome name={name} size={size} color={focused ? COLORS.white : color} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarItemStyle: { justifyContent: "center", alignItems: "center", alignSelf:"center" },
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 16,
          height: UI.tabBarHeight,
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: UI.radius,
          backgroundColor: COLORS.white,
          borderWidth: 1,
          borderColor: COLORS.border,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
            },
            android: { elevation: 8 },
          }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon name="home" focused={focused} size={UI.tabIconSize} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon name="camera" focused={focused} size={UI.tabIconSize} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon name="user" focused={focused} size={UI.tabIconSize} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
