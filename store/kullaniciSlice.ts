import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface KullaniciTipi {
    id: string;
    kullanici_adi: string;
    telefon_numarasi?: string;
    sifre: string;
    cinsiyet: string;
    kayit_tarihi: string;
    rol: "admin" | "kullanici";
}

interface GirisDurumu {
    tumKullanicilar: KullaniciTipi[];
    aktifKullanici: KullaniciTipi | null;
}

const initialState: GirisDurumu = {
    aktifKullanici: null,
    tumKullanicilar: []
};

const userSlice = createSlice({
    name: "KullaniciIslemleri",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ kullanici_adi: string; sifre: string; telefon_numarasi?: string }>) => {
            const KullaniciVarMi = state.tumKullanicilar.find((bul) =>
                (bul.kullanici_adi === action.payload.kullanici_adi || (action.payload.telefon_numarasi && bul.telefon_numarasi === action.payload.telefon_numarasi)) &&
                bul.sifre === action.payload.sifre
            );

            if (KullaniciVarMi) {
                state.aktifKullanici = KullaniciVarMi;
            } else {
                console.log("kullanıcı adı veya sifre yanlıs kullanıcı kayıtlı da olmayabilir");
            }
        },
        register: (state, action: PayloadAction<KullaniciTipi>) => {
            const kullanıcıKontrol = state.tumKullanicilar.find((kontrol) =>
                kontrol.kullanici_adi === action.payload.kullanici_adi &&
                kontrol.telefon_numarasi === action.payload.telefon_numarasi
            );
            if (kullanıcıKontrol) {
                console.log("kullanıcı zaten kayıtlı");
            } else {
                state.tumKullanicilar.push(action.payload);
                console.log("kaydedildi kullanici");
            }
        },
        logout: (state) => {
            state.aktifKullanici = null;
        },
        changePassword: (state, action: PayloadAction<{ eskiSifre: string; yeniSifre: string }>) => {
            const user = state.tumKullanicilar.find((u) => u.id === state.aktifKullanici?.id);

            if (!state.aktifKullanici) {
                console.log("ilk önce giriş yapılmalı");
                return;
            }

            if (user && user.sifre === action.payload.eskiSifre) {
                user.sifre = action.payload.yeniSifre;
                state.aktifKullanici.sifre = action.payload.yeniSifre;
                console.log("Şifre başarıyla değiştirildi.");
            } else {
                console.log("Eski şifre hatalı veya kullanıcı bulunamadı.");
            }
        }
    }
});
export const {login,logout,register,changePassword}=userSlice.actions
export default userSlice.reducer