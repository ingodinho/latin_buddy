import "./ReferenceScreen.css";
import { CASES, PERSONS, NUMBERS, DECLENSION_LABELS, CONJUGATION_LABELS, ADJECTIVE_DECLENSION_LABELS, GENDER_LABELS } from "../data/constants";
import { NOUNS } from "../data/nouns";
import { VERBS } from "../data/verbs";
import { ADJECTIVES } from "../data/adjectives";

function NounTable({ noun }) {
  return (
    <div className="ref__table-wrap">
      <h4 className="ref__word-title">
        {noun.lemma} <span className="ref__word-meta">({noun.translation}, {GENDER_LABELS[noun.gender]})</span>
      </h4>
      <table className="ref__table">
        <thead>
          <tr>
            <th></th>
            {NUMBERS.map((n) => <th key={n}>{n}</th>)}
          </tr>
        </thead>
        <tbody>
          {CASES.map((c) => (
            <tr key={c}>
              <td className="ref__row-label">{c}</td>
              {NUMBERS.map((n) => <td key={n}>{noun.forms[c][n]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VerbTable({ verb }) {
  return (
    <div className="ref__table-wrap">
      <h4 className="ref__word-title">
        {verb.lemma} <span className="ref__word-meta">({verb.translation})</span>
      </h4>
      <table className="ref__table">
        <thead>
          <tr>
            <th></th>
            {NUMBERS.map((n) => <th key={n}>{n}</th>)}
          </tr>
        </thead>
        <tbody>
          {PERSONS.map((p) => (
            <tr key={p}>
              <td className="ref__row-label">{p}. Person</td>
              {NUMBERS.map((n) => <td key={n}>{verb.forms[p][n]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdjectiveTable({ adj }) {
  return (
    <div className="ref__table-wrap">
      <h4 className="ref__word-title">
        {adj.lemma} <span className="ref__word-meta">({adj.translation})</span>
      </h4>
      {["m", "f", "n"].map((g) => (
        <div key={g} className="ref__gender-block">
          <h5 className="ref__gender-title">{GENDER_LABELS[g]}</h5>
          <table className="ref__table">
            <thead>
              <tr>
                <th></th>
                {NUMBERS.map((n) => <th key={n}>{n}</th>)}
              </tr>
            </thead>
            <tbody>
              {CASES.map((c) => (
                <tr key={c}>
                  <td className="ref__row-label">{c}</td>
                  {NUMBERS.map((n) => <td key={n}>{adj.forms[g][c][n]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function groupBy(items, keyFn) {
  const groups = {};
  for (const item of items) {
    const key = keyFn(item);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  }
  return groups;
}

export default function ReferenceScreen({ onBack }) {
  const nounsByDecl = groupBy(NOUNS, (n) => n.declension);
  const verbsByConj = groupBy(VERBS, (v) => v.conjugation);
  const adjsByDecl = groupBy(ADJECTIVES, (a) => a.declension);

  return (
    <div className="ref">
      <button className="ref__back" onClick={onBack}>
        ← Zurück
      </button>

      <h2 className="ref__section-title">Deklinationen</h2>
      {Object.entries(nounsByDecl).map(([decl, nouns]) => (
        <div key={decl} className="ref__group">
          <h3 className="ref__group-title">{DECLENSION_LABELS[decl]}</h3>
          {nouns.map((noun) => <NounTable key={noun.id} noun={noun} />)}
        </div>
      ))}

      <h2 className="ref__section-title">Konjugationen (Präsens)</h2>
      {Object.entries(verbsByConj).map(([conj, verbs]) => (
        <div key={conj} className="ref__group">
          <h3 className="ref__group-title">{CONJUGATION_LABELS[conj]}</h3>
          {verbs.map((verb) => <VerbTable key={verb.id} verb={verb} />)}
        </div>
      ))}

      <h2 className="ref__section-title">Adjektive</h2>
      {Object.entries(adjsByDecl).map(([decl, adjs]) => (
        <div key={decl} className="ref__group">
          <h3 className="ref__group-title">{ADJECTIVE_DECLENSION_LABELS[decl]}</h3>
          {adjs.map((adj) => <AdjectiveTable key={adj.id} adj={adj} />)}
        </div>
      ))}
    </div>
  );
}
