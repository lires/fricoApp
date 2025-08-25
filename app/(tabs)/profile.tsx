import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Animated,
  Easing,
  Image,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import styles, { COLORS } from "../styles/profil.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { API_BASE } from "../src/config";

type SectionKey = "nom" | "email" | "motDePasse" | "logout";

export default function Profil() {
  const router = useRouter();

  const [nom, setNom] = useState("");
  const [originalNom, setOriginalNom] = useState("");
  const [email, setEmail] = useState("");
  const [pfp, setPfp] = useState("");
  const [originalPfp, setOriginalPfp] = useState("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [repeteMotDePasse, setRepeteMotDePasse] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  const [subscription, setSubscription] = useState<string>("free");
  const [userId, setUserId] = useState<string | undefined>();
  const [createdAt, setCreatedAt] = useState<string | undefined>();
  const [updatedAt, setUpdatedAt] = useState<string | undefined>();

  const [savingPfp, setSavingPfp] = useState(false);

  const [stats, setStats] = useState({
    scansCount: 0,
    recipesTested: 0,
    favoritesSaved: 0,
    veggiesDiscovered: 0,
  });

  const [isPfpModalVisible, setIsPfpModalVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
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

  const dateFromObjectId = (id?: string) => {
    if (!id) return null;
    try {
      return new Date(parseInt(id.substring(0, 8), 16) * 1000);
    } catch {
      return null;
    }
  };

  const formatFrMonthYear = (iso?: string, fallbackId?: string) => {
    let d: Date | null = iso ? new Date(iso) : dateFromObjectId(fallbackId);
    if (!d || isNaN(d.getTime())) return "date inconnue";
    try {
      return d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
    } catch {
      const mois = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ];
      return `${mois[d.getMonth()]} ${d.getFullYear()}`;
    }
  };

  const loadFromMe = async (token: string) => {
    const res = await fetch(`${API_BASE}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      if (res.status === 401) {
        await AsyncStorage.removeItem("sessionUser");
        router.replace("/auth/login");
      }
      throw new Error("fetch /me failed");
    }
    const data = await res.json();
    const u = data.user || {};

    setNom(u.username || "");
    setOriginalNom(u.username || "");
    setEmail(u.email || "");
    setPfp(u.pfp || "user");
    setOriginalPfp(u.pfp || "user");

    setSubscription(u.subscription || "free");
    setUserId(u._id);
    setCreatedAt(u.createdAt);
    setUpdatedAt(u.updatedAt);

    setStats({
      scansCount: u.scansCount ?? 0,
      recipesTested: u.recipesTested ?? 0,
      favoritesSaved: u.favoritesSaved ?? 0,
      veggiesDiscovered: u.veggiesDiscovered ?? 0,
    });

    const current = await AsyncStorage.getItem("sessionUser");
    if (current) {
      const parsed = JSON.parse(current);
      await AsyncStorage.setItem(
        "sessionUser",
        JSON.stringify({ user: u, token })
      );
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const session = await AsyncStorage.getItem("sessionUser");
        if (!session) return;
        const parsed = JSON.parse(session);
        const token = parsed?.token;
        if (!token) return;
        setSessionToken(token);
        await loadFromMe(token);
      } catch (e) {
        console.error("Erreur de chargement du profil :", e);
      }
    })();
  }, []);

  useEffect(() => {
    const modified =
      nom !== originalNom ||
      pfp !== originalPfp ||
      (!!nouveauMotDePasse && nouveauMotDePasse === repeteMotDePasse);
    setHasChanges(modified);
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
          <AntDesign name="down" size={20} color={COLORS.text} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const handlePfpChange = async (key: string) => {
    try {
      if (!sessionToken) {
        alert("Session expirée, reconnecte-toi.");
        return;
      }
      setSavingPfp(true);

      const res = await fetch(`${API_BASE}/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ pfp: key }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          await AsyncStorage.removeItem("sessionUser");
          router.replace("/auth/login");
          return;
        }
        throw new Error("Echec de mise à jour de l'avatar");
      }

      const data = await res.json();
      const u = data.user || {};

      setPfp(u.pfp || key);
      setOriginalPfp(u.pfp || key);
      setIsPfpModalVisible(false);

      const current = await AsyncStorage.getItem("sessionUser");
      if (current) {
        const parsed = JSON.parse(current);
        await AsyncStorage.setItem(
          "sessionUser",
          JSON.stringify({ user: u, token: parsed.token })
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingPfp(false);
    }
  };

  const Stat = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <View style={styles.statItem}>
      <View style={styles.statDot} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  const RowItem = ({
    icon,
    color,
    label,
    onPress,
    right,
  }: {
    icon: React.ReactNode;
    color?: string;
    label: string;
    right?: React.ReactNode;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.rowItem, { borderColor: COLORS.neutral200 }]}
      onPress={onPress}
    >
      <View
        style={[
          styles.rowIconWrap,
          { backgroundColor: color || COLORS.neutral100 },
        ]}
      >
        {icon}
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
      {right ?? (
        <Feather name="chevron-right" size={20} color={COLORS.textMuted} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.pageTitle}>PROFIL</Text>

        <View style={styles.avatarZone}>
          <TouchableOpacity
            onPress={() => setIsPfpModalVisible(true)}
            style={styles.avatarRing}
          >
            <View style={styles.avatarInner}>
              <Image source={imageMap[pfp || "user"]} style={styles.image} />
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>{nom || "Utilisateur"}</Text>
          <Text style={styles.memberSince}>
            Membre depuis {formatFrMonthYear(createdAt, userId)}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="chart-bar"
              size={18}
              color={COLORS.primary}
            />
            <Text style={styles.cardTitle}> Mes Statistiques</Text>
          </View>
          <View style={styles.statsGrid}>
            <Stat label="Scans réalisés :" value={stats.scansCount} />
            <Stat label="Recettes testées :" value={stats.recipesTested} />
            <Stat
              label="Légumes découverts :"
              value={stats.veggiesDiscovered}
            />
            <Stat label="Favoris sauvés :" value={stats.favoritesSaved} />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={COLORS.primary}
            />
            <Text style={styles.cardTitle}> Informations du compte</Text>
          </View>
          <View style={{ gap: 8 }}>
            <Text style={styles.statLabel}>Email</Text>
            <Text style={styles.statValue}>{email}</Text>

            <Text style={[styles.statLabel, { marginTop: 8 }]}>Abonnement</Text>
            <Text style={styles.statValue}>
              {subscription === "free" ? "Gratuit" : subscription}
            </Text>

            <Text style={[styles.statLabel, { marginTop: 8 }]}>Créé le</Text>
            <Text style={styles.statValue}>
              {formatFrMonthYear(createdAt, userId)}
            </Text>

            {updatedAt ? (
              <>
                <Text style={[styles.statLabel, { marginTop: 8 }]}>
                  Dernière mise à jour
                </Text>
                <Text style={styles.statValue}>
                  {new Date(updatedAt).toLocaleDateString("fr-FR")}
                </Text>
              </>
            ) : null}
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="settings" size={18} color={COLORS.textMuted} />
            <Text style={styles.sectionTitle}> Paramètres</Text>
          </View>

          <RowItem
            icon={<Ionicons name="options" size={16} color={COLORS.primary} />}
            label="Mes préférences"
            onPress={() => toggleSection("nom")}
          />
          {openSection === "nom" && (
            <TextInput
              style={styles.input}
              value={nom}
              onChangeText={setNom}
              placeholder="Votre Pseudo"
              placeholderTextColor={COLORS.textMuted}
            />
          )}

          <RowItem
            icon={
              <Ionicons
                name="notifications-outline"
                size={16}
                color={COLORS.primary}
              />
            }
            label="Notifications"
            onPress={() => {}}
          />

          <RowItem
            icon={<Feather name="lock" size={16} color={COLORS.primary} />}
            label="Confidentialité"
            onPress={() => toggleSection("motDePasse")}
          />

          {openSection === "motDePasse" && (
            <>
              <TextInput
                style={styles.input}
                value={nouveauMotDePasse}
                onChangeText={setNouveauMotDePasse}
                placeholder="Nouveau mot de passe"
                placeholderTextColor={COLORS.textMuted}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                value={repeteMotDePasse}
                onChangeText={setRepeteMotDePasse}
                placeholder="Répéter le mot de passe"
                placeholderTextColor={COLORS.textMuted}
                secureTextEntry
              />
            </>
          )}

          <TouchableOpacity style={styles.premiumBtn}>
            <Ionicons name="diamond-outline" size={16} color="white" />
            <Text style={styles.premiumText}> Passer Premium</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Feather name="log-out" size={16} color={COLORS.danger} />
            <Text style={styles.logoutText}> Déconnexion</Text>
          </TouchableOpacity>

          {hasChanges && (
            <TouchableOpacity
              onPress={async () => {
                try {
                  if (!sessionToken) {
                    alert("Session expirée, reconnecte-toi.");
                    return;
                  }

                  const updates: Record<string, string> = {};
                  if (nom !== originalNom) updates.username = nom;
                  if (
                    nouveauMotDePasse &&
                    nouveauMotDePasse === repeteMotDePasse
                  ) {
                    updates.password = nouveauMotDePasse;
                  }

                  if (Object.keys(updates).length === 0) {
                    setHasChanges(false);
                    return;
                  }

                  const res = await fetch(`${API_BASE}/me`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${sessionToken}`,
                    },
                    body: JSON.stringify(updates),
                  });

                  if (!res.ok) {
                    if (res.status === 401) {
                      await AsyncStorage.removeItem("sessionUser");
                      router.replace("/auth/login");
                      return;
                    }
                    return;
                  }

                  await loadFromMe(sessionToken);
                  setOriginalNom(nom);
                  setOriginalPfp(pfp);
                  setNouveauMotDePasse("");
                  setRepeteMotDePasse("");
                  setHasChanges(false);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Sauvegarder</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

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
            {savingPfp ? (
              <Text style={{ textAlign: "center", marginBottom: 10 }}>
                Enregistrement…
              </Text>
            ) : null}
            <Button
              title="Fermer"
              onPress={() => setIsPfpModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
