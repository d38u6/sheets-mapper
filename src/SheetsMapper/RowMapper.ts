import { Logger } from "./Logger";
import { RowMap, MappedRow, Row, TypedRow } from "./types";

export class RowMapper<Map extends RowMap> {
  constructor(
    private readonly rowMap: Map,
    private readonly logger = new Logger()
  ) {}

  private hasColumns(row: Row): row is TypedRow<Map> {
    Object.keys(this.rowMap).forEach((col) => {
      if (typeof row[col] !== "string") {
        throw this.logger.Error(`Sheet do not contain ${col} column.`);
      }
    });
    return true;
  }

  private isMappedRow(row: Row): row is MappedRow<Map> {
    Object.values(this.rowMap).forEach((name) => {
      if (typeof row[name] !== "string") {
        throw this.logger.Error(`Mapping ${name} property filed`);
      }
    });
    return true;
  }

  map(row: Row): MappedRow<Map> {
    if (this.hasColumns(row)) {
      let mappedRow = {};
      Object.entries(row).forEach(([key, value]) => {
        const propName = this.rowMap[key];
        if (typeof propName === "string")
          mappedRow = { ...mappedRow, [propName]: value };
      });

      if (!this.isMappedRow(mappedRow)) {
        throw this.logger.Error("Mapping row failed");
      }
      return mappedRow;
    }
    throw this.logger.Error("Row is not cohesion with row map");
  }

  mapRows(rows: Row[]): MappedRow<Map>[] {
    const mappedRows: MappedRow<Map>[] = [];
    rows.forEach((row, i) => {
      this.logger.setRowNumber(i + 1);
      const mappedRow = this.map(row);
      mappedRows.push(mappedRow);
    });
    this.logger.setRowNumber(0);
    return mappedRows;
  }

  static map<M extends RowMap>(
    row: Row,
    map: M,
    logger?: Logger
  ): MappedRow<M> {
    const rm = new RowMapper(map, logger);
    return rm.map(row);
  }

  static mapRows<M extends RowMap>(
    rows: Row[],
    map: M,
    logger?: Logger
  ): MappedRow<M>[] {
    const rm = new RowMapper(map, logger);
    return rm.mapRows(rows);
  }
}
