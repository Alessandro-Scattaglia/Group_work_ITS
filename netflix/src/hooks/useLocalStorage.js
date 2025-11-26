import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  //inizializza lo stato con il valore memorizzato in localStorage o con il valore iniziale
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  //funzione per aggiornare sia lo stato che localStorage
  const saveValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, saveValue];
}