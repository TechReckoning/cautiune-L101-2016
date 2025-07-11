import React, { useState } from "react";
import './App.css'

const Step1: React.FC<{
  data: Step1Data;
  onChange: (data: Step1Data) => void;
}> = ({ data, onChange }) => {
  // Funcție pentru a valida și converti inputul
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/^0+/, "");
    // Înlocuiesc virgula cu punct pentru zecimale
    val = val.replace(/,/g, ".");
    // Permit doar cifre și un singur punct zecimal
    val = val.replace(/[^0-9.]/g, "");
    // Nu permit mai mult de un punct zecimal
    const parts = val.split('.');
    if (parts.length > 2) {
      val = parts[0] + '.' + parts.slice(1).join('');
    }
    onChange({ ...data, valoare: val });
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 500 }}>
          Procedura de atribuire are ca obiect:
        </label>
        <div style={{ marginTop: 8 }}>
          <label style={{ marginRight: 24 }}>
            <input
              type="radio"
              name="tipProcedura"
              value="contract"
              checked={data.tipProcedura === "contract"}
              onChange={() =>
                onChange({ tipProcedura: "contract", peLoturi: undefined, valoare: "" })
              }
            />
            Contract
          </label>
          <label>
            <input
              type="radio"
              name="tipProcedura"
              value="acord-cadru"
              checked={data.tipProcedura === "acord-cadru"}
              onChange={() =>
                onChange({ tipProcedura: "acord-cadru", peLoturi: undefined, valoare: "" })
              }
            />
            Acord-cadru
          </label>
        </div>
      </div>
      {data.tipProcedura && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 500 }}>
            Procedura de atribuire este împărțită pe loturi?
          </label>
          <div style={{ marginTop: 8 }}>
            <label style={{ marginRight: 24 }}>
              <input
                type="radio"
                name="peLoturi"
                value="nu"
                checked={data.peLoturi === false}
                onChange={() =>
                  onChange({ ...data, peLoturi: false, valoare: "" })
                }
              />
              Nu
            </label>
            <label>
              <input
                type="radio"
                name="peLoturi"
                value="da"
                checked={data.peLoturi === true}
                onChange={() =>
                  onChange({ ...data, peLoturi: true, valoare: "" })
                }
              />
              Da
            </label>
          </div>
        </div>
      )}
      {data.tipProcedura && data.peLoturi !== undefined && (
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>
            {data.tipProcedura === "contract"
              ? data.peLoturi
                ? "Introduceți Valoarea Estimată a Contractului pentru Lotul Contestat"
                : "Introduceți Valoarea Estimată a Contractului indicată în Fișa de Date"
              : data.peLoturi
                ? "Introduceți Valoarea Estimată a Contractului reprezentând Dublul Valorii Estimate a Celui Mai Mare Contract Subsecvent pentru Lotul Contestat"
                : "Introduceți Valoarea Estimată a Contractului reprezentând Dublul Valorii Estimate a Celui Mai Mare Contract Subsecvent"
            }
          </label>
          <input
            type="text"
            inputMode="decimal"
            min={0}
            value={data.valoare}
            onChange={handleValueChange}
            style={{ width: 260, padding: 8, fontSize: 16, border: "1px solid #ccc", borderRadius: 4 }}
            placeholder="ex: 1000000.50"
            autoComplete="off"
          />
          <div style={{ fontSize: 13, color: "#444", marginTop: 4 }}>
            Introduceți valoarea doar cu cifre, fără puncte sau spații pentru mii. Se acceptă zecimale cu punct sau virgulă. Exemplu: 1000000.50 sau 1000000,50
          </div>
          {/* Mesaje informative */}
          {data.tipProcedura === "contract" && data.peLoturi && (
            <div style={{ fontSize: 13, marginTop: 8, color: "#222" }}>
              Conform, art. 61 ind. 1 alin. (2 ind. 1) din Legea nr. 101/2016, care prevede că, în cazul unei proceduri de atribuire împărţite pe loturi, calculul cauțiunii se raportează la valoarea estimată a fiecărui lot contestat.
            </div>
          )}
          {data.tipProcedura === "acord-cadru" && !data.peLoturi && (
            <div style={{ fontSize: 13, marginTop: 8, color: "#222" }}>
              Conform, art. 61 ind. 1 alin. (2) din Legea nr. 101/2016, care prevede că, în cazul unei proceduri de atribuire a acordului-cadru, calculul cauțiunii se raportează la dublul valorii estimate a celui mai mare contract subsecvent ce se intenţionează a se atribui în baza acordului-cadru respectiv.
            </div>
          )}
          {data.tipProcedura === "acord-cadru" && data.peLoturi && (
            <div style={{ fontSize: 13, marginTop: 8, color: "#222" }}>
              Conform, art. 61 ind. 1 alin. (2 ind. 2) din Legea nr. 101/2016, care prevede că, în cazul în care procedura de atribuire a acordului-cadru este organizată pe loturi, calculul cauțiunii se raportează la dublul valorii estimate a celui mai mare contract subsecvent ce se intenţionează a se atribui în baza acordului-cadru respectiv aferent fiecărui lot contestat.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Tipuri pentru starea Pasului 1
interface Step1Data {
  tipProcedura?: "contract" | "acord-cadru";
  peLoturi?: boolean;
  valoare: string; // păstrăm ca string pentru input controlat
}

const Step2: React.FC<{
  data: Step2Data;
  onChange: (data: Step2Data) => void;
}> = ({ data, onChange }) => {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 500 }}>
          Cauțiunea este calculată pentru:
        </label>
        <div style={{ marginTop: 8 }}>
          <label style={{ marginRight: 24 }}>
            <input
              type="radio"
              name="tipContestatie"
              value="documentatie"
              checked={data.tipContestatie === "documentatie"}
              onChange={() => onChange({ tipContestatie: "documentatie" })}
            />
            Contestație privind documentația de atribuire
          </label>
          <label>
            <input
              type="radio"
              name="tipContestatie"
              value="rezultat"
              checked={data.tipContestatie === "rezultat"}
              onChange={() => onChange({ tipContestatie: "rezultat" })}
            />
            Contestație privind rezultatul procedurii de atribuire
          </label>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "#222" }}>
        Conform, art. 61 ind. 1 alin. (1) din Legea nr. 101/2016, potrivit căruia valoarea-limită maximă a cauțiunii este diferită în funcție de momentul procedurii de atribuire la care este formulată contestația.
      </div>
    </div>
  );
};

interface Step2Data {
  tipContestatie?: "documentatie" | "rezultat";
}

const Step3_1: React.FC<{
  data: Step3_1Data;
  onChange: (data: Step3_1Data) => void;
}> = ({ data, onChange }) => {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 500 }}>
          Cauțiunea este calculată pentru o procedură organizată în baza cărei legi?
        </label>
        <div style={{ marginTop: 8 }}>
          <label style={{ marginRight: 24 }}>
            <input
              type="radio"
              name="lege"
              value="98"
              checked={data.lege === "98"}
              onChange={() => onChange({ lege: "98" })}
            />
            Legea nr. 98/2016
          </label>
          <label style={{ marginRight: 24 }}>
            <input
              type="radio"
              name="lege"
              value="99"
              checked={data.lege === "99"}
              onChange={() => onChange({ lege: "99" })}
            />
            Legea nr. 99/2016
          </label>
          <label>
            <input
              type="radio"
              name="lege"
              value="100"
              checked={data.lege === "100"}
              onChange={() => onChange({ lege: "100" })}
            />
            Legea nr. 100/2016
          </label>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "#222" }}>
        Conform, art. 61 ind. 1 alin. (1) din Legea nr. 101/2016, potrivit căruia pragurile valorice în funcție de care se stabilește valoarea-limită maximă a cauțiunii depind de legea aplicabilă procedurii de atribuire - fie Legea nr. 98/2016, fie Legea nr. 99/2016, fie Legea nr. 100/2016.
      </div>
    </div>
  );
};

interface Step3_1Data {
  lege?: "98" | "99" | "100";
}

const praguri98 = [
  {
    value: "27334460",
    label:
      "27.334.460 lei, pentru contractele de achiziţie publică/acordurile-cadru de lucrări",
  },
  {
    value: "705819",
    label:
      "705.819 lei, pentru contractele de achiziţie publică/acordurile-cadru de produse şi de servicii",
  },
  {
    value: "1090812",
    label:
      "1.090.812 lei, pentru contractele de achiziţii publice/acordurile-cadru de produse şi de servicii atribuite de consiliul judeţean, consiliul local, Consiliul General al Municipiului Bucureşti, precum şi de instituţiile publice aflate în subordinea acestora",
  },
  {
    value: "3701850",
    label:
      "3.701.850 lei, pentru contractele de achiziţie publică/acordurile-cadru de servicii care au ca obiect servicii sociale şi alte servicii specifice, prevăzute în anexa nr. 2.",
  },
];

const praguri99 = [
  {
    value: "2186559",
    label:
      "2.186.559 lei, pentru contractele sectoriale de produse şi de servicii, precum şi pentru concursurile de soluţii",
  },
  {
    value: "27334460",
    label:
      "27.334.460 lei, pentru contractele sectoriale de lucrări",
  },
  {
    value: "4935800",
    label:
      "4.935.800 lei, pentru contractele sectoriale de servicii care au ca obiect servicii sociale şi alte servicii specifice, prevăzute în anexa nr. 2.",
  },
];

const Step3_2: React.FC<{
  lege: "98" | "99" | "100" | undefined;
  data: Step3_2Data;
  onChange: (data: Step3_2Data) => void;
}> = ({ lege, data, onChange }) => {
  if (!lege) return null;
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>
          Prag valoric aplicabil:
        </label>
        {lege === "98" && (
          <div>
            {praguri98.map((prag) => (
              <label key={prag.value} style={{ display: "block", marginBottom: 6 }}>
                <input
                  type="radio"
                  name="prag"
                  value={prag.value}
                  checked={data.prag === prag.value}
                  onChange={() => onChange({ prag: prag.value })}
                />
                {prag.label}
              </label>
            ))}
            <div style={{ fontSize: 13, color: "#222", marginTop: 8 }}>
              Pragurile valorice prevăzute la art. 7 alin. (1) din Legea nr. 98/2016.
            </div>
          </div>
        )}
        {lege === "99" && (
          <div>
            {praguri99.map((prag) => (
              <label key={prag.value} style={{ display: "block", marginBottom: 6 }}>
                <input
                  type="radio"
                  name="prag"
                  value={prag.value}
                  checked={data.prag === prag.value}
                  onChange={() => onChange({ prag: prag.value })}
                />
                {prag.label}
              </label>
            ))}
            <div style={{ fontSize: 13, color: "#222", marginTop: 8 }}>
              Pragurile valorice prevăzute la art. 12 alin. (1) din Legea nr. 99/2016.
            </div>
          </div>
        )}
        {lege === "100" && (
          <div>
            <label style={{ display: "block", marginBottom: 6 }}>
              <input
                type="radio"
                name="prag"
                value="27334460"
                checked={data.prag === "27334460"}
                readOnly
              />
              27.334.460 lei pentru concesiuni de lucrări sau servicii
            </label>
            <div style={{ fontSize: 13, color: "#222", marginTop: 8 }}>
              Pragurile valorice prevăzute la art. 12 alin. (1) din Legea nr. 99/2016.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface Step3_2Data {
  prag?: string;
}

const calcPlafon = (
  valoare: number,
  prag: number,
  tipContestatie: "documentatie" | "rezultat"
) => {
  if (valoare < prag) {
    return tipContestatie === "documentatie" ? 35000 : 88000;
  } else {
    return tipContestatie === "documentatie" ? 220000 : 2000000;
  }
};

const App: React.FC = () => {
  // Stare pentru Pasul 1
  const [step1, setStep1] = useState<Step1Data>({ valoare: "" });
  // Stare pentru pașii următori (vor fi adăugați ulterior)
  const [step2, setStep2] = useState<Step2Data>({});
  const [step3_1, setStep3_1] = useState<Step3_1Data>({});
  const [step3_2, setStep3_2] = useState<Step3_2Data>({});
  const [result, setResult] = useState<null | { provizorie: number; plafon: number; finala: number; explanation: string }> (null);

  // Resetăm pașii următori dacă se schimbă ceva la step1
  const handleStep1Change = (data: Step1Data) => {
    setStep1(data);
    setStep2({}); // resetăm step2 dacă se schimbă step1
    setStep3_1({}); // resetăm step3_1 dacă se schimbă step1
    setStep3_2({}); // resetăm step3_2 dacă se schimbă step1
    // aici vom reseta și pașii următori când îi adăugăm
  };

  // Resetăm pașii următori dacă se schimbă step2
  const handleStep2Change = (data: Step2Data) => {
    setStep2(data);
    setStep3_1({}); // resetăm step3_1 dacă se schimbă step2
    setStep3_2({}); // resetăm step3_2 dacă se schimbă step2
    // aici vom reseta și pașii următori când îi adăugăm
  };

  // Resetăm pașii următori dacă se schimbă step3_1
  const handleStep3_1Change = (data: Step3_1Data) => {
    setStep3_1(data);
    setStep3_2({}); // resetăm step3_2 dacă se schimbă step3_1
    // aici vom reseta și pașii următori când îi adăugăm
  };

  // Resetăm pașii următori dacă se schimbă step3_2
  const handleStep3_2Change = (data: Step3_2Data) => {
    setStep3_2(data);
    // aici vom reseta și pașii următori când îi adăugăm
  };

  // Condiție de completare Pas 1
  const isStep1Complete =
    !!step1.tipProcedura &&
    step1.peLoturi !== undefined &&
    !!step1.valoare &&
    !isNaN(Number(step1.valoare)) &&
    Number(step1.valoare) > 0;

  // Condiție de completare Pas 2
  const isStep2Complete = !!step2.tipContestatie;

  // Condiție de completare Pas 3.1
  const isStep3_1Complete = !!step3_1.lege;

  // Condiție de completare Pas 3.2
  const isStep3_2Complete = !!step3_2.prag;

  // Setare automată prag pentru legea 100
  React.useEffect(() => {
    if (step3_1.lege && step3_1.lege.toString() === "100") {
      setStep3_2({ prag: "27334460" });
    } else if (step3_2.prag === "27334460" && step3_1.lege && step3_1.lege.toString() !== "100") {
      setStep3_2({ prag: undefined });
    }
    // eslint-disable-next-line
  }, [step3_1.lege]);

  // Resetăm rezultatul dacă se modifică orice pas anterior
  React.useEffect(() => {
    setResult(null);
    // eslint-disable-next-line
  }, [step1, step2, step3_1, step3_2]);

  // Calcul cauțiune la click
  const handleCalc = () => {
    const valoare = parseFloat(step1.valoare.replace(/,/g, '.'));
    const prag = Number(step3_2.prag);
    const provizorie = +(valoare * 0.02).toFixed(2);
    const plafon = calcPlafon(valoare, prag, step2.tipContestatie!);
    const finala = Math.min(provizorie, plafon);
    let explanation = "";
    if (provizorie > plafon) {
      explanation = `Cauțiunea provizorie (${provizorie.toLocaleString('ro-RO', {minimumFractionDigits: 2, maximumFractionDigits: 2})} lei) depășește plafonul maxim aplicabil (${plafon.toLocaleString('ro-RO')} lei), deci cauțiunea finală este plafonată.`;
    } else {
      explanation = `Cauțiunea provizorie (${provizorie.toLocaleString('ro-RO', {minimumFractionDigits: 2, maximumFractionDigits: 2})} lei) este sub plafonul maxim aplicabil (${plafon.toLocaleString('ro-RO')} lei), deci cauțiunea finală este egală cu cea provizorie.`;
    }
    setResult({ provizorie, plafon, finala, explanation });
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: 32 }}>
        Calculator Cauțiune - Legea nr. 101/2016
      </h1>
      <Step1 data={step1} onChange={handleStep1Change} />
      {isStep1Complete && (
        <Step2 data={step2} onChange={handleStep2Change} />
      )}
      {isStep1Complete && isStep2Complete && (
        <Step3_1 data={step3_1} onChange={handleStep3_1Change} />
      )}
      {isStep1Complete && isStep2Complete && isStep3_1Complete && (
        <Step3_2 lege={step3_1.lege} data={step3_2} onChange={handleStep3_2Change} />
      )}
      {isStep1Complete && isStep2Complete && isStep3_1Complete && isStep3_2Complete && (
        <button
          style={{
            background: "#fff",
            color: "#000",
            border: "2px solid #000",
            borderRadius: 4,
            padding: "12px 32px",
            fontWeight: 700,
            fontSize: 18,
            cursor: "pointer",
            marginBottom: 32,
            marginTop: 8,
            fontFamily: 'Montserrat, sans-serif',
          }}
          onClick={handleCalc}
        >
          Calculează Cauțiunea
        </button>
      )}
      {result && (
        <div style={{
          background: "#fff",
          color: "#000",
          border: "1px solid #000",
          borderRadius: 4,
          padding: 24,
          marginTop: 16,
          fontFamily: 'Montserrat, sans-serif',
        }}>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>
            Cauțiunea finală: {result.finala.toLocaleString('ro-RO', {minimumFractionDigits: 2, maximumFractionDigits: 2})} lei
          </div>
          <div style={{ fontSize: 16, marginBottom: 8 }}>
            Cauțiune provizorie: {result.provizorie.toLocaleString('ro-RO', {minimumFractionDigits: 2, maximumFractionDigits: 2})} lei
          </div>
          <div style={{ fontSize: 16, marginBottom: 8 }}>
            Plafon maxim aplicabil: {result.plafon.toLocaleString('ro-RO')} lei
          </div>
          <div style={{ fontSize: 14, color: "#222", marginTop: 8 }}>
            {result.explanation}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
