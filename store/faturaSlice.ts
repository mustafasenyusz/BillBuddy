import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FaturaTipi {
    id: string;
    kullanici_id: string;
    kategori: "Elektrik" | "Su" | "Doğalgaz" | "İnternet" | "Telefon" | "Diğer";
    tutar: number;
    odeme_tarihi: string;
    fatura_donemi: string;
    durum: "ödendi" | "bekliyor";
}

interface FaturaState {
    tumFaturalar: FaturaTipi[];
}

const initialState: FaturaState = {
    tumFaturalar: []
};

const billSlice = createSlice({
    name: "FaturaIslemleri",
    initialState,
    reducers: {
        AddBill: (state, action: PayloadAction<FaturaTipi>) => {
            state.tumFaturalar.push(action.payload);
        },
        DeleteBill: (state, action: PayloadAction<string>) => {
            state.tumFaturalar = state.tumFaturalar.filter((fatura) => fatura.id !== action.payload);
        },
        MarkAsPaid: (state, action: PayloadAction<string>) => {
            const fatura = state.tumFaturalar.find(f => f.id === action.payload);
            if (fatura) {
                fatura.durum = "ödendi";
            }
        }
    }
});

export const { AddBill, DeleteBill, MarkAsPaid } = billSlice.actions;
export default billSlice.reducer;