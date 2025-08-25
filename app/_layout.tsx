import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Slot, usePathname, useRouter, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Href } from "expo-router";

export default function RootLayout() {
  const [booting, setBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const segments = useSegments(); // ["auth","login"] ou ["(tabs)","index"]
  const pathname = usePathname(); // "/auth/login" ou "/"
  const lastHref = useRef<string | null>(null);

  const safeReplace = (href: Href) => {
    const target = typeof href === "string" ? href : (href as any).pathname ?? String(href);
    if (lastHref.current === target || pathname === target) return;
    lastHref.current = target;
    router.replace(href);
  };

  // 1) lecture initiale
  useEffect(() => {
    (async () => {
      const s = await AsyncStorage.getItem("sessionUser");
      setIsLoggedIn(!!s);
      setBooting(false);
    })();
  }, []);

  // 2) re-check de la session à CHAQUE changement d’URL
  useEffect(() => {
    if (booting) return;
    let cancelled = false;

    (async () => {
      const s = await AsyncStorage.getItem("sessionUser");
      if (cancelled) return;
      const logged = !!s;
      setIsLoggedIn(logged);

      const inAuth = segments[0] === "auth"; // groupe visible
      // en web, la home des tabs == "/"
      if (!logged && !inAuth) {
        safeReplace("/auth/login");
        return;
      }
      if (logged && inAuth) {
        safeReplace("/");
        return;
      }
      // sinon, on ne bouge pas
    })();

    return () => {
      cancelled = true;
    };
  }, [booting, pathname, segments]);

  if (booting) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Slot />;
}
