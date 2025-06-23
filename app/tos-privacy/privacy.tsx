import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "./tos.privacy.styles";

export default function PrivacyPolicyScreen() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>
        Politique de confidentialité
      </Text>
      <Text>
        Ceci est la politique de confidentialité de Frico.{"\n\n"}
        (Ajoute ton texte ici.)
      </Text>
    </ScrollView>
  );
}