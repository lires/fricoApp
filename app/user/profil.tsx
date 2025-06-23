import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Animated,
  Easing,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import styles from "./profil.styles"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

type SectionKey = "nom" | "email" | "motDePasse" | "logout";

export default function Profil() {
  const router = useRouter();

  const [nom, setNom] = useState("");
  const [originalNom, setOriginalNom] = useState("");
  const [email, setEmail] = useState("");
  const [pfp, setPfp] = useState("");
  const [originalPfp, setOriginalPfp] = useState(""); // ✅ Ajouté
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [repeteMotDePasse, setRepeteMotDePasse] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  const [isPfpModalVisible, setIsPfpModalVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false); // ✅ Ajouté

  const [openSection, setOpenSection] = useState<SectionKey | null>(null);

  const rotateAnim: Record<SectionKey, Animated.Value> = {
    nom: useRef(new Animated.Value(0)).current,
    email: useRef(new Animated.Value(0)).current,
    motDePasse: useRef(new Animated.Value(0)).current,
    logout: useRef(new Animated.Value(0)).current,
  };

  const imageMap: Record<string, any> = {
    user: require("../../assets/images/pfp/user.png"),
    1: require("../../assets/images/pfp/1.png"),
    2: require("../../assets/images/pfp/2.png"),
    3: require("../../assets/images/pfp/3.png"),
    4: require("../../assets/images/pfp/4.png"),
    6: require("../../assets/images/pfp/5.png"),
    7: require("../../assets/images/pfp/6.png"),
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await AsyncStorage.getItem("sessionUser");
        if (session) {
          const user = JSON.parse(session);
          setNom(user.user.username || "");
          setOriginalNom(user.user.username || "");
          setEmail(user.user.email || "");
          setPfp(user.user.pfp || "");
          setOriginalPfp(user.user.pfp || ""); // ✅ ici
          setSessionToken(user.token);
        }
      } catch (error) {
        console.error("Erreur de chargement du profil :", error);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const checkChanges = () => {
      const modified =
        nom !== originalNom ||
        pfp !== originalPfp ||
        (!!nouveauMotDePasse && nouveauMotDePasse === repeteMotDePasse);

      setHasChanges(modified);
    };

    checkChanges();
  }, [nom, originalNom, pfp, originalPfp, nouveauMotDePasse, repeteMotDePasse]);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("sessionUser");
      router.replace("/auth/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const toggleSection = (section: SectionKey) => {
    const isOpen = openSection === section;

    Object.entries(rotateAnim).forEach(([key, anim]) => {
      Animated.timing(anim, {
        toValue: key === section && !isOpen ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    });

    setOpenSection(isOpen ? null : section);
  };

  const renderHeader = (label: string, sectionKey: SectionKey) => {
    const rotate = rotateAnim[sectionKey].interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });

    return (
      <TouchableOpacity
        onPress={() => toggleSection(sectionKey)}
        style={styles.sectionHeaderContainer}
      >
        <Text style={styles.sectionHeader}>{label}</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <AntDesign name="down" size={20} color="#333" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const handlePfpChange = async (key: string) => {
    setPfp(key);
    setIsPfpModalVisible(false);

    try {
      const session = await AsyncStorage.getItem("sessionUser");
      if (session) {
        const user = JSON.parse(session);
        user.user.pfp = key;
        await AsyncStorage.setItem("sessionUser", JSON.stringify(user));
      }
    } catch (err) {
      console.error("Erreur en sauvegardant le nouvel avatar :", err);
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setIsPfpModalVisible(true)}
          style={styles.imageWrapper}
        >
          <Image source={imageMap[pfp || "user"]} style={styles.image} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {renderHeader("Pseudo", "nom")}
        {openSection === "nom" && (
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
            placeholder="Votre Pseudo"
          />
        )}

        {renderHeader("Email", "email")}
        {openSection === "email" && (
          <TextInput
            style={[styles.input, styles.disabled]}
            value={email}
            editable={false}
            placeholder="Votre email"
          />
        )}

        {renderHeader("Mot de passe", "motDePasse")}
        {openSection === "motDePasse" && (
          <>
            <TextInput
              style={styles.input}
              value={nouveauMotDePasse}
              onChangeText={setNouveauMotDePasse}
              placeholder="Nouveau mot de passe"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              value={repeteMotDePasse}
              onChangeText={setRepeteMotDePasse}
              placeholder="Répéter le mot de passe"
              secureTextEntry
            />
          </>
        )}

        {renderHeader("Se déconnecter", "logout")}
        {openSection === "logout" && (
          <View style={{ marginTop: 10 }}>
            <Button title="Se déconnecter" onPress={logout} />
          </View>
        )}

        {hasChanges && (
          <TouchableOpacity
            onPress={async () => {
              try {
                const payload: Record<string, string> = {
                  token: sessionToken,
                  email: email,
                };
                if (nom !== originalNom) payload.username = nom;
                if (
                  nouveauMotDePasse &&
                  nouveauMotDePasse === repeteMotDePasse
                ) {
                  payload.password = nouveauMotDePasse;
                }
                if (pfp !== originalPfp) {
                  payload.pfp = pfp;
                }

                const res = await fetch("http://localhost:1000/updateUser", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
                });

                if (res.ok) {
                  const updated = await res.json();
                  await AsyncStorage.setItem(
                    "sessionUser",
                    JSON.stringify(updated)
                  );
                  setOriginalNom(nom);
                  setOriginalPfp(pfp);
                  setNouveauMotDePasse("");
                  setRepeteMotDePasse("");
                  alert("Modifications sauvegardées !");
                  setHasChanges(false);
                } else {
                  alert("Erreur lors de la sauvegarde");
                }
              } catch (err) {
                console.error(err);
                alert("Erreur réseau");
              }
            }}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Sauvegarder</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={isPfpModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPfpModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Choisissez une photo de profil
            </Text>
            <ScrollView contentContainerStyle={styles.pfpGrid}>
              {Object.entries(imageMap).map(([key, img]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => handlePfpChange(key)}
                  style={styles.pfpItem}
                >
                  <Image source={img} style={styles.pfpImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button
              title="Fermer"
              onPress={() => setIsPfpModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}