import { TextField } from "@mui/material";

export default function SearchBar({ value, onChange, autoFocus = false }) {
  return (
    <TextField
      slotProps={{
        inputLabel: {
        sx: {
          color: "white", "&.Mui-focused": {
            color:'#f35a5d',
          }
        }
        },
        input: {
          sx: {
            color: "white"
          }
        }
      }}
    
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#f35a5d',
          },
          '&:hover fieldset': {
            borderColor: '#98c7f3',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#f35a5d',
          },
        },
      }}
 
      fullWidth
      label="Buscar película"
      placeholder="Ej: Dune, Batman…"
      value={value}
       onChange={(e) => onChange(e.target.value)}
      autoFocus={autoFocus}
    />
  );
}