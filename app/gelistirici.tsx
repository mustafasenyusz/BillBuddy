import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HakkindaScreen = () => {
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
          <Text style={styles.subBrand}>Geliştirici Hakkında</Text>
        </View>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollIcerik}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profilKapsayici}>
          <View style={styles.profilIkonKutusu}>
            <Ionicons name="code-slash" size={40} color="#0F172A" />
          </View>
          <Text style={styles.profilIsim}>Mustafa Şenyüz</Text>
          <Text style={styles.profilUnvan}>Junior React Native Developer</Text>
        </View>

        <View style={styles.bolum}>
          <View style={styles.bolumBaslikAlani}>
            <Ionicons name="person-outline" size={20} color="#0F172A" />
            <Text style={styles.bolumBaslik}>Mustafa Şenyüz Kimdir?</Text>
          </View>
          <Text style={styles.bolumMetin}>
            Mustafa Şenyüz, mobil ve tam katmanlı yazılım çözümlerine odaklanmış, yenilikçi ve dinamik bir Junior React Native Geliştiricisidir. Karamanoğlu Mehmetbey Üniversitesi Bilgisayar Programcılığı bölümündeki eğitim altyapısını, pratik ve modern teknolojilerle birleştirerek mobil platformlarda yüksek performanslı, kullanıcı odaklı ve kurumsal standartlarda uygulamalar üretmektedir.
          </Text>
        </View>

        <View style={styles.bolum}>
          <View style={styles.bolumBaslikAlani}>
            <Ionicons name="eye-outline" size={20} color="#0F172A" />
            <Text style={styles.bolumBaslik}>Vizyonu Nedir?</Text>
          </View>
          <Text style={styles.bolumMetin}>
            Teknolojinin hızla dönüştüğü dijital dünyada, karmaşık finansal ve operasyonel süreçleri en sade, güvenli ve kullanıcı dostu arayüzlerle mobil ekranlara taşımayı vizyon edinmiştir. Sadece yerel projelerle sınırlı kalmayıp, küresel yazılım standartlarını ve modern mimarileri benimseyerek uluslararası arenada rekabetçi ve değer üreten bir mühendislik seviyesine ulaşmayı hedeflemektedir.
          </Text>
        </View>

        <View style={styles.bolum}>
          <View style={styles.bolumBaslikAlani}>
            <Ionicons name="trending-up-outline" size={20} color="#0F172A" />
            <Text style={styles.bolumBaslik}>Neler Yapıyor?</Text>
          </View>
          
          <View style={styles.maddeKapsayici}>
            <View style={styles.maddeNokta} />
            <Text style={styles.maddeMetin}>
              Kullanıcıların faturalarını dijital ortamda kurumsal bir hiyerarşiyle, güvenli ve optimize edilmiş şekilde takip etmesini sağlayan BillBuddy gibi yenilikçi mobil uygulamalar geliştirmektedir.
            </Text>
          </View>

          <View style={styles.maddeKapsayici}>
            <View style={styles.maddeNokta} />
            <Text style={styles.maddeMetin}>
              React Native ve TypeScript kullanarak, performans bütçesi dostu, sağlam ve akıcı animasyonlara sahip kullanıcı arayüzleri inşa etmektedir.
            </Text>
          </View>

          <View style={styles.maddeKapsayici}>
            <View style={styles.maddeNokta} />
            <Text style={styles.maddeMetin}>
              Büyük ve dinamik verileri uygulama içinde hatasız yönetmek adına Redux Toolkit mimarisini projelerine entegre etmektedir.
            </Text>
          </View>

          <View style={styles.maddeKapsayici}>
            <View style={styles.maddeNokta} />
            <Text style={styles.maddeMetin}>
              Uluslararası kariyer fırsatlarını ve küresel yazılım dünyasını yakından takip etmek adına profesyonel yetkinliklerini ve teknik İngilizce altyapısını her geçen gün daha ileriye taşımaktadır.
            </Text>
          </View>
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

export default HakkindaScreen;