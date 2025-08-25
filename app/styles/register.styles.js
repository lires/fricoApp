import { StyleSheet } from "react-native";
import { COLORS } from "../src/config";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.bg,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: COLORS.text,
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: COLORS.white,
    fontSize: 16,
  },
  button: {
    marginTop: 15,
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: { marginTop: 25 },
  linkText: { color: COLORS.primary, fontSize: 16, textDecorationLine: "underline" },

  passwordRequirementContainer: { width: "100%", marginTop: 15 },
  passwordRequirementText: { fontSize: 14, marginVertical: 3, color: COLORS.textMuted },
  validText: { color: "#16a34a" },
  invalidText: { color: "#dc2626" },

  checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  checkbox: { marginRight: 10 },
  checkboxText: { fontSize: 14, color: COLORS.text },
  link: { color: COLORS.primary, textDecorationLine: "underline" },
});
