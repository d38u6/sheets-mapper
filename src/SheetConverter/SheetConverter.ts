import excelToJson from "convert-excel-to-json";
import { SheetRow, TypedSheets, Sheets, SheetConverterConfig } from "./types";

export class SheetConverter<SheetName extends string> {
  private readonly sheetName: SheetName;
  private readonly sheets: TypedSheets<SheetName> | null = null;

  constructor({ sheetName, ...config }: SheetConverterConfig<SheetName>) {
    this.sheetName = sheetName;

    const tempSheet = excelToJson(config);
    if (this.hasSheet(tempSheet)) {
      this.sheets = tempSheet;
    }
  }

  hasSheet(sheets: Sheets): sheets is TypedSheets<SheetName> {
    return sheets[this.sheetName] !== undefined;
  }

  get isValidSource(): boolean {
    return Boolean(this.sheets);
  }

  get sheet(): SheetRow[] | null {
    return this.sheets ? [...this.sheets[this.sheetName]] : null;
  }
}
