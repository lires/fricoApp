import React, { useState } from "react";
import {
  SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, Feather } from "@expo/vector-icons";
import styles, { COLORS } from "../styles/scan.styles";

type ScanResult = {
  veggies: string[];
  infos: string[];
  recipes: { id: number; title: string }[];
};

export default function ScanScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const pickCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return;

    const shot = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });

    if (!shot.canceled && shot.assets?.[0]?.uri) {
      const uri = shot.assets[0].uri;
      setPhotoUri(uri);
      setResult(null);
      simulateAnalysis(uri);
    }
  };

  const simulateAnalysis = async (uri: string) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1800));
      setResult({
        veggies: ["Carotte", "Poireau", "Tomate"],
        infos: ["x", "x", "x"],
        recipes: Array.from({ length: 6 }).map((_, i) => ({
          id: i + 1,
          title: "Recette\nDescription",
        })),
      });
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setPhotoUri(null);
    setResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>SCANNER LÉGUME</Text>
        <Text style={styles.sub}>Placer le légume dans le carré ci-dessous</Text>

        <View style={[styles.card, { paddingVertical: 20 }]}>
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>Analyse en cours…</Text>
            </View>
          )}

          <View style={styles.frame}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} resizeMode="cover" style={styles.preview} />
            ) : (
              <Text style={styles.frameText}>Zone de cadrage</Text>
            )}
          </View>

          <View style={styles.captureWrap}>
            <TouchableOpacity onPress={pickCamera} activeOpacity={0.9} disabled={loading}>
              <View style={styles.captureBtnRing}>
                <View style={styles.captureBtnInner}>
                  <Ionicons name="camera" size={26} color={COLORS.text} />
                </View>
              </View>
            </TouchableOpacity>
            <Text style={styles.captureLabel}>Capturer</Text>

            {photoUri && !loading && (
              <View style={styles.actionsRow}>
                <TouchableOpacity onPress={pickCamera}>
                  <Text style={styles.smallLink}>Reprendre</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={resetAll}>
                  <Text style={styles.smallLink}>Effacer</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {result && !loading && (
            <>
              <View style={styles.divider} />

              <View style={styles.twoCols}>
                <View style={styles.col}>
                  <Text style={styles.label}>Légumes Identifié :</Text>
                  {result.veggies.map((v) => (
                    <Text key={v} style={styles.bullet}>• {v}</Text>
                  ))}
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Informations Légumes :</Text>
                  {result.infos.map((x, i) => (
                    <Text key={i} style={styles.bullet}>• {x}</Text>
                  ))}
                </View>
              </View>

              <View style={styles.divider} />
              <Text style={styles.sectionTitle}>Recettes Trouvées :</Text>
              <View style={styles.grid}>
                {result.recipes.map((r) => (
                  <View key={r.id} style={styles.recipeCard}>
                    <Feather name="bookmark" size={18} color={COLORS.text} />
                    <Text numberOfLines={2} style={styles.recipeTitle}>{r.title}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
