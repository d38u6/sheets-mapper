import { Logger } from "../SheetsMapper/Logger";

describe("Logger class", () => {
  const logger = new Logger();
  const errorMsg = "Error message";

  it("By default should return default Error", () => {
    const error = logger.error(errorMsg);
    expect(() => {
      throw error;
    }).toThrow(errorMsg);
  });

  describe("When the set sheet name", () => {
    const sheetName = "SheetName";
    beforeEach(() => {
      logger.setSheetName(sheetName);
    });

    it("Should return Error with sheet name info message", () => {
      const sMMsg = `In ${sheetName} sheet. `;
      const error = logger.error(errorMsg);
      expect(() => {
        throw error;
      }).toThrow(sMMsg + errorMsg);
    });
  });

  describe("When the set row number", () => {
    const rowNumber = 1;
    beforeEach(() => {
      logger.setRowNumber(rowNumber);
    });

    it("Should return Error with row number info message", () => {
      const rowMsg = `Row number: ${rowNumber}. `;
      const error = logger.error(errorMsg);
      expect(() => {
        throw error;
      }).toThrow(rowMsg + errorMsg);
    });
  });

  describe("When the set sheet name and row number", () => {
    const sheetName = "SheetName";
    const rowNumber = 1;
    beforeEach(() => {
      logger.setSheetName(sheetName);
      logger.setRowNumber(rowNumber);
    });

    it("Should return Error with sheet name and row number info message", () => {
      const sMMsg = `In ${sheetName} sheet. `;
      const rowMsg = `Row number: ${rowNumber}. `;
      const error = logger.error(errorMsg);
      expect(() => {
        throw error;
      }).toThrow(sMMsg + rowMsg + errorMsg);
    });
  });
});
