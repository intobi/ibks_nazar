import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, SelectChangeEvent } from '@mui/material';
import { TicketCreateDto } from '../interfaces/TicketCreateDto';
import DropdownSelect from './DropdownSelect';
import { DropdownItemDto } from '../interfaces/DropdownItemDto';

interface AddTicketFormProps {
    onSave: (formData: TicketCreateDto) => void;
    isLoading: boolean;
    isError: boolean;
    ticketTypes: DropdownItemDto[];
    modules: DropdownItemDto[];
    statuses: DropdownItemDto[];
    priorities: DropdownItemDto[];
}

const AddTicketForm: React.FC<AddTicketFormProps> = ({
                                                         onSave,
                                                         isLoading,
                                                         isError,
                                                         ticketTypes,
                                                         modules,
                                                         statuses,
                                                         priorities,
                                                     }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [moduleId, setModuleId] = useState<number>(modules[0]?.id || 0);
    const [priorityLvlId, setPriorityLvlId] = useState<number>(priorities[0]?.id || 0);
    const [typeId, setTypeId] = useState<number>(ticketTypes[0]?.id || 0);
    const [statusId, setStatusId] = useState<number>(statuses[0]?.id || 0);

    useEffect(() => {
        if (modules.length) setModuleId(modules[0].id);
        if (priorities.length) setPriorityLvlId(priorities[0].id);
        if (ticketTypes.length) setTypeId(ticketTypes[0].id);
        if (statuses.length) setStatusId(statuses[0].id);
    }, [modules, priorities, ticketTypes, statuses]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData: TicketCreateDto = {
            title,
            description,
            moduleId,
            priorityLvlId,
            typeId,
            statusId,
        };
        onSave(formData);
    };

    const handleModuleChange = (e: SelectChangeEvent<number>, _child: React.ReactNode) => {
        setModuleId(Number(e.target.value));
    };

    const handlePriorityChange = (e: SelectChangeEvent<number>, _child: React.ReactNode) => {
        setPriorityLvlId(Number(e.target.value));
    };

    const handleTypeChange = (e: SelectChangeEvent<number>, _child: React.ReactNode) => {
        setTypeId(Number(e.target.value));
    };

    const handleStatusChange = (e: SelectChangeEvent<number>, _child: React.ReactNode) => {
        setStatusId(Number(e.target.value));
    };

    return (
        <form onSubmit={handleSubmit}>
            {isError && <Typography color="error">Failed to create ticket. Try again!</Typography>}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={3}
                />

                <DropdownSelect
                    label="Module"
                    value={moduleId}
                    onChange={handleModuleChange}
                    options={modules}
                />

                <DropdownSelect
                    label="Priority"
                    value={priorityLvlId}
                    onChange={handlePriorityChange}
                    options={priorities}
                />

                <DropdownSelect
                    label="Type"
                    value={typeId}
                    onChange={handleTypeChange}
                    options={ticketTypes}
                />

                <DropdownSelect
                    label="Status"
                    value={statusId}
                    onChange={handleStatusChange}
                    options={statuses}
                />

                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                </Button>
            </Box>
        </form>
    );
};

export default AddTicketForm;
