import { SheetsMapper } from "../SheetsMapper/SheetsMapper";
import { source, correctSheetsMap, mappedSheets } from "./data/fixtures";

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

  it("Should return corectly mapped sheets", () => {
    expect(
      SheetsMapper.map({ source, sheetsMap: correctSheetsMap })
    ).toStrictEqual(mappedSheets);
  });
});
