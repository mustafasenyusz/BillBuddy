import { AddBill } from '@/store/faturaSlice';
import { RootState } from '@/store/store';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

const FaturaEkle = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const aktifKullanici = useSelector((state: RootState) => state.kullanici.aktifKullanici);

  const [kategori, setKategori] = useState<"Elektrik" | "Su" | "Doğalgaz" | "İnternet" | "Telefon" | "Diğer">("Diğer");
  const [tutar, setTutar] = useState('');
  const [tarih, setTarih] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [tarihSecildi, setTarihSecildi] = useState(false);

  const handleKaydet = () => {
    if (!tutar) {
      Alert.alert("Eksik Bilgi", "Lütfen fatura tutarını giriniz.");
      return;
    }

    const yeniFatura = {
      id: Date.now().toString(),
      kullanici_id: aktifKullanici?.id || "misafir",
      kategori,
      tutar: parseFloat(tutar),
      odeme_tarihi: tarih.toLocaleDateString('tr-TR'),
      fatura_donemi: `${tarih.getMonth() + 1}/${tarih.getFullYear()}`,
      durum: "bekliyor" as const,
    };

    dispatch(AddBill(yeniFatura));
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="chevron-back" size={28} color="#0F172A" /></TouchableOpacity>
        <Text style={styles.brand}>BillBuddy</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.baslik}>Yeni Fatura Ekle</Text>

        <View style={styles.form}>
          <View style={styles.grup}>
            <Text style={styles.etiket}>Kategori Seçiniz</Text>
            <View style={styles.chipKapsayici}>
              {["Elektrik", "Su", "Doğalgaz", "İnternet", "Telefon", "Diğer"].map((item) => (
                <TouchableOpacity key={item} style={[styles.chip, kategori === item && styles.chipAktif]} onPress={() => setKategori(item as any)}>
                  <Text style={[styles.chipYazi, kategori === item && styles.chipYaziAktif]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.grup}>
            <Text style={styles.etiket}>Fatura Tutarı (₺)</Text>
            <TextInput style={styles.girdi} placeholder="0.00" keyboardType="decimal-pad" value={tutar} onChangeText={setTutar} />
          </View>

          <View style={styles.grup}>
            <Text style={styles.etiket}>Son Ödeme Tarihi</Text>
            <TouchableOpacity style={styles.girdi} onPress={() => setShowPicker(true)}>
              <Text style={tarihSecildi ? styles.tarihMetin : styles.placeholderMetin}>
                {tarihSecildi ? tarih.toLocaleDateString('tr-TR') : "Tarih Seçiniz"}
              </Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker 
                value={tarih} 
                mode="date" 
                display="default" 
                onChange={(e: DateTimePickerEvent, d?: Date) => { 
                  setShowPicker(false); 
                  if(d) { setTarih(d); setTarihSecildi(true); } 
                }} 
              />
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.kaydetButon} onPress={handleKaydet}>
          <Text style={styles.kaydetButonYazi}>Faturayı Kaydet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 10 },
  brand: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  scroll: { padding: 24 },
  baslik: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginBottom: 32 },
  form: { gap: 24 },
  grup: { gap: 8 },
  etiket: { fontSize: 14, fontWeight: '600', color: '#334155' },
  girdi: { backgroundColor: '#F8FAFC', height: 56, borderRadius: 16, paddingHorizontal: 16, borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center' },
  chipKapsayici: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0' },
  chipAktif: { backgroundColor: '#0F172A', borderColor: '#0F172A' },
  chipYazi: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  chipYaziAktif: { color: '#FFFFFF' },
  tarihMetin: { fontSize: 16, color: '#0F172A' },
  placeholderMetin: { fontSize: 16, color: '#94A3B8' },
  footer: { padding: 24, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  kaydetButon: { backgroundColor: '#0F172A', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  kaydetButonYazi: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' }
});

export default FaturaEkle;