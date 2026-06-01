import { KullaniciTipi, register } from '@/store/kullaniciSlice';
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

const RegisterScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [kullanici_adi, setKullanici_adi] = useState("");
  const [telefon_numarasi, setTelefon_numarasi] = useState("");
  const [sifre, setSifre] = useState("");
  const [sifreTekrar, setSifreTekrar] = useState("");
  const [cinsiyet, setCinsiyet] = useState<"Erkek" | "Kadın" | "">("");

  const handleRegister = () => {
    console.log("Kayıt denemesi başladı.");

    if (!kullanici_adi || !sifre || !telefon_numarasi || !cinsiyet) {
      console.log("Hata: Alanlar boş.");
      Alert.alert("Eksik Bilgi", "Lütfen tüm alanları doldurunuz.");
      return;
    }

    if (sifre !== sifreTekrar) {
      console.log("Hata: Şifreler uyuşmuyor.");
      Alert.alert("Hata", "Şifreler eşleşmiyor.");
      return;
    }

    const yeniKullanici: KullaniciTipi = {
      id: Date.now().toString(),
      kullanici_adi,
      sifre,
      telefon_numarasi,
      kayit_tarihi: Date.now().toString(),
      rol: "kullanici",
      cinsiyet
    };

    console.log("Kullanıcı oluşturuldu:", yeniKullanici.kullanici_adi);
    dispatch(register(yeniKullanici));
    
    Alert.alert("Başarılı", "Hesabınız oluşturuldu.");
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandTitle}>BillBuddy</Text>
            <Text style={styles.subtitle}>Finansal yolculuğunuz burada başlıyor.</Text>
          </View>
          
          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Kullanıcı Adı</Text>
              <TextInput style={styles.input} placeholder="Örn: msenyuz" placeholderTextColor="#94A3B8" onChangeText={setKullanici_adi} value={kullanici_adi} autoCapitalize="none" />
            </View>

            <View>
              <Text style={styles.label}>Telefon Numarası</Text>
              <TextInput style={styles.input} placeholder="Örn: 0532 000 00 00" placeholderTextColor="#94A3B8" keyboardType="phone-pad" onChangeText={setTelefon_numarasi} value={telefon_numarasi} />
            </View>

            <View>
              <Text style={styles.label}>Şifre</Text>
              <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#94A3B8" secureTextEntry onChangeText={setSifre} value={sifre} />
            </View>

            <View>
              <Text style={styles.label}>Şifre Tekrar</Text>
              <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#94A3B8" secureTextEntry onChangeText={setSifreTekrar} value={sifreTekrar} />
            </View>

            <View>
              <Text style={styles.label}>Cinsiyet</Text>
              <View style={styles.genderContainer}>
                {["Erkek", "Kadın"].map((item) => (
                  <TouchableOpacity 
                    key={item} 
                    style={[styles.genderButton, cinsiyet === item && styles.genderButtonActive]} 
                    onPress={() => setCinsiyet(item as "Erkek" | "Kadın")}
                  >
                    <Text style={[styles.genderText, cinsiyet === item && styles.genderTextActive]}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Hesabı Oluştur</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerLink} onPress={() => router.push('/login')}>
            <Text style={styles.footerText}>Zaten hesabınız var mı? </Text>
            <Text style={styles.footerLinkBold}>Giriş Yap</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  brandContainer: { marginBottom: 40 },
  brandTitle: { fontSize: 34, fontWeight: '800', color: '#0F172A', letterSpacing: -1 },
  subtitle: { fontSize: 15, color: '#64748B', marginTop: 6 },
  form: { gap: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8, marginLeft: 2 },
  input: { height: 56, backgroundColor: '#F8FAFC', borderRadius: 14, paddingHorizontal: 16, fontSize: 15, color: '#0F172A', borderWidth: 1, borderColor: '#E2E8F0' },
  genderContainer: { flexDirection: 'row', gap: 12 },
  genderButton: { flex: 1, height: 56, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  genderButtonActive: { backgroundColor: '#0F172A', borderColor: '#0F172A' },
  genderText: { fontSize: 15, color: '#64748B', fontWeight: '500' },
  genderTextActive: { color: '#FFFFFF', fontWeight: '600' },
  registerButton: { marginTop: 32, backgroundColor: '#0F172A', height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  footerLink: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: '#64748B', fontSize: 14 },
  footerLinkBold: { color: '#0F172A', fontSize: 14, fontWeight: '700' },
});

export default RegisterScreen;