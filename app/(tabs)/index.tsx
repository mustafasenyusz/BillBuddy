import { RootState } from '@/store/store';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const { height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const router = useRouter();
  const aktifKullanici = useSelector((state: RootState) => state.kullanici.aktifKullanici);

  useEffect(() => {
    if (aktifKullanici) {
      router.replace("/homepage");
    }
  }, [aktifKullanici]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Marka ismi ekranın en tepesine nefes aldırıldı */}
          <Text style={styles.brand}>BILLBUDDY</Text>
          
          {/* Hero alanı artık daha geniş bir alana yayılıyor */}
          <View style={styles.hero}>
            <Text style={styles.headline}>Faturalarını{'\n'}takipte tut.</Text>
            <Text style={styles.subline}>
              Son ödeme tarihleri ve harcama geçmişin{'\n'}artık tek bir merkezde, kontrol altında.
            </Text>
          </View>

          {/* Butonlar artık alt kısma daha geniş yayılıyor */}
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => router.push('/register')}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => router.push('/login')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between', // İçeriği tepeden aşağı yayar
    paddingVertical: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40, // Kenar boşluklarını biraz daha daralttık ki içerik yayılsın
  },
  brand: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: height * 0.1, // Ekran yüksekliğine göre dinamik boşluk
  },
  headline: {
    fontSize: 52,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: -2,
    lineHeight: 56,
    marginBottom: 24,
  },
  subline: {
    fontSize: 18,
    color: '#666666',
    lineHeight: 30,
    fontWeight: '400',
  },
  hero: {
    flex: 1, // Hero alanı artık boşluğu emiyor
    justifyContent: 'flex-start',
  },
  actions: {
    marginTop: 40,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#000000',
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  secondaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WelcomeScreen;