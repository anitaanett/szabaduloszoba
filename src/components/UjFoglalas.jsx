/* localStorage

import React, { useState } from 'react';
import { addFoglalas } from '../api';

const UjFoglalas = () => {
  const [foglalas, setFoglalas] = useState({
    cim: '',
    datum: '',
    fo: '',
    iranyitoszam: '',
    nev: '',
  });
  const [uzenet, setUzenet] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoglalas({ ...foglalas, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addFoglalas(foglalas);
      setUzenet('Sikeresen hozzáadtad a foglalást!');
      setFoglalas({
        cim: '',
        datum: '',
        fo: '',
        iranyitoszam: '',
        nev: '',
      });
    } catch (error) {
      console.error('Hiba a foglalás mentésekor:', error);
      setUzenet('Hiba történt a foglalás mentése során!');
    }
  };
  
  return (
    <div>
      <h2>Új Foglalás Létrehozása</h2>
      {uzenet && <p>{uzenet}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cím:</label>
          <input
            type="text"
            name="cim"
            value={foglalas.cim}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Dátum:</label>
          <input
            type="datetime-local"
            name="datum"
            value={foglalas.datum}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Létszám:</label>
          <input
            type="number"
            name="fo"
            value={foglalas.fo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Irányítószám:</label>
          <input
            type="text"
            name="iranyitoszam"
            value={foglalas.iranyitoszam}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Név:</label>
          <input
            type="text"
            name="nev"
            value={foglalas.nev}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Foglalás hozzáadása</button>
      </form>
    </div>
  );
};

export default UjFoglalas;

*/

// Firebase

import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const UjFoglalas = () => {
  const [foglalas, setFoglalas] = useState({
    cim: '',
    datum: '',
    fo: '',
    iranyitoszam: '',
    nev: '',
  });
  const [uzenet, setUzenet] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoglalas((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(foglalas.fo) < 2 || parseInt(foglalas.fo) > 16) {
      setUzenet('A létszámnak 2 és 16 között kell lennie.');
      return;
    }

    try {
      const foglalasokRef = collection(db, 'foglalasok');
      await addDoc(foglalasokRef, {
        ...foglalas,
        datum: new Date(foglalas.datum).toISOString(),
      });
      setUzenet('Foglalás sikeresen hozzáadva!');
      setFoglalas({
        cim: '',
        datum: '',
        fo: '',
        iranyitoszam: '',
        nev: '',
      });

      setTimeout(() => navigate('/foglalasok'), 1500);
    } catch (error) {
      console.error('Hiba történt a foglalás hozzáadása közben:', error);
      setUzenet('Hiba történt a foglalás mentése közben. Kérlek, próbáld újra!');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Új Foglalás Létrehozása</h2>
      {uzenet && <p className="alert alert-info">{uzenet}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Cím:</label>
          <input
            type="text"
            name="cim"
            value={foglalas.cim}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Dátum:</label>
          <input
            type="datetime-local"
            name="datum"
            value={foglalas.datum}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Létszám:</label>
          <input
            type="number"
            min="2"
            max="16"
            name="fo"
            value={foglalas.fo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Irányítószám:</label>
          <input
            type="text"
            name="iranyitoszam"
            value={foglalas.iranyitoszam}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Név:</label>
          <input
            type="text"
            name="nev"
            value={foglalas.nev}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Foglalás hozzáadása
        </button>
      </form>
    </div>
  );
};

export default UjFoglalas;

