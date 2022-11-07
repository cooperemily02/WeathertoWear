import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [dropDownValue, setDropDownValue] = React.useState('');
  const label = props.label
  const options = props.options
  console.log(options)
  const handleChange = (event) => {
    setDropDownValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dropDownValue}
          label={label}
          onChange={handleChange}
        >
            {options.map((option) => {
                return <MenuItem value = {option.value}> {option.name} </MenuItem>
            })}
        </Select>
      </FormControl>
    </Box>
  );
}