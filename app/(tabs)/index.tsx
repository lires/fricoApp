import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../src/config";

export default function Index() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [todayRecipe, setTodayRecipe] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const session = await AsyncStorage.getItem("sessionUser");
        if (!session) {
          if (isMounted) setLoading(false);
          return;
        }
        const sessionUser = JSON.parse(session);
        if (isMounted) setUsername(sessionUser.user?.username ?? "");

        const res = await fetch(`${API_BASE}/recipetoday`);
        if (res.ok) {
          const recipe = await res.json();
          if (isMounted) setTodayRecipe(recipe.nom ?? null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Chargement…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
      {username ? (
        <>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Bienvenue, {username} 👋
          </Text>
          {todayRecipe ? (
            <Text style={{ fontSize: 16 }}>
              🥗 Recette du jour : <Text style={{ fontWeight: "bold" }}>{todayRecipe}</Text>
            </Text>
          ) : (
            <Text>Chargement de la recette…</Text>
          )}
        </>
      ) : (
        <Text>Aucune session</Text>
      )}

      <Button title="Aller à Register" onPress={() => router.push("/auth/register")} />
    </View>
  );
}
