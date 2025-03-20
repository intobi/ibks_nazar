import React from 'react';
import { Box, Button, Select, MenuItem, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface TicketsPaginationProps {
    page: number;
    limit: number;
    maxPage: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    onLimitChange: (event: SelectChangeEvent<number>, child: React.ReactNode) => void;
}

const TicketsPagination: React.FC<TicketsPaginationProps> = ({ page, limit, maxPage, onPrevPage, onNextPage, onLimitChange }) => {
    return (
        <Box
            sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Box>
                <Button onClick={onPrevPage} disabled={page === 1}>
                    Prev
                </Button>
                <Typography component="span" sx={{ mx: 2 }}>
                    Page {page} of {maxPage}
                </Typography>
                <Button onClick={onNextPage} disabled={page >= maxPage}>
                    Next
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="span">Items per page:</Typography>
                <Select<number> value={limit} onChange={onLimitChange} sx={{ ml: 1 }}>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                </Select>
            </Box>
        </Box>
    );
};

export default TicketsPagination;
