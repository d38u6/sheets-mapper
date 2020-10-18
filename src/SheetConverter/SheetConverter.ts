import excelToJson from "convert-excel-to-json";
import { SheetRow, QuestionRow, QuestionsSheet, Sheet } from "./types";
import { SHEET_NAME, SHEET_COLUMNS } from "./constanst";

export class SheetConverter {
  private readonly sheet: QuestionsSheet | null;

  constructor(source: string | Buffer) {
    const tempSheet = excelToJson({ source, header: { rows: 1 } });
    if (SheetConverter.isCorrectQuestionsSheet(tempSheet)) {
      this.sheet = tempSheet;
    } else {
      this.sheet = null;
    }
  }

  static isCorrectQuestionRow(sheetRow: SheetRow): sheetRow is QuestionRow {
    let is = true;
    SHEET_COLUMNS.forEach((col) => {
      is = is && sheetRow[col] !== undefined;
    });
    return is;
  }

  static isCorrectQuestionsSheet(sheet: Sheet): sheet is QuestionsSheet {
    let is = true;
    if (sheet[SHEET_NAME] === undefined) return false;
    sheet[SHEET_NAME].forEach((sheetRow) => {
      is = is && this.isCorrectQuestionRow(sheetRow);
    });
    return is;
  }

  get isValidSource(): boolean {
    return Boolean(this.sheet);
  }

  get questionsRows(): QuestionRow[] | null {
    return this.sheet ? [...this.sheet[SHEET_NAME]] : null;
  }
}
