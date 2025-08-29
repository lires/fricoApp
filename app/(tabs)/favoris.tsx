// app/(tabs)/favoris.tsx
import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { COLORS } from "../src/config";

export default function FavorisScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: COLORS.text }}>
          Mes Favoris
        </Text>
        <Text style={{ marginTop: 8, color: COLORS.textMuted }}>
          Aucune recette favorite pour l’instant.
        </Text>
      </View>
    </SafeAreaView>
  );
}
