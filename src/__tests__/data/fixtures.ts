import { readFileSync } from "fs";

export const sheets = {
  sheet1: [
    { A: "value0A", B: "value0B", C: "value0C", D: "value0D" },
    { A: "value1A", B: "value1B", C: "value1C", D: "value1D" },
  ],
  sheet2: [
    { A: "value0A", B: "value0B", C: "value0C", D: "value0D" },
    { A: "value1A", B: "value1B", C: "value1C", D: "value1D" },
  ],
};

export const mappedSheets = {
  sheet1: [
    { toA: "value0A", toB: "value0B", toC: "value0C", toD: "value0D" },
    { toA: "value1A", toB: "value1B", toC: "value1C", toD: "value1D" },
  ],
  sheet2: [
    { toA2: "value0A", toB2: "value0B", toC2: "value0C", toD2: "value0D" },
    { toA2: "value1A", toB2: "value1B", toC2: "value1C", toD2: "value1D" },
  ],
};

export const sheetsWithoutCols = {
  sheet1: [
    { A: "value0A", B: "value0B", C: "value0C", D: "value0D" },
    { A: "value1A", B: "value1B", C: "value1C", D: "" },
  ],
  sheet2: [
    { A: "value0A", B: "value0B", C: "", D: "value0D" },
    { A: "value1A", B: "value1B", C: "value1C", D: "value1D" },
  ],
};

export const mappedSheetsWithoutCols = {
  sheet1: [
    { toA: "value0A", toB: "value0B", toC: "value0C", toD: "value0D" },
    { toA: "value1A", toB: "value1B", toC: "value1C", toD: "" },
  ],
  sheet2: [
    { toA2: "value0A", toB2: "value0B", toC2: "", toD2: "value0D" },
    { toA2: "value1A", toB2: "value1B", toC2: "value1C", toD2: "value1D" },
  ],
};

export const correctRowMap = <const>{ A: "toA", B: "toB", C: "toC", D: "toD" };

export const correctSheetsMap = <const>{
  sheet1: { A: "toA", B: "toB", C: "toC", D: "toD" },
  sheet2: { A: "toA2", B: "toB2", C: "toC2", D: "toD2" },
};

export const source = readFileSync(`${__dirname}/exampleSheets.xlsx`);
export const sourceWithoutCols = readFileSync(
  `${__dirname}/exampleSheetsWithoutCols.xlsx`
);
