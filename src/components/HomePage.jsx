import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4" style={{ fontFamily: "'Lacquer', cursive" }}>
          A Kísértetjárta Gyerekszoba
        </h1>

        <p className="lead mt-4">
          Egy elhagyatott ház mélyén, a poros falak mögött rejtőzik egy szoba, amelyet már évek óta senki sem mert megközelíteni. 
          A legenda szerint egy kislány élt itt, aki rejtélyes körülmények között tűnt el… Azóta a szoba lakói nem mások, mint 
          a falak mögül suttogó hangok, nyikorgó játékok és kísérteties babák, amelyek mintha mindig figyelnének.
        </p>

        <p>
          Amikor belépsz a szobába, az ajtó hangos csattanással záródik mögötted – nincs visszaút. Csak akkor szabadulhatsz, ha 
          megfejted a rejtélyeket, és feltárod a kislány eltűnésének sötét titkát. De vigyázz! Az időd véges, és minden egyes perccel 
          egyre közelebb kerül hozzád… valami.
        </p>

        <p>
          💀 <strong>Feladatod:</strong> Gyűjtsd össze a nyomokat, fejtsd meg a titkos kódokat, és derítsd ki, mi történt az egykori lakóval, 
          mielőtt túl késő lenne… Ha nem sikerül időben kijutni, örökre a szoba foglya maradsz!
        </p>

        <p className="fw-bold text-danger">
          🔐 Készen állsz a rettegésre? Foglalj most, és tudd meg, képes vagy-e szembenézni a Kísértetjárta Gyerekszoba rémisztő titkaival!
        </p>

        <img
          src="/jatek.jpg"
          alt="Kísérteties gyerekszoba"
          className="img-fluid rounded shadow-lg mt-4"
        />

        <div className="mt-5">
          <Link to="/foglalasok" className="btn btn-danger btn-lg me-3">
            🔍 Foglalások listázása
          </Link>
          <Link to="/ujfoglalas" className="btn btn-dark btn-lg">
            ➕ Új foglalás felvétele
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
