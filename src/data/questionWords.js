export const QUESTION_WORDS_INFO = {
  title: "Fragew\u00F6rter: num, nonne, -ne",
  intro: "Im Lateinischen gibt es drei wichtige Fragepartikeln f\u00FCr Ja/Nein-Fragen. Sie stehen am Satzanfang (oder als Suffix) und signalisieren, welche Antwort erwartet wird.",
  particles: [
    {
      particle: "-ne",
      description: "H\u00E4ngt an das erste Wort des Satzes an. Die Frage ist offen \u2014 keine bestimmte Antwort wird erwartet.",
      expectedAnswer: "offen",
      examples: [
        { latin: "Venisne?", german: "Kommst du?" },
        { latin: "Estne rex in templo?", german: "Ist der K\u00F6nig im Tempel?" },
        { latin: "Amatne puella poetam?", german: "Liebt das M\u00E4dchen den Dichter?" },
      ],
    },
    {
      particle: "nonne",
      description: "Steht am Satzanfang. Es wird eine bejahende Antwort (\u201EJa\u201C) erwartet.",
      expectedAnswer: "Ja",
      examples: [
        { latin: "Nonne vides?", german: "Siehst du nicht? (Doch!)" },
        { latin: "Nonne rex bonus est?", german: "Ist der K\u00F6nig nicht gut? (Doch!)" },
        { latin: "Nonne amici veniunt?", german: "Kommen die Freunde nicht? (Doch!)" },
      ],
    },
    {
      particle: "num",
      description: "Steht am Satzanfang. Es wird eine verneinende Antwort (\u201ENein\u201C) erwartet.",
      expectedAnswer: "Nein",
      examples: [
        { latin: "Num times?", german: "Du f\u00FCrchtest dich doch nicht etwa?" },
        { latin: "Num rex malus est?", german: "Der K\u00F6nig ist doch nicht etwa schlecht?" },
        { latin: "Num servus fugit?", german: "Der Sklave ist doch nicht etwa geflohen?" },
      ],
    },
  ],
};

export const QUESTION_WORD_SENTENCES = [
  { id: "qw01", latin: "Venisne?", particle: "-ne", expectedAnswer: "offen" },
  { id: "qw02", latin: "Estne rex in templo?", particle: "-ne", expectedAnswer: "offen" },
  { id: "qw03", latin: "Amatne puella poetam?", particle: "-ne", expectedAnswer: "offen" },
  { id: "qw04", latin: "Videtne servus dominum?", particle: "-ne", expectedAnswer: "offen" },
  { id: "qw05", latin: "Nonne vides?", particle: "nonne", expectedAnswer: "Ja" },
  { id: "qw06", latin: "Nonne rex bonus est?", particle: "nonne", expectedAnswer: "Ja" },
  { id: "qw07", latin: "Nonne amici veniunt?", particle: "nonne", expectedAnswer: "Ja" },
  { id: "qw08", latin: "Nonne puella pulchra est?", particle: "nonne", expectedAnswer: "Ja" },
  { id: "qw09", latin: "Num times?", particle: "num", expectedAnswer: "Nein" },
  { id: "qw10", latin: "Num rex malus est?", particle: "num", expectedAnswer: "Nein" },
  { id: "qw11", latin: "Num servus fugit?", particle: "num", expectedAnswer: "Nein" },
  { id: "qw12", latin: "Num milites dormiunt?", particle: "num", expectedAnswer: "Nein" },
];
