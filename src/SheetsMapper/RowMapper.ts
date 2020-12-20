import { Logger } from "./Logger";
import { RowMap, MappedRow, Row, TypedRow } from "./types";

export class RowMapper<Map extends RowMap> {
  constructor(
    private readonly rowMap: Map,
    private readonly fillEmptyCols = false,
    private readonly logger = new Logger()
  ) {}

  private hasColumns(row: Row): row is TypedRow<Map> {
    Object.keys(this.rowMap).forEach((col) => {
      if (typeof row[col] !== "string") {
        throw this.logger.error(`Sheet do not contain ${col} column.`);
      }
    });
    return true;
  }

  private isMappedRow(row: Row): row is MappedRow<Map> {
    Object.values(this.rowMap).forEach((name) => {
      if (typeof row[name] !== "string") {
        throw this.logger.error(`Mapping ${name} property filed`);
      }
    });
    return true;
  }

  private fillRow(row: Row): Row {
    const emptyCols = Object.keys(this.rowMap).reduce<Row>(
      (pv, cv) => ({ ...pv, [cv]: "" }),
      {}
    );
    return { ...emptyCols, ...row };
  }

  map(row: Row): MappedRow<Map> {
    let filledRow = row;
    if (this.fillEmptyCols) {
      filledRow = this.fillRow(row);
    }

    if (this.hasColumns(filledRow)) {
      let mappedRow = {};
      Object.entries(filledRow).forEach(([key, value]) => {
        const propName = this.rowMap[key];
        if (typeof propName === "string")
          mappedRow = { ...mappedRow, [propName]: value };
      });

      if (!this.isMappedRow(mappedRow)) {
        throw this.logger.error("Mapping row failed");
      }
      return mappedRow;
    }
    throw this.logger.error("Row is not cohesion with row map");
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
    fillEmptyCols?: boolean,
    logger?: Logger
  ): MappedRow<M> {
    const rm = new RowMapper(map, fillEmptyCols, logger);
    return rm.map(row);
  }

  static mapRows<M extends RowMap>(
    rows: Row[],
    map: M,
    fillEmptyCols?: boolean,
    logger?: Logger
  ): MappedRow<M>[] {
    const rm = new RowMapper(map, fillEmptyCols, logger);
    return rm.mapRows(rows);
  }
}
