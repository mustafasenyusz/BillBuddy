import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface SssTipi {
  id: string;
  soru: string;
  cevap: string;
}

const SSS_VERISI: SssTipi[] = [
  {
    id: '1',
    soru: 'BillBuddy tam olarak nedir ve nasıl çalışır?',
    cevap: 'BillBuddy, kişisel ve kurumsal faturalarınızı tek bir merkezden dijital olarak takip etmenizi sağlayan modern bir finans yönetim uygulamasıdır. Faturalarınızı ekleyerek son ödeme tarihlerini izleyebilir, ödeme durumlarını güncelleyebilir ve bütçenizi daha sağlıklı yönetebilirsiniz.'
  },
  {
    id: '2',
    soru: 'Fatura durumunu nasıl "Ödenmiş Olarak" işaretlerim?',
    cevap: 'Faturalarım ekranında listelenen "Bekleyen Ödemeler" altındaki faturanızın sağ tarafında bulunan "Öde" butonuna tıklayıp gelen güvenli onay mekanizmasını onayladığınızda, faturanız otomatik olarak "Görülmüş / Ödenmiş Faturalar" kategorisine taşınır.'
  },
  {
    id: '3',
    soru: 'Yanlış eklediğim bir faturayı sistemden tamamen silebilir miyim?',
    cevap: 'Evet. İlgili faturanın sağ alt köşesinde bulunan kırmızı çöp kutusu (silme) ikonuna tıklayarak faturayı sistemden tamamen kaldırabilirsiniz. Bu işlem geri alınamaz ve faturaya ait tüm yerel veriler güvenli bir şekilde temizlenir.'
  },
  {
    id: '4',
    soru: 'Verilerim güvende mi ve nerede saklanıyor?',
    cevap: 'Güvenliğiniz bizim için birinci önceliktir. BillBuddy üzerindeki tüm verileriniz, veri tabanı mimarimizde (Redux Store ve ilişkili güvenli yerel katmanlar) aktif kullanıcınızın benzersiz ID\'si (kullanici_id) ile eşleştirilerek sadece sizin erişebileceğiniz şekilde izole edilir.'
  },
  {
    id: '5',
    soru: 'Ödeme tarihlerine ait hatırlatıcı bildirimler alacak mıyım?',
    cevap: 'Geliştirmekte olduğumuz yeni sürümle birlikte, faturalarınızın son ödeme tarihine 1-3 gün kala sistem tarafından otomatik anlık bildirimler (Push Notification) alarak gecikme faizlerinin önüne geçebileceksiniz.'
  },
];

const SssScreen = () => {
  const router = useRouter();
  const [acikSoruId, setAcikSoruId] = useState<string | null>(null);

  const toggleSoru = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (acikSoruId === id) {
      setAcikSoruId(null);
    } else {
      setAcikSoruId(id);
    }
  };

  const SssKarti = ({ item }: { item: SssTipi }) => {
    const isOpen = acikSoruId === item.id;
    return (
      <View style={[styles.kart, isOpen && styles.kartAcik]}>
        <TouchableOpacity 
          style={styles.kartBaslikAlani} 
          onPress={() => toggleSoru(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.soruMetinKapsayici}>
            <Text style={[styles.kartSoru, isOpen && styles.kartSoruAktif]}>{item.soru}</Text>
          </View>
          <Ionicons 
            name={isOpen ? "chevron-up" : "chevron-down"} 
            size={20} 
            color={isOpen ? "#0F172A" : "#64748B"} 
          />
        </TouchableOpacity>
        
        {isOpen && (
          <View style={styles.kartCevapAlani}>
            <View style={styles.ayrac} />
            <Text style={styles.kartCevap}>{item.cevap}</Text>
          </View>
        )}
      </View>
    );
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
          <Text style={styles.subBrand}>Destek ve Bilgi Merkezi</Text>
        </View>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollIcerik}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.bolumBaslik}>SIKÇA SORULAN SORULAR</Text>
        
        {SSS_VERISI.map((item) => (
          <SssKarti key={item.id} item={item} />
        ))}
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
  bolumBaslik: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#94A3B8', 
    marginTop: 24, 
    marginBottom: 16,
    letterSpacing: 1
  },
  kart: { 
    backgroundColor: '#F8FAFC', 
    borderRadius: 14, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden'
  },
  kartAcik: {
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  kartBaslikAlani: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  soruMetinKapsayici: {
    flex: 1,
    marginRight: 12,
    alignItems: 'flex-start'
  },
  kartSoru: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#334155',
    lineHeight: 20
  },
  kartSoruAktif: {
    color: '#0F172A',
    fontWeight: '700'
  },
  kartCevapAlani: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  ayrac: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 12
  },
  kartCevap: { 
    fontSize: 14, 
    color: '#475569', 
    lineHeight: 22,
    fontWeight: '400'
  }
});

export default SssScreen;