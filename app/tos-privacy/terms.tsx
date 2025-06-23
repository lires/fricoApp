import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "./tos.privacy.styles";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Conditions de Service</Text>
      <Text>
        Ceci sont les Conditions de Services de Frico.{"\n\n"}
        (Ajoute ton texte ici.)
      </Text>
    </ScrollView>
  );
}
