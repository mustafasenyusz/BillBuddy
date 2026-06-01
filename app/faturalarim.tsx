import { DeleteBill, FaturaTipi, MarkAsPaid } from '@/store/faturaSlice';
import { RootState } from '@/store/store';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const FaturalarimScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const aktifKullanici = useSelector((state: RootState) => state.kullanici.aktifKullanici);
  const kullaniciFaturalari = useSelector((state: RootState) => 
    state.fatura.tumFaturalar.filter((fatura) => fatura.kullanici_id === aktifKullanici?.id)
  );

  const bekleyenFaturalar = kullaniciFaturalari.filter(f => f.durum === 'bekliyor');
  const odenenFaturalar = kullaniciFaturalari.filter(f => f.durum === 'ödendi');

  // Profesyonel Fatura Durumu Güncelleme Tetikleyicisi
  const handleFaturaOde = (fatura: FaturaTipi) => {
    console.log(`[İŞLEM BAŞLATILDI] Fatura Durum Güncelleme -> ID: ${fatura.id}, Kategori: ${fatura.kategori}, Tutar: ${fatura.tutar}₺`);
    
    Alert.alert(
      "Durum Güncelleme",
      `${fatura.kategori} kategorisindeki ${fatura.tutar.toFixed(2)} ₺ tutarındaki faturayı ödenmiş olarak işaretlemek istediğinize emin misiniz?`,
      [
        {
          text: "İptal Et",
          style: "cancel",
          onPress: () => console.log(`[İŞLEM İPTAL EDİLDİ] Fatura Durum Değişikliği Reddedildi -> ID: ${fatura.id}`)
        },
        {
          text: "Ödenmiş Olarak İşaretle",
          style: "default",
          onPress: () => {
            dispatch(MarkAsPaid(fatura.id));
            console.log(`[İŞLEM BAŞARILI] Fatura Durumu 'ödendi' Olarak Güncellendi -> ID: ${fatura.id}`);
            Alert.alert("Başarılı", "Fatura durumu başarıyla ödenmiş olarak güncellendi.");
          }
        }
      ]
    );
  };

  // Profesyonel Fatura Silme Tetikleyicisi
  const handleFaturaSil = (fatura: FaturaTipi) => {
    console.log(`[İŞLEM BAŞLATILDI] Fatura Silme -> ID: ${fatura.id}, Kategori: ${fatura.kategori}`);
    
    Alert.alert(
      "Faturayı Sil",
      "Bu faturayı sistemden tamamen silmek istediğinize emin misiniz? Bu işlem geri alınamaz.",
      [
        {
          text: "Vazgeç",
          style: "cancel",
          onPress: () => console.log(`[İŞLEM İPTAL EDİLDİ] Fatura Silme Kullanıcı Tarafından Reddedildi -> ID: ${fatura.id}`)
        },
        {
          text: "Sil",
          style: "destructive",
          onPress: () => {
            dispatch(DeleteBill(fatura.id));
            console.log(`[İŞLEM BAŞARILI] Fatura Store'dan Tamamen Silindi -> ID: ${fatura.id}`);
            Alert.alert("Silindi", "Fatura sistemden başarıyla kaldırıldı.");
          }
        }
      ]
    );
  };

  // Kurumsal Kart Bileşeni
  const FaturaKarti = ({ item }: { item: FaturaTipi }) => (
    <View style={styles.kart}>
      <View style={styles.kartSol}>
        <View style={[styles.ikonKapsayici, item.durum === 'ödendi' ? styles.ikonOdenen : styles.ikonBekleyen]}>
          <Ionicons 
            name={item.durum === 'ödendi' ? "checkmark-circle" : "time"} 
            size={24} 
            color={item.durum === 'ödendi' ? "#10B981" : "#F59E0B"} 
          />
        </View>
        <View style={styles.metinAlani}>
          <Text style={styles.kartKategori}>{item.kategori}</Text>
          <Text style={styles.kartTarih}>Son Tarih: {item.odeme_tarihi}</Text>
        </View>
      </View>

      <View style={styles.kartSag}>
        <Text style={styles.kartTutar}>{item.tutar.toFixed(2)} ₺</Text>
        <View style={styles.aksiyonlar}>
          {item.durum === 'bekliyor' && (
            <TouchableOpacity 
              style={styles.odeButon} 
              onPress={() => handleFaturaOde(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.odeButonYazi}>Öde</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.silButon} 
            onPress={() => handleFaturaSil(item)}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Kurumsal Üst Alan */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={28} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerMerkez}>
          <Text style={styles.brand}>BillBuddy</Text>
          <Text style={styles.subBrand}>Fatura Takibi</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/faturaekle')} activeOpacity={0.7}>
          <Ionicons name="add-circle-outline" size={28} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Kaydırılabilir İçerik Alanı */}
      <ScrollView 
        contentContainerStyle={styles.scrollIcerik} 
        showsVerticalScrollIndicator={false}
      >
        {kullaniciFaturalari.length === 0 ? (
          <View style={styles.bosEkran}>
            <Ionicons name="receipt-outline" size={48} color="#94A3B8" />
            <Text style={styles.bosEkranYazi}>Sisteme kayıtlı fatura bulunamadı.</Text>
          </View>
        ) : (
          <>
            {/* Bekleyen Ödemeler Bölümü */}
            <Text style={styles.bolumBaslik}>BEKLEYEN ÖDEMELER ({bekleyenFaturalar.length})</Text>
            {bekleyenFaturalar.map((fatura) => (
              <FaturaKarti key={fatura.id} item={fatura} />
            ))}

            {/* Ödenmiş Faturalar Bölümü */}
            <Text style={styles.bolumBaslik}>ÖDENMİŞ FATURALAR ({odenenFaturalar.length})</Text>
            {odenenFaturalar.map((fatura) => (
              <FaturaKarti key={fatura.id} item={fatura} />
            ))}
          </>
        )}
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
    fontSize: 13, 
    fontWeight: '700', 
    color: '#64748B', 
    marginTop: 24, 
    marginBottom: 12,
    letterSpacing: 0.5
  },
  kart: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#F8FAFC', 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  kartSol: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12,
    flex: 1
  },
  ikonKapsayici: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  ikonBekleyen: { backgroundColor: '#FEF3C7' },
  ikonOdenen: { backgroundColor: '#D1FAE5' },
  metinAlani: {
    flex: 1
  },
  kartKategori: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#0F172A' 
  },
  kartTarih: { 
    fontSize: 13, 
    color: '#64748B', 
    marginTop: 2 
  },
  kartSag: { 
    alignItems: 'flex-end', 
    gap: 8,
    marginLeft: 12
  },
  kartTutar: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#0F172A' 
  },
  aksiyonlar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end',
    gap: 8
  },
  odeButon: { 
    backgroundColor: '#0F172A', 
    paddingVertical: 6, 
    paddingHorizontal: 16, 
    borderRadius: 10 
  },
  odeButonYazi: { 
    color: '#FFFFFF', 
    fontSize: 13, 
    fontWeight: '600' 
  },
  silButon: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
  },
  bosEkran: { 
    alignItems: 'center', 
    marginTop: 120,
    gap: 12
  },
  bosEkranYazi: { 
    color: '#94A3B8', 
    fontSize: 15,
    fontWeight: '500'
  }
});

export default FaturalarimScreen;