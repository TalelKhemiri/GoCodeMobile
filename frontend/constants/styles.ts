import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = {
  skyBlue: '#A4D7E1',     // Light Blue
  tealGrey: '#7A9B9E',    // Muted Teal
  bgWhite: '#F0F4F8',     // Light Grey Background
  midnight: '#2C3E50',    // Dark Navy
  white: '#FFFFFF',
  textGrey: '#5d6d7e',
  border: '#E2E8F0',
  success: '#27ae60',
  error: '#e74c3c',
};

export const styles = StyleSheet.create({
  // === GLOBAL ===
  container: {
    flex: 1,
    backgroundColor: COLORS.bgWhite,
  },
  
  // === HEADER SPECIFIC (CORRIGÉ POUR ANDROID) ===
  headerSafeArea: {
    backgroundColor: COLORS.white,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    // Le correctif magique pour Android :
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 10 : 0,
    // Ombres
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  // Logo
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.midnight,
    marginLeft: 8,
  },
  logoDot: {
    color: COLORS.tealGrey,
  },
  // Auth Buttons (Right)
  authContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnLogin: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  btnLoginText: {
    color: COLORS.midnight,
    fontWeight: '600',
    fontSize: 13,
  },
  btnRegister: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: COLORS.midnight,
  },
  btnRegisterText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 13,
  },
  // User Profile
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userAvatar: {
    width: 32, height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.skyBlue,
    alignItems: 'center', justifyContent: 'center',
  },
  userAvatarText: {
    fontWeight: 'bold', color: COLORS.midnight,
  },
  btnLogout: {
    padding: 6,
  },

  // Navigation Row (Sub-header)
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute evenly
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FCFCFD',
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  navLinkText: {
    color: COLORS.textGrey,
    fontWeight: '500',
    fontSize: 14,
  },
  navLinkActive: {
    color: COLORS.midnight,
    fontWeight: '700',
  },

  // === HERO SECTION ===
  heroSection: {
    height: 600,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  heroBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(44, 62, 80, 0.6)', 
  },
  heroContent: {
    zIndex: 2,
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 40,
  },
  badgeGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(164, 215, 225, 0.2)',
    borderColor: 'rgba(164, 215, 225, 0.4)',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 50,
    marginBottom: 20,
  },
  badgeText: {
    color: COLORS.skyBlue,
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 13,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 40,
  },
  heroHighlight: {
    color: COLORS.skyBlue,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    maxWidth: 300,
  },
  heroButtons: {
    width: '100%',
    gap: 12,
  },
  btnHeroSolid: {
    backgroundColor: COLORS.skyBlue,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    elevation: 3,
  },
  btnHeroSolidText: {
    color: COLORS.midnight,
    fontWeight: '800',
    fontSize: 16,
    marginRight: 8,
  },
  btnHeroGlass: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  // === FEATURES ===
  featuresSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.bgWhite,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.midnight,
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    textAlign: 'center',
    color: COLORS.textGrey,
    fontSize: 14,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 60, height: 60,
    borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  bgTeal: { backgroundColor: 'rgba(122, 155, 158, 0.15)' },
  bgBlue: { backgroundColor: 'rgba(164, 215, 225, 0.25)' },
  bgDark: { backgroundColor: COLORS.midnight },
  
  featureCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.midnight,
    marginBottom: 8,
  },
  featureCardDesc: {
    textAlign: 'center',
    color: COLORS.textGrey,
    fontSize: 14,
    lineHeight: 20,
  },

  // === CATALOG ===
  catalogSection: {
    padding: 20,
    paddingBottom: 60,
  },
  catalogHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 10,
  },
  catalogTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.midnight,
    marginLeft: 10,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardTag: {
    position: 'absolute',
    top: 12, left: 12,
    backgroundColor: COLORS.midnight,
    paddingVertical: 6, paddingHorizontal: 10,
    borderRadius: 6,
  },
  cardTagText: { color: COLORS.skyBlue, fontWeight: '700', fontSize: 11 },
  cardBody: { padding: 16 },
  cardMeta: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12,
  },
  cardPrice: {
    fontWeight: 'bold', color: COLORS.success, backgroundColor: '#e8f8f5', paddingHorizontal: 8, borderRadius: 4, paddingVertical: 2
  },
  cardTitle: {
    fontSize: 18, fontWeight: 'bold', color: COLORS.midnight, marginBottom: 8,
  },
  btnEnroll: {
    backgroundColor: COLORS.midnight,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    marginTop: 12,
  },
  btnEnrollText: {
    color: 'white', fontWeight: 'bold', marginRight: 6,
  },

  // === FORMS (LOGIN / REGISTER) - NOUVEAU ===
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.bgWhite,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.midnight,
    marginBottom: 10,
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: 16,
    color: COLORS.textGrey,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.midnight,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.midnight,
  },
  primaryButton: {
    backgroundColor: COLORS.midnight,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: COLORS.midnight,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: COLORS.tealGrey,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },

  // === FOOTER ===
  footer: {
    backgroundColor: COLORS.midnight,
    padding: 40,
    alignItems: 'center',
    marginTop: 20,
  },
  footerLogo: {
    fontSize: 24, fontWeight: 'bold', color: 'white',
    marginBottom: 10,
  },
  footerText: {
    color: '#94a3b8', fontSize: 13, marginTop: 5, textAlign: 'center',
  },
});