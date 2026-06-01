import { login } from '@/store/kullaniciSlice';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';

const LoginScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [kullanici_adi, setKullanici_adi] = useState("");
  const [sifre, setSifre] = useState("");

  const handleLogin = () => {
    if (!kullanici_adi || !sifre) {
      Alert.alert("Eksik Bilgi", "Lütfen tüm alanları doldurunuz.");
      return;
    }
    dispatch(login({ kullanici_adi, sifre }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Hoş geldiniz</Text>
            <Text style={styles.subtitle}>Devam etmek için giriş yapın.</Text>
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Kullanıcı Adı Veya Telefon</Text>
              <TextInput
                style={styles.input}
                placeholder="Kullanıcı Adı"
                placeholderTextColor="#CBD5E1"
                onChangeText={setKullanici_adi}
                value={kullanici_adi}
                autoCapitalize="none"
              />
            </View>
            
            <View>
              <Text style={styles.label}>Şifre</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#CBD5E1"
                onChangeText={setSifre}
                value={sifre}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.bottomSection}>
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin} 
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Oturum Aç</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.footerLink} 
              onPress={() => router.push('/register')}
            >
              <Text style={styles.footerText}>Henüz bir hesabınız yok mu? </Text>
              <Text style={styles.footerLinkBold}>Kaydolun</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { 
    flexGrow: 1, 
    paddingHorizontal: 32, 
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'center' 
  },
  header: { marginBottom: 48 },
  title: { fontSize: 28, fontWeight: '800', color: '#1E293B', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#64748B', marginTop: 8 },
  form: { gap: 24, width: '100%' },
  label: { fontSize: 13, fontWeight: '600', color: '#475569', marginBottom: 8, marginLeft: 4 },
  input: {
    height: 52,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#F1F5F9', // Çok hafif, neredeyse görünmez
  },
  bottomSection: { marginTop: 48, gap: 24 },
  loginButton: {
    backgroundColor: '#1E293B',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', letterSpacing: 0.2 },
  footerLink: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#64748B', fontSize: 14 },
  footerLinkBold: { color: '#1E293B', fontSize: 14, fontWeight: '700' },
});

export default LoginScreen;