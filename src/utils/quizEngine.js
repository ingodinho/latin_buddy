import { CASES, NUMBERS, PERSONS, DECLENSION_LABELS, CONJUGATION_LABELS, ADJECTIVE_DECLENSION_LABELS, GENDER_LABELS } from "../data/constants";
import { NOUNS } from "../data/nouns";
import { VERBS } from "../data/verbs";
import { ADJECTIVES } from "../data/adjectives";
import { SENTENCES } from "../data/sentences";
import { ABLATIVE_PREP_SENTENCES, ABLATIVE_PREPOSITIONS_INFO } from "../data/ablativePrepositions";
import { QUESTION_WORD_SENTENCES } from "../data/questionWords";

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickNounDistractors(word, correctCase, correctNumber, count = 3) {
  const correctForm = word.forms[correctCase][correctNumber];
  const pool = new Set();

  for (const c of CASES) {
    for (const n of NUMBERS) {
      const form = word.forms[c][n];
      if (form !== correctForm) pool.add(form);
    }
  }

  return shuffle([...pool]).slice(0, count);
}

function pickVerbDistractors(verb, correctPerson, correctNumber, count = 3) {
  const correctForm = verb.forms[correctPerson][correctNumber];
  const pool = new Set();

  for (const p of PERSONS) {
    for (const n of NUMBERS) {
      const form = verb.forms[p][n];
      if (form !== correctForm) pool.add(form);
    }
  }

  return shuffle([...pool]).slice(0, count);
}

function pickAdjectiveDistractors(adj, correctGender, correctCase, correctNumber, count = 3) {
  const correctForm = adj.forms[correctGender][correctCase][correctNumber];
  const pool = new Set();

  for (const g of ["m", "f", "n"]) {
    for (const c of CASES) {
      for (const n of NUMBERS) {
        const form = adj.forms[g][c][n];
        if (form !== correctForm) pool.add(form);
      }
    }
  }

  return shuffle([...pool]).slice(0, count);
}

function generateNounQuestions(count) {
  const seen = new Set();
  const questions = [];
  let attempts = 0;

  while (questions.length < count && attempts < count * 10) {
    attempts++;
    const word = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const caseName = CASES[Math.floor(Math.random() * CASES.length)];
    const number = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];

    const key = `noun-${word.id}-${caseName}-${number}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const correctAnswer = word.forms[caseName][number];
    const distractors = pickNounDistractors(word, caseName, number, 3);
    if (distractors.length < 3) continue;

    questions.push({
      id: key,
      word,
      correctAnswer,
      options: shuffle([correctAnswer, ...distractors]),
      prompt: `Wie lautet der ${caseName} ${number} von „${word.lemma}"?`,
      grammarInfo: {
        label: DECLENSION_LABELS[word.declension],
        gender: GENDER_LABELS[word.gender],
      },
    });
  }

  return questions;
}

function generateVerbQuestions(count) {
  const seen = new Set();
  const questions = [];
  let attempts = 0;

  while (questions.length < count && attempts < count * 10) {
    attempts++;
    const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
    const person = PERSONS[Math.floor(Math.random() * PERSONS.length)];
    const number = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];

    const key = `verb-${verb.id}-${person}-${number}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const correctAnswer = verb.forms[person][number];
    const distractors = pickVerbDistractors(verb, person, number, 3);
    if (distractors.length < 3) continue;

    questions.push({
      id: key,
      word: verb,
      correctAnswer,
      options: shuffle([correctAnswer, ...distractors]),
      prompt: `Wie lautet die ${person}. Person ${number} Präsens von „${verb.lemma}"?`,
      grammarInfo: {
        label: CONJUGATION_LABELS[verb.conjugation],
      },
    });
  }

  return questions;
}

function generateAdjectiveQuestions(count) {
  const seen = new Set();
  const questions = [];
  let attempts = 0;
  const genders = ["m", "f", "n"];

  while (questions.length < count && attempts < count * 10) {
    attempts++;
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const caseName = CASES[Math.floor(Math.random() * CASES.length)];
    const number = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];

    const key = `adj-${adj.id}-${gender}-${caseName}-${number}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const correctAnswer = adj.forms[gender][caseName][number];
    const distractors = pickAdjectiveDistractors(adj, gender, caseName, number, 3);
    if (distractors.length < 3) continue;

    questions.push({
      id: key,
      word: adj,
      correctAnswer,
      options: shuffle([correctAnswer, ...distractors]),
      prompt: `Wie lautet der ${caseName} ${number} ${GENDER_LABELS[gender]} von „${adj.lemma}"?`,
      grammarInfo: {
        label: ADJECTIVE_DECLENSION_LABELS[adj.declension],
        gender: GENDER_LABELS[gender],
      },
    });
  }

  return questions;
}

function generateSentenceQuestions(count) {
  const pool = [];
  for (const sentence of SENTENCES) {
    for (const qw of sentence.quizzableWords) {
      pool.push({ sentence, quizzableWord: qw });
    }
  }

  const seen = new Set();
  const questions = [];
  const shuffled = shuffle(pool);

  for (const entry of shuffled) {
    if (questions.length >= count) break;

    const { sentence, quizzableWord } = entry;
    const key = `sent-${sentence.id}-${quizzableWord.form}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const correctAnswer = quizzableWord.case;
    const distractors = shuffle(CASES.filter((c) => c !== correctAnswer)).slice(0, 3);

    questions.push({
      id: key,
      word: { lemma: quizzableWord.lemma, translation: sentence.translation, wordType: "sentence" },
      correctAnswer,
      options: shuffle([correctAnswer, ...distractors]),
      prompt: `„${sentence.latin}"\n\nWelcher Kasus ist „${quizzableWord.form}"?`,
      grammarInfo: {
        label: DECLENSION_LABELS[quizzableWord.declension],
        gender: GENDER_LABELS[quizzableWord.gender],
      },
    });
  }

  return questions;
}

function generateGenitiveSentenceQuestions(count) {
  const pool = [];
  for (const sentence of SENTENCES) {
    for (const qw of sentence.quizzableWords) {
      if (qw.case === "Genitiv") {
        pool.push({ sentence, quizzableWord: qw });
      }
    }
  }

  const seen = new Set();
  const questions = [];
  const shuffled = shuffle(pool);

  for (const entry of shuffled) {
    if (questions.length >= count) break;

    const { sentence, quizzableWord } = entry;
    const key = `gen-${sentence.id}-${quizzableWord.form}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const correctAnswer = quizzableWord.case;
    const distractors = shuffle(CASES.filter((c) => c !== correctAnswer)).slice(0, 3);

    questions.push({
      id: key,
      word: { lemma: quizzableWord.lemma, translation: sentence.translation, wordType: "sentence" },
      correctAnswer,
      options: shuffle([correctAnswer, ...distractors]),
      prompt: `\u201E${sentence.latin}\u201C\n\nWelcher Kasus ist \u201E${quizzableWord.form}\u201C?`,
      grammarInfo: {
        label: DECLENSION_LABELS[quizzableWord.declension],
        gender: GENDER_LABELS[quizzableWord.gender],
      },
    });
  }

  return questions;
}

function generateAblativeSentenceQuestions(count) {
  const pool = [];
  for (const sentence of SENTENCES) {
    for (const qw of sentence.quizzableWords) {
      if (qw.case === "Ablativ") {
        pool.push({ sentence, quizzableWord: qw });
      }
    }
  }

  const seen = new Set();
  const questions = [];
  const shuffled = shuffle(pool);

  for (const entry of shuffled) {
    if (questions.length >= count) break;

    const { sentence, quizzableWord } = entry;
    const key = `abl-${sentence.id}-${quizzableWord.form}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const correctAnswer = quizzableWord.case;
    const distractors = shuffle(CASES.filter((c) => c !== correctAnswer)).slice(0, 3);

    questions.push({
      id: key,
      word: { lemma: quizzableWord.lemma, translation: sentence.translation, wordType: "sentence" },
      correctAnswer,
      options: shuffle([correctAnswer, ...distractors]),
      prompt: `\u201E${sentence.latin}\u201C\n\nWelcher Kasus ist \u201E${quizzableWord.form}\u201C?`,
      grammarInfo: {
        label: DECLENSION_LABELS[quizzableWord.declension],
        gender: GENDER_LABELS[quizzableWord.gender],
      },
    });
  }

  return questions;
}

function generateAblativePrepQuestions(count) {
  const allPreps = ABLATIVE_PREPOSITIONS_INFO.prepositions.map((p) => p.preposition);
  const allMeanings = ABLATIVE_PREPOSITIONS_INFO.prepositions.map((p) => p.meaning);
  const questions = [];
  const shuffled = shuffle([...ABLATIVE_PREP_SENTENCES]);

  for (const entry of shuffled) {
    if (questions.length >= count) break;

    const isTypeA = questions.length % 2 === 0;

    if (isTypeA) {
      const correctAnswer = entry.preposition;
      const distractors = shuffle(allPreps.filter((p) => p !== correctAnswer)).slice(0, 3);

      questions.push({
        id: `ablprep-a-${entry.id}`,
        word: { lemma: entry.preposition, wordType: "sentence" },
        correctAnswer,
        options: shuffle([correctAnswer, ...distractors]),
        prompt: `\u201E${entry.latin}\u201C\n\nWelche Pr\u00E4position steht mit dem Ablativ?`,
        grammarInfo: null,
      });
    } else {
      const correctAnswer = entry.meaning;
      const distractors = shuffle(allMeanings.filter((m) => m !== correctAnswer)).slice(0, 3);

      questions.push({
        id: `ablprep-b-${entry.id}`,
        word: { lemma: entry.preposition, wordType: "sentence" },
        correctAnswer,
        options: shuffle([correctAnswer, ...distractors]),
        prompt: `\u201E${entry.latin}\u201C\n\nWas bedeutet \u201E${entry.preposition}\u201C hier?`,
        grammarInfo: null,
      });
    }
  }

  return questions;
}

function generateQuestionWordQuestions(count) {
  const particleOptions = ["-ne", "nonne", "num"];
  const answerOptions = ["Ja", "Nein", "offen"];
  const questions = [];
  const shuffled = shuffle([...QUESTION_WORD_SENTENCES]);

  for (const entry of shuffled) {
    if (questions.length >= count) break;

    const isTypeA = questions.length % 2 === 0;

    if (isTypeA) {
      const correctAnswer = entry.particle;
      const distractors = particleOptions.filter((p) => p !== correctAnswer);

      questions.push({
        id: `qword-a-${entry.id}`,
        word: { lemma: entry.particle, wordType: "sentence" },
        correctAnswer,
        options: shuffle([correctAnswer, ...distractors]),
        prompt: `\u201E${entry.latin}\u201C\n\nWelches Fragewort wird verwendet?`,
        grammarInfo: null,
      });
    } else {
      const correctAnswer = entry.expectedAnswer;
      const distractors = answerOptions.filter((a) => a !== correctAnswer);

      questions.push({
        id: `qword-b-${entry.id}`,
        word: { lemma: entry.particle, wordType: "sentence" },
        correctAnswer,
        options: shuffle([correctAnswer, ...distractors]),
        prompt: `\u201E${entry.latin}\u201C\n\nWelche Antwort wird erwartet?`,
        grammarInfo: null,
      });
    }
  }

  return questions;
}

export function generateQuestions(category, count = 10) {
  switch (category) {
    case "declensions": {
      const nounCount = Math.ceil(count * 0.7);
      const adjCount = count - nounCount;
      return shuffle([
        ...generateNounQuestions(nounCount),
        ...generateAdjectiveQuestions(adjCount),
      ]);
    }
    case "conjugations":
      return generateVerbQuestions(count);
    case "sentences":
      return generateSentenceQuestions(count);
    case "genitive-sentences":
      return generateGenitiveSentenceQuestions(count);
    case "ablative-sentences":
      return generateAblativeSentenceQuestions(count);
    case "ablative-preps":
      return generateAblativePrepQuestions(count);
    case "question-words":
      return generateQuestionWordQuestions(count);
    case "mixed": {
      const third = Math.floor(count / 3);
      const remainder = count - third * 2;
      return shuffle([
        ...generateNounQuestions(third),
        ...generateVerbQuestions(third),
        ...generateAdjectiveQuestions(remainder),
      ]);
    }
    default:
      return [];
  }
}
