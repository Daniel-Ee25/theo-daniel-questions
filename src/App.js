import React, { useEffect, useState } from 'react';
import './App.css';
import fragenArray from './fragen'; // external question array instead of txt because txt is not working

/* simple app for fun. please don't mess with it, thx! */

function App() {
  const [fragen, setFragen] = useState(fragenArray); // set questions from imported array
  const [aktuelleFrage, setAktuelleFrage] = useState('');
  const [verbleibendeFragen, setVerbleibendeFragen] = useState(fragenArray); // question left
  const [spieler, setSpieler] = useState([]); 
  const [aktuellerSpieler, setAktuellerSpieler] = useState(null); 
  const [spielerName, setSpielerName] = useState(''); 
  const [isMitspielerMenuOpen, setMitspielerMenuOpen] = useState(false); 

  useEffect(() => {
    if (fragen.length > 0) {
      setAktuelleFrage(fragen[Math.floor(Math.random() * fragen.length)]);
    }
  }, [fragen]);

  const zeigeFrage = () => {
    if (verbleibendeFragen.length > 1) {
      const randomIndex = Math.floor(Math.random() * verbleibendeFragen.length);
      const neueFrage = verbleibendeFragen[randomIndex];
      setAktuelleFrage(neueFrage);
      setVerbleibendeFragen(verbleibendeFragen.filter(frage => frage !== neueFrage));

      if (spieler.length > 0) {
        const zufallsSpieler = spieler[Math.floor(Math.random() * spieler.length)];
        setAktuellerSpieler(zufallsSpieler);
      }
    } else if (verbleibendeFragen.length === 1) {
      setAktuelleFrage("Alle Fragen wurden beantwortet!");
      setVerbleibendeFragen([]);
    }
  };

  const resetFragen = () => {
    setVerbleibendeFragen(fragen);
    setAktuelleFrage(fragen[Math.floor(Math.random() * fragen.length)]);
  };

  const toggleMitspielerMenu = () => {
    setMitspielerMenuOpen(prevState => !prevState);
  };

  const addSpieler = () => {
    if (spielerName.trim()) {
      const neuerSpieler = { id: Date.now(), name: spielerName.trim() };
      setSpieler([...spieler, neuerSpieler]);
      setSpielerName('');
    }
  };

  const removeSpieler = (id) => {
    setSpieler(spieler.filter(s => s.id !== id));
    if (aktuellerSpieler && aktuellerSpieler.id === id) {
      setAktuellerSpieler(null);
    }
  };

  return (
    <div className="App">
      <h1>THEO's UND DANIEL's WUNDERBARE FRAGEN</h1>
      {aktuellerSpieler && (
        <p className="aktueller-spieler">{`${aktuellerSpieler.name}`}</p>
      )}
      <p>{verbleibendeFragen.length === 0 ? "Alle Fragen wurden beantwortet!" : aktuelleFrage}</p>
      <div className="button-container">
        <button
          onClick={zeigeFrage}
          disabled={verbleibendeFragen.length === 0}
          className={verbleibendeFragen.length === 0 ? 'disabled-button' : ''}
        >
          Nächste Frage
        </button>
        {verbleibendeFragen.length === 0 && (
          <button onClick={resetFragen} className="reload-button">
            Nochmal spielen
          </button>
        )}
        <button onClick={toggleMitspielerMenu} className="mitspieler-button">
          Mitspieler
        </button>
      </div>

      {isMitspielerMenuOpen && (
        <div className="mitspieler-menu">
          <h2>Mitspieler anpassen</h2>
          <input
            type="text"
            value={spielerName}
            onChange={(e) => setSpielerName(e.target.value)}
            placeholder="Neuen Spieler hinzufügen"
          />
          <button onClick={addSpieler} className="add-spieler-button">
            Spieler hinzufügen
          </button>
          <ul className="spieler-liste">
            {spieler.map((s) => (
              <li key={s.id}>
                {s.name}
                <button onClick={() => removeSpieler(s.id)} className="remove-spieler-button">
                  Entfernen
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
