import React, { useState } from 'react';
import { useGetTicketsQuery } from '../store/api';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // <-- додаємо
import TicketsHeader from '../components/TicketsHeader';
import TicketsTable from '../components/TicketsTable';
import TicketsPagination from '../components/TicketsPagination';
import { SelectChangeEvent } from '@mui/material/Select';
import { PaginatedTicketsResponse } from '../interfaces/PaginatedTicketsResponse';

const TicketsPage: React.FC = () => {
    const navigate = useNavigate(); // <-- хук для навігації

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const { data, isLoading, error } = useGetTicketsQuery({ page, limit });
    const tickets = (data as PaginatedTicketsResponse)?.items;
    const totalCount = (data as PaginatedTicketsResponse)?.totalCount || 0;

    const maxPage = Math.ceil(totalCount / limit);

    const handleLimitChange = (event: SelectChangeEvent<number>, _child: React.ReactNode) => {
        setLimit(Number(event.target.value));
        setPage(1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < maxPage) setPage(page + 1);
    };

    const handleAddTicket = () => {
        navigate('/add-new-ticket');
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong!</div>;

    return (
        <Box sx={{ p: 2 }}>
            <TicketsHeader onAddTicket={handleAddTicket} />
            {tickets && <TicketsTable tickets={tickets} />}
            <TicketsPagination
                page={page}
                limit={limit}
                maxPage={maxPage}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                onLimitChange={handleLimitChange}
            />
        </Box>
    );
};

export default TicketsPage;
