import { useState, useEffect } from "react";
import styles from "./register.styles";
import { Checkbox } from 'expo-checkbox';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Linking
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Ajouter un état pour le message d'erreur
  const router = useRouter();

  // Vérification si l'utilisateur est déjà connecté au chargement du composant
  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const sessionUser = await AsyncStorage.getItem("sessionUser");
      if (sessionUser) {
        router.replace("/"); // Redirige vers la page d'accueil si déjà connecté
      }
    };

    checkIfUserIsLoggedIn();
  }, []); // Se lance au premier rendu du composant

  const handleRegister = async () => {
    setErrorMessage(""); // Réinitialiser le message d'erreur avant chaque soumission

    if (!username || !email || !password) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    if (!isChecked) {
      setErrorMessage("Vous devez accepter les conditions.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Adresse email invalide.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:1000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("sessionUser", JSON.stringify({ user: data.user }));
        router.replace("/");
      } else {
        setErrorMessage(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setErrorMessage("Impossible de joindre le serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);

    const uppercaseCheck = /[A-Z]/.test(newPassword);
    setHasUppercase(uppercaseCheck);

    const numberCheck = /\d/.test(newPassword);
    setHasNumber(numberCheck);

    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    setHasSpecialChar(specialCharCheck);
  };

  const isFormValid = username && email && password && hasUppercase && hasNumber && hasSpecialChar && password.length >= 7;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Inscription" }} />
      <Text style={styles.title}>Inscription</Text>

      <TextInput
        placeholder="Pseudo"
        value={username}
        onChangeText={setUsername}
        style={[styles.input, !username && { borderColor: "red", borderWidth: 1 }]}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, !email && { borderColor: "red", borderWidth: 1 }]}
      />

      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        style={[styles.input, !password && { borderColor: "red", borderWidth: 1 }]}
      />

      {/* Indicate password strength */}
      <View style={styles.passwordRequirementContainer}>
        <Text style={[styles.passwordRequirementText, hasUppercase ? { color: 'green' } : { color: 'red' }]}>
          Contient une majuscule
        </Text>
        <Text style={[styles.passwordRequirementText, hasNumber ? { color: 'green' } : { color: 'red' }]}>
          Contient un chiffre
        </Text>
        <Text style={[styles.passwordRequirementText, hasSpecialChar ? { color: 'green' } : { color: 'red' }]}>
          Contient un caractère spécial
        </Text>
        <Text style={[styles.passwordRequirementText, password.length >= 7 ? { color: 'green' } : { color: 'red' }]}>
          Au moins 7 caractères
        </Text>
      </View>

      {/* Affichage du message d'erreur en rouge */}
      {errorMessage !== "" && (
        <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
      )}

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxText}>
          En m'inscrivant, j'adhère à la{' '}
          <Text style={styles.link} onPress={() => Linking.openURL('https://www.example.com/privacy-policy')}>
            politique de confidentialité
          </Text>{' '}
          et aux{' '}
          <Text style={styles.link} onPress={() => Linking.openURL('https://www.example.com/terms')}>
            conditions de service
          </Text> de Frico.
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        style={[styles.button, (!isFormValid || isLoading || !isChecked) && { opacity: 0.7 }]}
        disabled={!isFormValid || isLoading || !isChecked}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>S'inscrire</Text>
        )}
      </TouchableOpacity>

      <Link href="/auth/login" asChild>
        <TouchableOpacity style={styles.linkContainer}>
          <Text style={styles.linkText}>Déjà un compte ? Connectez-vous</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
