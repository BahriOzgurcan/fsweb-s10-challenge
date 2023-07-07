import axios from "axios";
import { Dispatch } from "react";
import { toast } from "react-toastify";
import { baslangicNotlariniGetir, s10chLocalStorageKey } from "./reducers";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";
export const LOCAL_NOT_KONTROL = "LOCAL_NOT_KONTROL";

export function notEkle(not) {
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId };
}

export const notKontrol = () => (dispatch) => {
 const initialState = baslangicNotlariniGetir(s10chLocalStorageKey);
 console.log(initialState)
 dispatch(notEkleAPI(initialState));
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        dispatch(notEkle(JSON.parse(res.data.data)));
        console.log(JSON.parse(res.data.data))
      }
    })
    .catch((error) => toast.error("Notunuz eklenemedi. Lutfen tekrar deneyiniz."));
};

export const notSilAPI = (id) => (dispatch) => {
  console.log(id);
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        dispatch(notSil(id));
      }
    })
    .catch((error) => toast.error("Notunuz silinemedi. Lutfen tekrar deneyiniz."));
};
