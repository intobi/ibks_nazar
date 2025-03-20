import React from 'react';
import { Box, Button } from '@mui/material';

interface TicketsHeaderProps {
    onAddTicket: () => void;
}

const TicketsHeader: React.FC<TicketsHeaderProps> = ({ onAddTicket }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="contained" color="primary" onClick={onAddTicket}>
                Add New Ticket
            </Button>
        </Box>
    );
};

export default TicketsHeader;
