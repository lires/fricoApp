import { StyleSheet, Platform } from "react-native";
import { COLORS as THEME } from "../src/config";
export const COLORS = THEME;

const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
    },
    android: { elevation: 4 },
  }),
};

export default StyleSheet.create({
  pageTitle: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.orange,
    letterSpacing: 1,
  },
  avatarZone: {
    alignItems: "center",
    marginTop: 12,
  },
  avatarRing: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: COLORS.orange,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  avatarInner: {
    width: 92,
    height: 92,
    borderRadius: 46,
    overflow: "hidden",
    backgroundColor: COLORS.neutral100,
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },

  userName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  memberSince: { marginTop: 2, fontSize: 12, color: COLORS.textMuted },

  card: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    ...shadow,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  cardTitle: { fontWeight: "700", color: COLORS.text },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    backgroundColor: "#F0FDF4",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  statDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginBottom: 6,
  },
  statLabel: { fontSize: 12, color: COLORS.textMuted },
  statValue: { marginTop: 2, fontWeight: "700", color: COLORS.text },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 10,
  },
  sectionTitle: { fontWeight: "700", fontSize: 14, color: COLORS.orange },

  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    ...shadow,
  },
  rowIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  rowLabel: { flex: 1, fontSize: 14, color: COLORS.text },

  input: {
    borderWidth: 1,
    borderColor: COLORS.neutral200,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },

  premiumBtn: {
    backgroundColor: COLORS.orange,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 4,
  },
  premiumText: { color: COLORS.white, fontWeight: "700" },

  logoutBtn: {
    borderWidth: 1,
    borderColor: COLORS.danger,
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 12,
  },
  logoutText: { color: COLORS.danger, fontWeight: "700" },

  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    marginTop: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: { color: COLORS.white, fontWeight: "700", fontSize: 16 },

  sectionHeaderContainer: { display: "none" },
  sectionHeader: { fontSize: 18, fontWeight: "600", color: COLORS.text },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    width: "85%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  pfpGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  pfpItem: { margin: 6 },
  pfpImage: { width: 64, height: 64, borderRadius: 32 },

  tabActive: { backgroundColor: COLORS.orange },

  container: { padding: 20 },
});
