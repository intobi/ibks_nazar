import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { DropdownItemDto } from '../interfaces/DropdownItemDto';

interface DropdownSelectProps {
    label: string;
    value: number;
    onChange: (event: SelectChangeEvent<number>, child: React.ReactNode) => void;
    options: DropdownItemDto[];
    disabled?: boolean;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
                                                           label,
                                                           value,
                                                           onChange,
                                                           options,
                                                           disabled = false
                                                       }) => {
    return (
        <FormControl fullWidth disabled={disabled}>
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select<number>
                labelId={`${label}-label`}
                label={label}
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default DropdownSelect;
