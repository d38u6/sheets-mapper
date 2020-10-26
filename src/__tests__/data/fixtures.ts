export const sheets = {
  sheet1: [
    { A: "value0A", B: "value0B", C: "value0C", D: "value0D" },
    { A: "value1A", B: "value1B", C: "value1C", D: "value1D" },
  ],
};

export const mappedSheets = {
  sheet1: [
    { toA: "value0A", toB: "value0B", toC: "value0C", toD: "value0D" },
    { toA: "value1A", toB: "value1B", toC: "value1C", toD: "value1D" },
  ],
};

export const correctRowMap = <const>{ A: "toA", B: "toB", C: "toC", D: "toD" };
