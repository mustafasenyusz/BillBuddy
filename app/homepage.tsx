import { logout } from '@/store/kullaniciSlice';
import { RootState } from '@/store/store';
import { useRouter } from 'expo-router';
import { FilePlus2, HelpCircle, Info, KeyRound, LifeBuoy, LogOut, ReceiptText, UserCheck } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = () => {
  const aktifKullanici = useSelector((state: RootState) => state.kullanici.aktifKullanici);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.kapsayici}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.icerikKapsama} showsVerticalScrollIndicator={false}>
        
        <View style={styles.ustAlan}>
          <View>
            <Text style={styles.selamYazisi}>Hoş geldiniz,</Text>
            <Text style={styles.kullaniciAdi}>{aktifKullanici?.kullanici_adi || 'Kullanıcı'}</Text>
          </View>
          <View style={styles.profilDaire}>
            <Text style={styles.profilHarf}>
              {aktifKullanici?.kullanici_adi ? aktifKullanici.kullanici_adi.charAt(0).toUpperCase() : 'B'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.anaKart} onPress={() => router.push('/faturaekle')} activeOpacity={0.9}>
          <View style={styles.anaKartIcerik}>
            <Text style={styles.anaKartMotto}>BillBuddy</Text>
            <Text style={styles.anaKartBaslik}>Yeni Bir Fatura Ekle</Text>
            <View style={styles.anaKartAltGrup}>
              <View style={styles.anaKartButon}>
                <Text style={styles.anaKartButonYazi}>İşleme Başla</Text>
                <FilePlus2 size={16} color="#0F172A" strokeWidth={2.5} />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.bolumBasligi}>Faturalarım</Text>

        <TouchableOpacity style={styles.genisMenuKarti} onPress={() => router.push('/faturalarim')} activeOpacity={0.9}>
          <View style={styles.genisKartSol}>
            <View style={styles.genisIkonKutusu}>
              <ReceiptText size={24} color="#FFFFFF" strokeWidth={2} />
            </View>
            <View style={styles.genisKartMetinAlani}>
              <Text style={styles.genisKartBaslik}>Tüm Faturalarım</Text>
              <Text style={styles.genisKartAltYazi}>Bekleyen ödemelerinizi ve geçmiş harcamalarınızı inceleyin.</Text>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.bolumBasligi}>Kurumsal & Destek</Text>

        <MenuCard icon={HelpCircle} title="Sıkça Sorulan Sorular" subtitle="Uygulama kullanımı ve merak edilenler" onPress={() => router.push('/sss')} />
        <MenuCard icon={Info} title="Uygulama Hakkında" subtitle="BillBuddy sürüm ve vizyonumuz" onPress={() => router.push('/hakkimizda')} />
        <MenuCard icon={LifeBuoy} title="Yardım & Destek" subtitle="Bizimle iletişime geçin" onPress={() => router.push('/yardim')} />

        <Text style={styles.bolumBasligi}>Güvenlik</Text>

        <MenuCard icon={KeyRound} title="Şifre Değiştir" subtitle="Hesap güvenliğinizi güncelleyin" onPress={() => router.push('/sifredegistir')} />

        <Text style={styles.bolumBasligi}>Sistem</Text>

        <MenuCard icon={UserCheck} title="Geliştirici Hakkında" subtitle="BillBuddy arkasındaki hikaye" onPress={() => router.push('/gelistirici')} variant="mavi" />
        <MenuCard icon={LogOut} title="Oturumu Kapat" subtitle="Güvenli bir şekilde çıkış yapın" onPress={handleLogout} variant="kirmizi" />

        <View style={styles.altBilgi}>
          <Text style={styles.altBilgiYazi}>BillBuddy • Akıllı Fatura Yönetimi</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const MenuCard = ({ icon: Icon, title, subtitle, onPress, variant = 'gri' }: any) => (
  <TouchableOpacity style={styles.yatayKart} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.yatayKartIcerik}>
      <View style={[styles.yatayIkonKutusu, variant === 'mavi' ? styles.maviIkonKutusu : variant === 'kirmizi' ? styles.kirmiziIkonKutusu : styles.griIkonKutusu]}>
        <Icon size={20} color={variant === 'mavi' ? '#0284C7' : variant === 'kirmizi' ? '#EF4444' : '#64748B'} strokeWidth={2} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.yatayKartBaslik, variant === 'kirmizi' && styles.cikisMetni]}>{title}</Text>
        <Text style={styles.yatayKartAltYazi}>{subtitle}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  kapsayici: { flex: 1, backgroundColor: '#F8FAFC' },
  icerikKapsama: { paddingHorizontal: 24, paddingBottom: 32 },
  ustAlan: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 24 },
  selamYazisi: { fontSize: 15, color: '#64748B', fontWeight: '500' },
  kullaniciAdi: { fontSize: 26, fontWeight: '800', color: '#0F172A', letterSpacing: -0.5 },
  profilDaire: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  profilHarf: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  anaKart: { width: '100%', borderRadius: 24, backgroundColor: '#0F172A', padding: 24, marginBottom: 28, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16, elevation: 6 },
  anaKartIcerik: { alignItems: 'flex-start' },
  anaKartMotto: { fontSize: 13, color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  anaKartBaslik: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginBottom: 20 },
  anaKartAltGrup: { flexDirection: 'row', alignItems: 'center' },
  anaKartButon: { backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 8 },
  anaKartButonYazi: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  bolumBasligi: { fontSize: 14, fontWeight: '700', color: '#94A3B8', marginTop: 16, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 },
  genisMenuKarti: { width: '100%', backgroundColor: '#0F172A', borderRadius: 24, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  genisKartSol: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  genisIkonKutusu: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255, 255, 255, 0.1)', justifyContent: 'center', alignItems: 'center' },
  genisKartMetinAlani: { flex: 1 },
  genisKartBaslik: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  genisKartAltYazi: { fontSize: 13, color: '#CBD5E1', lineHeight: 18, fontWeight: '400' },
  yatayKart: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 14, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  cikisMetni: { color: '#EF4444' },
  yatayKartIcerik: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  yatayIkonKutusu: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  griIkonKutusu: { backgroundColor: '#F1F5F9' },
  maviIkonKutusu: { backgroundColor: '#E0F2FE' },
  kirmiziIkonKutusu: { backgroundColor: '#FEE2E2' },
  yatayKartBaslik: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  yatayKartAltYazi: { fontSize: 12, color: '#64748B', marginTop: 1 },
  altBilgi: { alignItems: 'center', marginTop: 24, paddingVertical: 10 },
  altBilgiYazi: { fontSize: 12, color: '#94A3B8', fontWeight: '500' },
});

export default HomeScreen;