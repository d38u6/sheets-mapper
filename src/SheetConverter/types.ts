export type Sheets = {
  [key: string]: any[];
};

export type TypedSheets<T extends string> = {
  [P in T]: any[];
};

export type SheetRow = {
  [key: string]: string;
};

export type SheetConverterConfig<SheetName> = {
  sheetName: SheetName;
  source: string | Buffer;
  header?: { rows: number };
  range?: string;
  columnToKey?: { [key: string]: string };
  includeEmptyLines?: boolean;
  sheetStubs?: boolean;
};
