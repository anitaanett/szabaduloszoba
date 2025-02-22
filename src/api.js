// Foglalások betöltése (localStorage-ből)
export const loadFoglalasok = async () => {
    try {
      const storedFoglalasok = localStorage.getItem('foglalasok');
      return storedFoglalasok ? JSON.parse(storedFoglalasok) : [];
    } catch (error) {
      console.error('Hiba a foglalások betöltésekor:', error);
      throw error;
    }
  };
  
  export const addFoglalas = async (ujFoglalas) => {
    try {
      const foglalasok = await loadFoglalasok();
      const updatedFoglalasok = [...foglalasok, ujFoglalas];
  
      localStorage.setItem('foglalasok', JSON.stringify(updatedFoglalasok));
      return ujFoglalas;
    } catch (error) {
      console.error('Hiba a foglalás hozzáadásakor:', error);
      throw error;
    }
  };


/* REST API hívások kezelése

const API_URL = '/foglalasok.json';

// Foglalások lekérése (GET)
export const getFoglalasok = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Nem sikerült betölteni a foglalásokat.');
    }
    return await response.json();
  } catch (error) {
    console.error('Hiba a foglalások betöltésekor:', error);
    throw error;
  }
};

// Új foglalás hozzáadása (POST szimuláció)
export const addFoglalas = async (ujFoglalas) => {
  try {
    console.log('Új foglalás elküldése:', ujFoglalas);

    // Mivel nincs valódi backend, csak logoljuk az új foglalást
    alert('Foglalás sikeresen hozzáadva!');

    return ujFoglalas;
  } catch (error) {
    console.error('Hiba a foglalás hozzáadásakor:', error);
    throw error;
  }
};

*/
