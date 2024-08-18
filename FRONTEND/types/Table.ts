// src/types/tableTypes.ts

export interface LocalTableColumn {
  field: string;
  headerName: string;
  type: "text" | "checkbox" | "select";
  filterable: boolean;
  options?: string[];
}

export interface LocalTableRow {
  [key: string]: any;
}