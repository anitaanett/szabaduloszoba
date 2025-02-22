/* localStorage

import React, { useState, useEffect } from 'react';
import { loadFoglalasok } from '../api';

const FoglalasList = () => {
  const [foglalasok, setFoglalasok] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadFoglalasok();
        setFoglalasok(data);
      } catch (error) {
        console.error('Hiba a foglalások betöltésekor:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Foglalások listája</h2>
      <ul>
        {foglalasok.map((foglalas, index) => (
          <li key={index}>
            <strong>{foglalas.nev}</strong> - {foglalas.cim}, {foglalas.datum}
            <br />
            Létszám: {foglalas.fo}, Irányítószám: {foglalas.iranyitoszam}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoglalasList;

*/



// Firebase

import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const FoglalasList = () => {
  const [foglalasok, setFoglalasok] = useState([]);
  const [hiba, setHiba] = useState("");

  useEffect(() => {
    const getFoglalasok = async () => {
      try {
        const foglalasokCollection = collection(db, 'foglalasok');
        const foglalasokSnapshot = await getDocs(foglalasokCollection);
        const foglalasokList = foglalasokSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sortedFoglalasok = foglalasokList.sort((a, b) => new Date(b.datum) - new Date(a.datum));
        setFoglalasok(sortedFoglalasok);
      } catch (error) {
        console.error("Hiba a foglalások betöltésekor:", error);
        setHiba("Nem sikerült betölteni a foglalásokat. Kérlek próbáld újra!");
      }
    };

    getFoglalasok();
  }, []);

  const formatDatum = (isoDatum) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(isoDatum).toLocaleString('hu-HU', options);
  };

  return (
    <div className="container mt-4">
      <h2>Foglalások listája</h2>
      {hiba && <p className="alert alert-danger">{hiba}</p>}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Dátum</th>
              <th>Név</th>
              <th>Létszám</th>
              <th>Helyszín</th>
              <th>Irányítószám</th>
            </tr>
          </thead>
          <tbody>
            {foglalasok.length === 0 ? (
              <tr><td colSpan="5">Nincsenek elérhető foglalások.</td></tr>
            ) : (
              foglalasok.map(foglalas => (
                <tr key={foglalas.id}>
                  <td>{formatDatum(foglalas.datum)}</td>
                  <td>{foglalas.nev}</td>
                  <td>{foglalas.fo}</td>
                  <td>{foglalas.cim}</td>
                  <td>{foglalas.iranyitoszam}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoglalasList;
