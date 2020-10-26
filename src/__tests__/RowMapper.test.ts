import { RowMapper } from "../SheetsMapper/RowMapper";
import { sheets, mappedSheets, correctRowMap } from "./data/fixtures";

describe("RowMapper class", () => {
  it("When the row map is inconsistent with sheet row, should throw a suitable error", () => {
    const map = <const>{ A: "toA", notExist: "toS" };
    expect(() => {
      RowMapper.map(sheets.sheet1[0], map);
    }).toThrow(`Sheet do not contain notExist column.`);
  });

  it("Should return correctly mapped row", () => {
    expect(RowMapper.map(sheets.sheet1[0], correctRowMap)).toStrictEqual(
      mappedSheets.sheet1[0]
    );
  });

  it("Should return correctly mapped rows", () => {
    expect(RowMapper.mapRows(sheets.sheet1, correctRowMap)).toStrictEqual(
      mappedSheets.sheet1
    );
  });
});
