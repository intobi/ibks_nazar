import React from 'react';
import { Box, Stack, Typography, Button, CircularProgress } from '@mui/material';

interface TicketDetailHeaderProps {
    ticketId: string;
    ticketTitle: string;
    editMode: boolean;
    isUpdating: boolean;
    onClose: () => void;
    onEdit: () => void;
    onCancel: () => void;
    onSave: () => void;
}

const TicketDetailHeader: React.FC<TicketDetailHeaderProps> = ({
                                                                   ticketId,
                                                                   ticketTitle,
                                                                   editMode,
                                                                   isUpdating,
                                                                   onClose,
                                                                   onEdit,
                                                                   onCancel,
                                                                   onSave,
                                                               }) => {
    return (
        <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
        >
            <Typography variant="h6">
                Ticket #{ticketId} - {ticketTitle}
            </Typography>
            <Box>
                {editMode ? (
                    <>
                        <Button variant="outlined" sx={{ mr: 2 }} onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={onSave} disabled={isUpdating}>
                            {isUpdating ? <CircularProgress size={20} /> : 'Save'}
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant="outlined" sx={{ mr: 2 }} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="contained" onClick={onEdit}>
                            Edit
                        </Button>
                    </>
                )}
            </Box>
        </Stack>
    );
};

export default TicketDetailHeader;
