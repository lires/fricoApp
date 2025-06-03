import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <TouchableOpacity
        style={{
          marginBottom: 20,
          backgroundColor: "#eee",
          padding: 10,
          borderRadius: 8,
          alignSelf: "flex-start",
        }}
        onPress={() => router.replace("/auth/register")}
      >
        <Text style={{ fontWeight: "bold" }}>← Retour à l’inscription</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
        Conditions de Service
      </Text>
      <Text>
        Ceci sont les Conditions de Services de Frico.{"\n\n"}
        (Ajoute ton texte ici.)
      </Text>
    </ScrollView>
  );
}