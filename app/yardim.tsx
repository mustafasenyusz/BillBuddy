import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DestekScreen = () => {
  const router = useRouter();

  const ePostaGonder = () => {
    Linking.openURL('mailto:mustafasenyusz@gmail.com?subject=BillBuddy Destek Talebi');
  };

  const linkedinProfilineGit = () => {
    Linking.openURL('https://www.linkedin.com/in/mustafasenyuz');
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
          <Text style={styles.subBrand}>Yardım ve Destek</Text>
        </View>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollIcerik}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profilKapsayici}>
          <View style={styles.profilIkonKutusu}>
            <Ionicons name="help-buoy-outline" size={40} color="#0F172A" />
          </View>
          <Text style={styles.profilIsim}>Müşteri Hizmetleri</Text>
          <Text style={styles.profilUnvan}>Size yardımcı olmak için buradayız</Text>
        </View>

        <View style={styles.bolum}>
          <View style={styles.bolumBaslikAlani}>
            <Ionicons name="chatbubbles-outline" size={20} color="#0F172A" />
            <Text style={styles.bolumBaslik}>Bizimle İletişime Geçin</Text>
          </View>
          <Text style={styles.bolumMetin}>
            BillBuddy ile ilgili yaşadığınız teknik sorunlar, hesap hataları, geri bildirimler veya iş birliği talepleriniz için aşağıdaki iletişim kanallarını kullanarak doğrudan bizimle iletişime geçebilirsiniz.
          </Text>
        </View>

        <View style={styles.butonKapsayici}>
          <TouchableOpacity 
            style={styles.destekButonu} 
            onPress={ePostaGonder}
            activeOpacity={0.8}
          >
            <View style={styles.butonSol}>
              <Ionicons name="mail-outline" size={22} color="#FFFFFF" />
              <Text style={styles.destekButonYazi}>E-Posta ile Destek Al</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.destekButonu, styles.linkedinButon]} 
            onPress={linkedinProfilineGit}
            activeOpacity={0.8}
          >
            <View style={styles.butonSol}>
              <Ionicons name="logo-linkedin" size={22} color="#FFFFFF" />
              <Text style={styles.destekButonYazi}>LinkedIn üzerinden Ulaş</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.bolum}>
          <View style={styles.bolumBaslikAlani}>
            <Ionicons name="time-outline" size={20} color="#0F172A" />
            <Text style={styles.bolumBaslik}>Geri Dönüş Süresi</Text>
          </View>
          <Text style={styles.bolumMetin}>
            Gönderilen tüm destek talepleri ve e-postalar teknik ekibimiz tarafından titizlikle incelenmektedir. Yaşadığınız problemin çözümü adına en geç yirmi dört saat içerisinde tarafınıza dönüş sağlanacaktır.
          </Text>
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
  bolum: {
    marginTop: 24,
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  bolumBaslikAlani: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12
  },
  bolumBaslik: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A'
  },
  bolumMetin: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
    fontWeight: '400'
  },
  butonKapsayici: {
    marginTop: 24,
    gap: 12
  },
  destekButonu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 14
  },
  linkedinButon: {
    backgroundColor: '#0077B5'
  },
  butonSol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  destekButonYazi: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF'
  }
});

export default DestekScreen;