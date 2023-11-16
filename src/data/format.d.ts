interface Data {
  id: string;
  col_idx: number;
  row_idx: string;
  content: string;
}

interface Row {
  id: string;
  title: string;
  data: Data[];
}

interface Column {
  id: number;
  title: string;
}

interface Table {
  columns: Column[];
  rows: Row[];
}
