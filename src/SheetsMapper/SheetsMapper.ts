import excelToJson from "convert-excel-to-json";
import { Logger } from "./Logger";
import { RowMapper } from "./RowMapper";
import { Config, SheetsMaps, Sheets, TypedSheets, MappedSheets } from "./types";

export class SheetsMapper<SM extends SheetsMaps> {
  private readonly sheetsMap: SheetsMaps;
  private readonly sourceSheets: Sheets;
  private readonly logger = new Logger();

  constructor({ sheetsMap, ...config }: Config<SM>) {
    this.sheetsMap = sheetsMap;
    this.sourceSheets = excelToJson(config);
    this.hasSheets(this.sourceSheets);
  }

  private hasSheets(sheets: Sheets): sheets is TypedSheets<SM> {
    Object.keys(this.sheetsMap).forEach((sheetName) => {
      if (sheets[sheetName] === undefined) {
        throw this.logger.Error(
          `Sheets source do not contain ${sheetName} sheet. Check sheets soruce.`
        );
      }
    });
    return true;
  }

  private isMappedSheets(sheets: Sheets): sheets is MappedSheets<SM> {
    if (this.hasSheets(sheets)) {
      Object.keys(this.sheetsMap).forEach((sheetName) => {
        Object.values(this.sheetsMap[sheetName]).forEach((propName) => {
          sheets[sheetName].forEach((row) => {
            if (typeof row[propName] !== "string") {
              throw this.logger.Error(`Row not contain ${propName} property`);
            }
          });
        });
      });

      return true;
    }
    throw this.logger.Error("Mapped sheets is not cohesion with sheets map");
  }

  map(): MappedSheets<SM> {
    let mappedSheets = {};
    Object.entries(this.sourceSheets).forEach(([sheetName, sheetRows]) => {
      this.logger.setSheetName(sheetName);
      const mappedSheet = RowMapper.mapRows(
        sheetRows,
        this.sheetsMap[sheetName],
        this.logger
      );
      mappedSheets = { ...mappedSheets, [sheetName]: mappedSheet };
    });
    this.logger.setSheetName("");
    if (this.isMappedSheets(mappedSheets)) return mappedSheets;

    throw this.logger.Error("Mapped Sheets failed");
  }

  static map<ShM extends SheetsMaps>(config: Config<ShM>): MappedSheets<ShM> {
    const sm = new SheetsMapper(config);
    return sm.map();
  }
}
