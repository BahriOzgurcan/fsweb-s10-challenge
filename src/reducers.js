import { NOT_EKLE, NOT_SIL } from "./actions";

 export const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [],
};

export function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return null
  }
}

const reducer = (state = baslangicDegerleri, action) => {
  switch (action.type) {
    case NOT_EKLE:
      let newState = {
        ...state,
        notlar: [...state.notlar, action.payload],
      };
      localStorageStateYaz(s10chLocalStorageKey, state.notlar);
      console.log(state)
      return newState;
    case NOT_SIL:
      let newDeletedState = {
        ...state,
        notlar: state.notlar.filter((item) => item.id !== action.payload),
      };
      localStorageStateYaz(s10chLocalStorageKey, state.notlar);
      console.log(state.notlar);
      return newDeletedState;
    default:
      return state;
  }
};

export default reducer;
