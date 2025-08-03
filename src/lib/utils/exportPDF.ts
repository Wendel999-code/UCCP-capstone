import { Table } from "@tanstack/react-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportTableToPDFOptions {
  filename?: string;
  title?: string;
}

export const exportToPDF = (
  table: Table<any>,
  options: ExportTableToPDFOptions = {}
) => {
  const { filename = "table_export.pdf", title = "Table Export" } = options;

  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(12);
    doc.text(title, 14, 15);

    const filteredColumns = table
      .getVisibleLeafColumns()
      .filter((header) => header.id !== "actions" && header.id !== "rowNumber");

    const headers = ["#"].concat(
      filteredColumns.map((col) =>
        typeof col.columnDef.header === "string" ? col.columnDef.header : col.id
      )
    );

    const dataRows = table.getRowModel().rows.map((row, idx) => [
      idx + 1,
      ...filteredColumns.map((col) => {
        let value = row.getValue(col.id);
        if (typeof value === "string" && value.length > 40) {
          value = value.substring(0, 37) + "...";
        }
        return typeof value === "string" || typeof value === "number"
          ? value
          : JSON.stringify(value);
      }),
    ]);

    autoTable(doc, {
      head: [headers],
      body: dataRows,
      startY: 20,
      styles: {
        fontSize: 8,
        cellPadding: 1,
        overflow: "linebreak",
        textColor: [40, 40, 40],
      },
      headStyles: {
        fillColor: [255, 204, 0],
        textColor: 20,
        fontSize: 8,
      },
      margin: { top: 20, left: 10, right: 10, bottom: 10 },
    });

    doc.save(filename);
  } catch (error) {
    console.error("Error exporting PDF:", error);
  }
};

type NestedValueGetter = (obj: any, path: string) => any;

const getNestedValue: NestedValueGetter = (obj, path) => {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : "";
  }, obj);
};

export const createExportTable = <T>(data: T[], table: any) => {
  return {
    getVisibleLeafColumns: () => table.getVisibleLeafColumns(),
    getRowModel: () => ({
      rows: data.map((item, index) => ({
        getValue: (columnId: string) => {
          const col = table
            .getVisibleLeafColumns()
            .find((c: any) => c.id === columnId);
          if (col?.accessorFn) return col.accessorFn(item, index);
          return getNestedValue(item, columnId);
        },
        original: item,
        index,
      })),
    }),
  };
};
