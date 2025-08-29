import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles, { COLORS } from "../styles/home.styles";
import { API_BASE } from "../src/config";

type MiniRecipe = {
  id: string | number;
  title: string;
  likesCount?: number;
  views?: number;
};

type TodayRecipe = {
  _id: string;
  nom: string;
  categorie?: string;
  ingredient?: { nom: string; quantite?: string }[];
  etape?: string[];
  tags?: string[];
  temps?: string;
  nombre_ingredients?: number;
  likesCount?: number;
  views?: number;
};

function chunkArray<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const SCREEN_W = Dimensions.get("window").width;
const H_PADDING = 20;
const GAP = 12;
const COL_W = (SCREEN_W - H_PADDING * 2 - GAP * 2) / 3;

const local = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  col: {
    width: COL_W,
    alignItems: "center",
  },
  colEmpty: {
    width: COL_W,
  },
  boxSquare: {
    width: COL_W,
    height: COL_W,
    overflow: "hidden",
  },
});

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [todayRecipe, setTodayRecipe] = useState<TodayRecipe | null>(null);
  const [lastScan, setLastScan] = useState<MiniRecipe[]>([]);
  const [popular, setPopular] = useState<MiniRecipe[]>([]);

  const recipeImg = (id?: string | number | null) =>
    id != null ? `${API_BASE}/recipes/${id}/image` : undefined;

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const session = await AsyncStorage.getItem("sessionUser");
        if (session && mounted) {
          const parsed = JSON.parse(session);
          setUsername(parsed?.user?.username ?? null);
        }

        try {
          const r = await fetch(`${API_BASE}/recipetoday`);
          if (mounted && r.ok) {
            const json = await r.json();
            setTodayRecipe(json ?? null);
          }
        } catch {}

        try {
          const r = await fetch(`${API_BASE}/recipes/popular`);
          if (mounted && r.ok) {
            const arr = await r.json();
            setPopular(
              (Array.isArray(arr) ? arr : [])
                .slice(0, 9)
                .map((x: any, i: number) => ({
                  id: x._id ?? i,
                  title: x.nom ?? "Recette Description",
                  likesCount:
                    typeof x.likesCount === "number" ? x.likesCount : 0,
                  views: typeof x.views === "number" ? x.views : 0,
                }))
            );
          } else if (mounted) {
            setPopular(
              Array.from({ length: 9 }).map((_, i) => ({
                id: i,
                title: "Recette\nDescription",
                likesCount: 0,
                views: 0,
              }))
            );
          }
        } catch {
          if (mounted) {
            setPopular(
              Array.from({ length: 9 }).map((_, i) => ({
                id: i,
                title: "Recette\nDescription",
                likesCount: 0,
                views: 0,
              }))
            );
          }
        }

        if (mounted) {
          setLastScan(
            Array.from({ length: 3 }).map((_, i) => ({
              id: i,
              title: "Recette\nDescription",
            }))
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text
          style={{ marginTop: 10, color: COLORS.primary, fontWeight: "700" }}
        >
          Chargement…
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>🎉 Frico's App</Text>
        </View>

        {username ? (
          <Text style={styles.hello}>Bienvenue, {username} 👋</Text>
        ) : null}

        {todayRecipe ? (
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.today}>
              🥗 Recette du jour :{" "}
              <Text style={{ fontWeight: "700", color: COLORS.text }}>
                {todayRecipe.nom}
              </Text>
            </Text>
            <Text style={{ color: COLORS.textMuted, fontSize: 12, textAlign:"center" }}>
              ⏱️ {todayRecipe.temps ?? "—"} • ❤️ {todayRecipe.likesCount ?? 0} •
              👁️ {todayRecipe.views ?? 0}
            </Text>

            {/* <View style={[styles.box, local.boxSquare, { marginTop: 8 }]}>
              {recipeImg(todayRecipe._id) ? (
                <Image
                  source={{ uri: recipeImg(todayRecipe._id)! }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              ) : null}
            </View> */}
          </View>
        ) : (
          <Text style={styles.today}>🥗 Recette du jour : …</Text>
        )}

        {/* Last Scan */}
        <Text style={styles.sectionTitle}>Last Scan :</Text>
        {chunkArray(lastScan, 3).map((row, i) => (
          <View key={`scan-row-${i}`} style={local.row}>
            {row.map((it) => (
              <View key={it.id} style={local.col}>
                <View style={[styles.box, local.boxSquare]}>
                  {recipeImg(it.id) ? (
                    <Image
                      source={{ uri: recipeImg(it.id)! }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  ) : null}
                </View>
                <Text numberOfLines={2} style={styles.boxCaption}>
                  {it.title}
                </Text>
              </View>
            ))}
            {Array.from({ length: 3 - row.length }).map((_, k) => (
              <View key={`scan-pad-${k}`} style={local.colEmpty} />
            ))}
          </View>
        ))}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Recettes les plus likées :</Text>
        {chunkArray(popular, 3).map((row, i) => (
          <View key={`pop-row-${i}`} style={local.row}>
            {row.map((it) => (
              <View key={it.id} style={local.col}>
                <View style={[styles.box, local.boxSquare]}>
                  {recipeImg(it.id) ? (
                    <Image
                      source={{ uri: recipeImg(it.id)! }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  ) : null}
                </View>
                <Text numberOfLines={2} style={styles.boxCaption}>
                  {it.title}
                </Text>
                <Text style={{ marginTop: 4, fontSize: 12, color: COLORS.textMuted }}>
                  ❤️ {it.likesCount ?? 0}{" "}
                  {typeof it.views === "number" ? `• 👁️ ${it.views}` : ""}
                </Text>
              </View>
            ))}
            {Array.from({ length: 3 - row.length }).map((_, k) => (
              <View key={`pop-pad-${k}`} style={local.colEmpty} />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
