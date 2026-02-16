export const CASES_INFO = [
  {
    name: "Nominativ",
    question: "Wer? Was?",
    description:
      "Der Nominativ ist der Grundfall und bezeichnet das Subjekt des Satzes \u2014 also die Person oder Sache, die etwas tut oder ist. Er steht auch als Pr\u00e4dikatsnomen nach \u201Eesse\u201C (sein).",
    examples: [
      { latin: "Puella cantat.", german: "Das M\u00e4dchen singt.", highlight: "Puella" },
      { latin: "Rex terram regit.", german: "Der K\u00f6nig regiert das Land.", highlight: "Rex" },
      { latin: "Amicus bonus est.", german: "Der Freund ist gut.", highlight: "Amicus" },
    ],
  },
  {
    name: "Genitiv",
    question: "Wessen?",
    description:
      "Der Genitiv dr\u00fcckt Besitz, Zugeh\u00f6rigkeit oder eine n\u00e4here Bestimmung aus. Er steht oft als Attribut bei einem anderen Nomen und entspricht im Deutschen dem \u201EWessen?\u201C-Fall.",
    examples: [
      { latin: "Vox regis magna est.", german: "Die Stimme des K\u00f6nigs ist gro\u00df.", highlight: "regis" },
      { latin: "Terra matris lata est.", german: "Das Land der Mutter ist weit.", highlight: "matris" },
      { latin: "Corpus militis forte est.", german: "Der K\u00f6rper des Soldaten ist stark.", highlight: "militis" },
    ],
  },
  {
    name: "Dativ",
    question: "Wem?",
    description:
      "Der Dativ bezeichnet das indirekte Objekt \u2014 die Person oder Sache, der etwas gegeben, gesagt oder gezeigt wird. Er steht oft bei Verben des Gebens, Zeigens und Erz\u00e4hlens.",
    examples: [
      { latin: "Servus domino aquam portat.", german: "Der Sklave bringt dem Herrn Wasser.", highlight: "domino" },
      { latin: "Amicus puellae templum monstrat.", german: "Der Freund zeigt dem M\u00e4dchen den Tempel.", highlight: "puellae" },
      { latin: "Amica matri bellum narrat.", german: "Die Freundin erz\u00e4hlt der Mutter vom Krieg.", highlight: "matri" },
    ],
  },
  {
    name: "Akkusativ",
    question: "Wen? Was?",
    description:
      "Der Akkusativ bezeichnet das direkte Objekt \u2014 die Person oder Sache, auf die sich die Handlung richtet. Er steht auch nach bestimmten Pr\u00e4positionen wie \u201Ead\u201C (zu, nach) oder \u201Eper\u201C (durch).",
    examples: [
      { latin: "Puella aquam portat.", german: "Das M\u00e4dchen tr\u00e4gt Wasser.", highlight: "aquam" },
      { latin: "Dominus servum vocat.", german: "Der Herr ruft den Sklaven.", highlight: "servum" },
      { latin: "Milites vocem audiunt.", german: "Die Soldaten h\u00f6ren die Stimme.", highlight: "vocem" },
    ],
  },
  {
    name: "Ablativ",
    question: "Womit? Wodurch? Wo? Wovon?",
    description:
      "Der Ablativ ist der vielseitigste Fall im Lateinischen. Er dr\u00fcckt das Mittel, die Begleitung, den Ort, die Trennung oder die Art und Weise aus. Er steht oft mit Pr\u00e4positionen wie \u201Ecum\u201C (mit), \u201Ein\u201C (in, auf) oder \u201E\u0101/ab\u201C (von).",
    examples: [
      { latin: "Miles cum amico ambulat.", german: "Der Soldat geht mit dem Freund spazieren.", highlight: "amico" },
      { latin: "Puellae in terra sedent.", german: "Die M\u00e4dchen sitzen auf der Erde.", highlight: "terra" },
      { latin: "Rex cum militibus in templo stat.", german: "Der K\u00f6nig steht mit den Soldaten im Tempel.", highlight: "militibus" },
    ],
  },
];
