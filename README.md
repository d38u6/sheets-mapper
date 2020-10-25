# Install

You can install this module as a component from NPM:

```bash
npm install --save sheets-mapper
```

# For What?

When you want map your sheet to strongly typed and 'intellisense' JS object

# Example with Typescript

```javascript
import fs from "fs";
import { SheetsMapper } from "sheets-mapper";

const source = fs.readFileSync("your-sheets-file.xlsx");
const sheetsMap = <const>{ SheetName: { A: "MapedColName" } };

const mappedSheets = SheetsMapper.map({
  sheetsMap,
  source,
  header: { rows: 1 },
});

console.log(mappedSheets.SheetName[0].MapedColName)
```

# SheetMap

So when you want mapped a sheets you need a map. We need [const-assertions feature](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) to declare sheet map object, base on this object typescript infer the type of mapped sheets and we create mapped sheets

```javascript
const map = <const>{
  SheetName: { A: "Col_A_Mapped_Name", B: "Col_B_Mapped_Name" },
  OtherSheetName: {
    A: "Col_A_Mapped_Name",
    B: "Col_B_Mapped_Name",
    C: "Col_C_Mapped_Name",
  },
};
```

I think a property names say everything

# Results

We will get sheets object based on our map with full intellisense support. Let's look, for example

```javascript
const map = <const>{
  SheetName: { A: "Col_A_Mapped_Name", B: "Col_B_Mapped_Name" },
  OtherSheetName: {
    A: "Col_A_Mapped_Name",
    B: "Col_B_Mapped_Name",
    C: "Col_C_Mapped_Name",
  },
};

const results = SheetsMapper.map({
  sheetsMap,
  source
});

//results = { "SheetName": [MappedRow],"OtherSheetName": [MappedRow] }
//When the MappedRow object for "SheetName" sheet loks like {Col_A_Mapped_Name: value, Col_B_Mapped_Name:value}
//When the MappedRow object for "OtherSheetName" sheet loks like {Col_A_Mapped_Name: value, Col_B_Mapped_Name:value,Col_C_Mapped_Name:value}

```

# Errors

When your source sheets is not coherent with your map you get any error. Errors should be enriched and tells you where is a problem.
For example:

```javascript
const map = <const>{
  DoNotExist: { A: "Col_A_Mapped_Name", B: "Col_B_Mapped_Name" }
};
```

```bash
Sheets source do not contain DoNotExist sheet. Check sheets soruce.
```

or when you try to map a non-existent column

```bash
In SheetName sheet, row number 1. Sheet do not contain A column.
```
