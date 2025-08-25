import { useState, useEffect } from "react";
import styles from "../styles/login.styles";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // ⚠️ Sur le web, la home des tabs = "/"
  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const sessionUser = await AsyncStorage.getItem("sessionUser");
      if (sessionUser) {
        router.replace("/"); // pas "/(tabs)"
      }
    };
    checkIfUserIsLoggedIn();
  }, []);

  const isFormValid = isValidEmail(email.trim()) && password.trim() !== "";

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Veuillez entrer une adresse email valide.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:1000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        const userObj = { user: data.user, token: data.token };
        await AsyncStorage.setItem("sessionUser", JSON.stringify(userObj));
        // Déclenche le re-check du RootLayout
        router.replace("/"); // pas "/(tabs)"
      } else {
        const message = data?.content || data?.message || "Identifiants invalides.";
        setErrorMessage(message);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setErrorMessage("Impossible de se connecter au serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Connexion" }} />
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {errorMessage !== "" && <Text style={styles.errorText}>{errorMessage}</Text>}

      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.button, (!isFormValid || isLoading) && { opacity: 0.5 }]}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Se connecter</Text>}
      </TouchableOpacity>

      <Link href="/auth/register" asChild>
        <TouchableOpacity style={styles.linkContainer}>
          <Text style={styles.linkText}>Pas encore de compte ? Inscris-toi</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
