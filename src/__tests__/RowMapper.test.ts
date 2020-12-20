import { RowMapper } from "../SheetsMapper/RowMapper";
import {
  sheets,
  mappedSheets,
  mappedSheetsWithoutCols,
  correctRowMap,
  sheetsWithoutCols,
} from "./data/fixtures";

describe("RowMapper class", () => {
  it("When the row map is inconsistent with sheet row, should throw a suitable error", () => {
    const map = <const>{ A: "toA", notExist: "toS" };
    expect(() => {
      RowMapper.map(sheets.sheet1[0], map);
    }).toThrow(`Sheet do not contain notExist column.`);
  });

  describe("Should return correctly mapped row", () => {
    it("For a full row", () => {
      expect(RowMapper.map(sheets.sheet1[0], correctRowMap)).toStrictEqual(
        mappedSheets.sheet1[0]
      );
    });

    it("For a row without cols", () => {
      expect(
        RowMapper.map(sheetsWithoutCols.sheet1[0], correctRowMap)
      ).toStrictEqual(mappedSheetsWithoutCols.sheet1[0]);
    });
  });

  describe("Should return correctly mapped rows", () => {
    it("For a full sheet", () => {
      expect(RowMapper.mapRows(sheets.sheet1, correctRowMap)).toStrictEqual(
        mappedSheets.sheet1
      );
    });

    it("For a sheet without columns", () => {
      expect(
        RowMapper.mapRows(sheetsWithoutCols.sheet1, correctRowMap)
      ).toStrictEqual(mappedSheetsWithoutCols.sheet1);
    });
  });
});
