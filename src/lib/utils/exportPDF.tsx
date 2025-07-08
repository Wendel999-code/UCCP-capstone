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

    // Get visible headers
    const headers = [
      "#", // Numbering column
      ...table
        .getVisibleLeafColumns()
        .filter((col) => col.id !== "actions")
        .map((col) =>
          typeof col.columnDef.header === "string"
            ? col.columnDef.header
            : col.id
        ),
    ];

    // Get visible rows with truncated strings, adding numbering
    const dataRows = table.getRowModel().rows.map((row, index) => [
      (index + 1).toString(), // numbering
      ...row.getVisibleCells().map((cell) => {
        let value = cell.getValue();
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
