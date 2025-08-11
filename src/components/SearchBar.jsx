import { TextField } from "@mui/material";

export default function SearchBar({ value, onChange, autoFocus = false }) {
  return (
    <TextField
      fullWidth
      label="Buscar película"
      placeholder="Ej: Dune, Batman…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus={autoFocus}
    />
  );
}