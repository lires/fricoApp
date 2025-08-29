import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../src/config";
export { COLORS };

const screenWidth = Dimensions.get("window").width;
const horizontalPadding = 20;
const gap = 12;

const boxWidth = (screenWidth - horizontalPadding * 2 - gap * 2) / 3;

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: horizontalPadding, paddingBottom: 40 },

  banner: {
    alignSelf: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 6,
    marginBottom: 18,
  },
  bannerText: { color: COLORS.white, fontWeight: "700" },

  sectionTitle: {
    color: COLORS.text,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 12,
    textDecorationLine: "underline",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -gap / 2,
  },
  boxWrap: {
    width: boxWidth,
    marginHorizontal: gap / 2,
    marginBottom: 14,
    alignItems: "center",
  },
  box: {
    width: "100%",
    height: boxWidth,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    overflow: "hidden",
  },
  boxCaption: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.neutral200,
    opacity: 0.9,
    marginVertical: 16,
  },

  loaderWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.bg,
  },
  hello: {
    textAlign: "center",
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 8,
  },
  today: { textAlign: "center", color: COLORS.textMuted, marginBottom: 10 },
});
