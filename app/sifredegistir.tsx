import { changePassword } from '@/store/kullaniciSlice';
import { RootState } from '@/store/store';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, KeyRound, Lock } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const SifreDegistirScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const aktifKullanici = useSelector((state: RootState) => state.kullanici.aktifKullanici);

  const [eskiSifre, setEskiSifre] = useState('');
  const [yeniSifre, setYeniSifre] = useState('');
  const [yeniSifreTekrar, setYeniSifreTekrar] = useState('');

  const [eskiSifreGizli, setEskiSifreGizli] = useState(true);
  const [yeniSifreGizli, setYeniSifreGizli] = useState(true);
  const [yeniSifreTekrarGizli, setYeniSifreTekrarGizli] = useState(true);

  const handleSifreDegistir = () => {
    if (!eskiSifre || !yeniSifre || !yeniSifreTekrar) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    if (yeniSifre !== yeniSifreTekrar) {
      Alert.alert('Hata', 'Yeni şifreler birbiriyle eşleşmiyor.');
      return;
    }

    if (yeniSifre.length < 4) {
      Alert.alert('Hata', 'Yeni şifre en az 4 karakter olmalıdır.');
      return;
    }

    if (aktifKullanici && aktifKullanici.sifre !== eskiSifre) {
      Alert.alert('Hata', 'Mevcut eski şifrenizi hatalı girdiniz.');
      return;
    }

    dispatch(changePassword({ eskiSifre, yeniSifre }));
    Alert.alert('Başarılı', 'Şifreniz başarıyla güncellendi.', [
      { text: 'Tamam', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={28} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerMerkez}>
          <Text style={styles.brand}>BillBuddy</Text>
          <Text style={styles.subBrand}>Şifre Değiştir</Text>
        </View>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollIcerik}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.profilKapsayici}>
          <View style={styles.profilIkonKutusu}>
            <KeyRound size={40} color="#0F172A" strokeWidth={1.5} />
          </View>
          <Text style={styles.profilIsim}>Hesap Güvenliği</Text>
          <Text style={styles.profilUnvan}>Şifrenizi düzenli aralıklarla güncelleyin</Text>
        </View>

        <View style={styles.formKapsayici}>
          <Text style={styles.inputEtiket}>Mevcut Şifre</Text>
          <View style={styles.inputAlani}>
            <Lock size={18} color="#64748B" style={styles.solIkon} />
            <TextInput
              style={styles.input}
              placeholder="Eski şifrenizi girin"
              placeholderTextColor="#94A3B8"
              secureTextEntry={eskiSifreGizli}
              value={eskiSifre}
              onChangeText={setEskiSifre}
            />
            <TouchableOpacity onPress={() => setEskiSifreGizli(!eskiSifreGizli)} style={styles.sagIkon}>
              {eskiSifreGizli ? <EyeOff size={18} color="#64748B" /> : <Eye size={18} color="#64748B" />}
            </TouchableOpacity>
          </View>

          <Text style={styles.inputEtiket}>Yeni Şifre</Text>
          <View style={styles.inputAlani}>
            <Lock size={18} color="#64748B" style={styles.solIkon} />
            <TextInput
              style={styles.input}
              placeholder="Yeni şifrenizi girin"
              placeholderTextColor="#94A3B8"
              secureTextEntry={yeniSifreGizli}
              value={yeniSifre}
              onChangeText={setYeniSifre}
            />
            <TouchableOpacity onPress={() => setYeniSifreGizli(!yeniSifreGizli)} style={styles.sagIkon}>
              {yeniSifreGizli ? <EyeOff size={18} color="#64748B" /> : <Eye size={18} color="#64748B" />}
            </TouchableOpacity>
          </View>

          <Text style={styles.inputEtiket}>Yeni Şifre Tekrar</Text>
          <View style={styles.inputAlani}>
            <Lock size={18} color="#64748B" style={styles.solIkon} />
            <TextInput
              style={styles.input}
              placeholder="Yeni şifrenizi tekrar girin"
              placeholderTextColor="#94A3B8"
              secureTextEntry={yeniSifreTekrarGizli}
              value={yeniSifreTekrar}
              onChangeText={setYeniSifreTekrar}
            />
            <TouchableOpacity onPress={() => setYeniSifreTekrarGizli(!yeniSifreTekrarGizli)} style={styles.sagIkon}>
              {yeniSifreTekrarGizli ? <EyeOff size={18} color="#64748B" /> : <Eye size={18} color="#64748B" />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.guncelleButon} 
            onPress={handleSifreDegistir}
            activeOpacity={0.8}
          >
            <Text style={styles.guncelleButonYazi}>Şifreyi Güncelle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 24, 
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9'
  },
  headerMerkez: {
    alignItems: 'center'
  },
  brand: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5
  },
  subBrand: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 1
  },
  scrollIcerik: { 
    paddingHorizontal: 24, 
    paddingBottom: 40 
  },
  profilKapsayici: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 16
  },
  profilIkonKutusu: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  profilIsim: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A'
  },
  profilUnvan: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2
  },
  formKapsayici: {
    marginTop: 16
  },
  inputEtiket: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
    marginTop: 16
  },
  inputAlani: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52
  },
  solIkon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500'
  },
  sagIkon: {
    padding: 4
  },
  guncelleButon: {
    backgroundColor: '#0F172A',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2
  },
  guncelleButonYazi: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF'
  }
});

export default SifreDegistirScreen;