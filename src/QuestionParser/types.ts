enum QuestionType {
  Basic,
  Specialized,
}

enum Categories {
  A,
  B,
  C,
  D,
  PT,
  T,
  AM,
  A1,
  A2,
  B1,
  C1,
  D1,
}

type QuestionValue = 1 | 2 | 3;

type MulitLang = {
  PL: string;
  ENG: string;
  DE: string;
  PJM?: string;
};

type PrimaryQuestion = {
  number: number;
  content: MulitLang;
  media: string | null;
  value: QuestionValue;
  categories: Categories[];
  blockName: string;
  withPJM: boolean;
};

type Answers = {
  A: MulitLang;
  B: MulitLang;
  C: MulitLang;
};

type BasicQuestion = PrimaryQuestion & {
  correctAnswer: "Y" | "N";
  type: QuestionType.Basic;
};

type SpecializedQuestion = PrimaryQuestion & {
  answers: Answers;
  correctAnswer: "A" | "B" | "C";
  type: QuestionType.Basic;
};

export type Question = BasicQuestion | SpecializedQuestion;
