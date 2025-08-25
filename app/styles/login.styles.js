import { StyleSheet } from "react-native";
import { COLORS } from "../src/config"; // pas ../../

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.bg,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.text,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  button: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 20,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  errorText: {
    color: "#EF4444",
    marginBottom: 10,
    textAlign: "center",
  },
});
