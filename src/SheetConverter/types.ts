import { SHEET_NAME } from "./constanst";

export type Sheet = {
  [key: string]: any[];
};

export type SheetRow = {
  [key: string]: string;
};

export type QuestionsSheet = {
  [SHEET_NAME]: QuestionRow[];
};

export type QuestionCols =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W";

export type QuestionRow = {
  [P in QuestionCols]: string;
};
