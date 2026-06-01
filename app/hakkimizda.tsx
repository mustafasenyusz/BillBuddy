import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const UygulamaHakkindaScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={28} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerMerkez}>
          <Text style={styles.brand}>BillBuddy</Text>
          <Text style={styles.subBrand}>Uygulama Hakkında</Text>
        </View>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollIcerik}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoKapsayici}>
          <View style={styles.logoKutusu}>
            <Ionicons name="wallet" size={44} color="#0F172A" />
          </View>
          <Text style={styles.logoIsim}>BillBuddy</Text>
          <Text style={styles.logoVersiyon}>Versiyon 1.0.0</Text>
        </View>

        <View style={styles.bolum}>
          <View style={styles.bolumBaslikAlani}>
            <Ionicons name="information-circle-outline" size={20} color="#0F172A" />
            <Text style={styles.bolumBaslik}>BillBuddy Nedir?</Text>
          </View>
          <Text style={styles.bolumMetin}>
            BillBuddy, kişisel finans yönetimini kolaylaştırmak ve karmaşık fatura takibi süreçlerini tek bir merkezden organize etmek amacıyla geliştirilmiş modern bir mobil uygulamadır. Gelişmiş veri hiyerarşisi sayesinde tüm ödemelerinizi durumlarına göre ayırarak bütçe kontrolünüzü her an elinizde tutmanızı sağlar.
          </Text>
        </View>

        <View style={styles.bolum}>
          <View style={styles.bolumBaslikAlani}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#0F172A" />
            <Text style={styles.bolumBaslik}>Temel Özellikler</Text>
          </View>
          
          <View style={styles.maddeKapsayici}>
            <View style={styles.maddeNokta} />
            <Text style={styles.maddeMetin}>
              Kategoriselleştirilmiş fatura yönetimi ile bekleyen ve ödenen ödemelerinizi kurumsal bir düzen içinde listeler.
            </Text>
          </View>

          <View style={styles.maddeKapsayici}>
            <View style={styles.maddeNokta} />
            <Text style={styles.maddeMetin}>
              Güvenli onay mekanizmaları sayesinde fatura silme ve ödeme durum güncellemelerini hatasız gerçekleştirir.
            </Text>
          </View>

          <View style={styles.maddeKapsayici}>
            <View style={styles.maddeNokta} />
            <Text style={styles.maddeMetin}>
              Aktif kullanıcı eşleştirme sistemiyle verilerinizi tamamen size özel bir mimaride izole ederek güvenle saklar.
            </Text>
          </View>
        </View>

        <View style={styles.bolum}>
          <View style={styles.bolumBaslikAlani}>
            <View style={styles.bolumBaslikAlani}>
  <Ionicons name="construct-outline" size={20} color="#0F172A" />
  <Text style={styles.bolumBaslik}>Teknolojik Altyapı</Text>
</View>
            <Text style={styles.bolumBaslik}>Teknolojik Altyapı</Text>
          </View>
          <Text style={styles.bolumMetin}>
            Uygulama, en güncel küresel yazılım standartları göz önünde bulundurularak React Native ve TypeScript mimarisi üzerine inşa edilmiştir. Merkezi durum yönetimi için Redux Toolkit kullanılmış olup, arayüz bileşenlerinde yüksek performans ve akıcı kullanıcı deneyimi hedeflenmiştir.
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
  logoKapsayici: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 16
  },
  logoKutusu: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  logoIsim: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5
  },
  logoVersiyon: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
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
  maddeKapsayici: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12
  },
  maddeNokta: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F172A',
    marginTop: 8
  },
  maddeMetin: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
    fontWeight: '400'
  }
});

export default UygulamaHakkindaScreen;