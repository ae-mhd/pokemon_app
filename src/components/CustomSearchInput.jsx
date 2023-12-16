
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material'

const CustomSearchInput = ({ placeholder, icon, onChange, type = 'text' }) => {

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <OutlinedInput
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        startAdornment={<InputAdornment position="start">{icon} </InputAdornment>}
      />
    </FormControl>
  )
}

export default CustomSearchInput

