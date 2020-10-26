export class Logger {
  private state = { sheetName: "", rowNumber: 0 };

  setSheetName(sheetName: string): void {
    this.state = { ...this.state, sheetName };
  }

  setRowNumber(rowNumber: number): void {
    this.state = { ...this.state, rowNumber };
  }

  error(msg: string): Error {
    const { sheetName, rowNumber } = this.state;
    const sMMsg = sheetName ? `In ${sheetName} sheet. ` : "";
    const rowMsg = rowNumber !== 0 ? `Row number: ${rowNumber}. ` : "";
    return new Error(sMMsg + rowMsg + msg);
  }
}
