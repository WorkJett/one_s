const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const x_range = [...(new Array(100)).keys()]
const y_range = []

for (let i = 0; i < 100; i++) {
  const first_idx = Math.floor(i / alphabet.length)
  const second_idx = i % alphabet.length
  y_range.push(`${alphabet[first_idx]}${alphabet[second_idx]}`)
}

export const table = {
  columns: x_range.map(col_id => ({
    id: col_id,
    title: `Column #${col_id}`
  })),
  rows: y_range.map((row_id, idx) => ({
    id: row_id,
    idx,
    title: `Row ${row_id}`,
    data: x_range.map(col_id => ({
      id: `datum_${row_id}_${col_id}`,
      col_idx: col_id,
      row_idx: row_id,
      content: `Data ${row_id} ${col_id}`
    }))
  }))
}
