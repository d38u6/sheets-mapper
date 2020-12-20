import { SheetsMapper } from "../SheetsMapper/SheetsMapper";
import {
  source,
  sourceWithoutCols,
  correctSheetsMap,
  mappedSheets,
  mappedSheetsWithoutCols,
} from "./data/fixtures";

describe("SheetsMapper class", () => {
  it("When the sheets map is inconsistent with sheets, should throw a suitable error", () => {
    const sheetsMap = <const>{
      sheet1: { A: "toA", B: "toS" },
      notExistSheet: { A: "toA", B: "toS" },
    };
    expect(() => {
      SheetsMapper.map({ source, sheetsMap });
    }).toThrow(
      `Sheets source do not contain notExistSheet sheet. Check sheets soruce.`
    );
  });

  describe("Should return corectly mapped sheets", () => {
    it("when map full sheet", () => {
      expect(
        SheetsMapper.map({ source, sheetsMap: correctSheetsMap })
      ).toStrictEqual(mappedSheets);
    });
    it("when map sheet without cols", () => {
      expect(
        SheetsMapper.map({
          source: sourceWithoutCols,
          sheetsMap: correctSheetsMap,
          fillEmptyCols: true,
        })
      ).toStrictEqual(mappedSheetsWithoutCols);
    });
  });
});
