export type ObjectOfStrings = { [key: string]: string };

export type SheetsMaps = {
  [key: string]: RowMap;
};

export type RowMap = ObjectOfStrings;

export type Config<SM extends SheetsMaps> = {
  sheetsMap: SM;
  source: string | Buffer;
  fillEmptyCols?: boolean;
  header?: { rows: number };
  range?: string;
};

export type Row = ObjectOfStrings;

export type TypedRow<Map extends ObjectOfStrings> = {
  [P in keyof Map]: string;
};

export type MappedRow<Map extends ObjectOfStrings> = {
  [P in Map[keyof Map]]: string;
};

export type Sheets = {
  [key: string]: any[];
};

export type TypedSheets<SM extends SheetsMaps> = {
  [P in keyof SM]: any[];
};

export type MappedSheets<Maps extends SheetsMaps> = {
  [P in keyof Maps]: MappedRow<Maps[P]>[];
};
