import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TicketListItemDto } from '../interfaces/TicketListItemDto';

interface TicketsTableProps {
    tickets: TicketListItemDto[];
}

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets }) => {
    const navigate = useNavigate();

    const getColorByPriority = (priorityLvlId: number) => {
        switch (priorityLvlId) {
            case 1:
                return '#48BB78'; // Low
            case 2:
                return '#F6AD55'; // Medium
            case 3:
                return '#E53E3E'; // High
            case 4:
                return '#805AD5'; // Priority
            case 5:
                return '#CBD5E0'; // None
            default:
                return '#CBD5E0';
        }
    };

    const handleRowClick = (id: string) => {
        navigate(`/tickets/${id}`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Lvl</TableCell>
                        <TableCell>#</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Module</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>State</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map((ticket) => (
                        <TableRow
                            key={ticket.id}
                            hover
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleRowClick(ticket.id)}
                        >
                            <TableCell>
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        width: 15,
                                        height: 15,
                                        borderRadius: '50%',
                                        backgroundColor: getColorByPriority(ticket.priorityLvlId),
                                    }}
                                />
                            </TableCell>
                            <TableCell>{ticket.id}</TableCell>
                            <TableCell>{ticket.title}</TableCell>
                            <TableCell>{ticket.module}</TableCell>
                            <TableCell>{ticket.type}</TableCell>
                            <TableCell>{ticket.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TicketsTable;
