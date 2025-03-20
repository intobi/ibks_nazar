import React from 'react';
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import {
    useCreateTicketMutation,
    useGetTicketTypesQuery,
    useGetModulesQuery,
    useGetStatusesQuery,
    useGetPrioritiesQuery,
} from '../store/api';
import AddTicketForm from '../components/AddTicketForm';
import { TicketCreateDto } from '../interfaces/TicketCreateDto';
import { DropdownItemDto } from '../interfaces/DropdownItemDto';

const AddTicketPage: React.FC = () => {
    const navigate = useNavigate();
    const [createTicket, { isLoading, isError }] = useCreateTicketMutation();

    const { data: ticketTypesData } = useGetTicketTypesQuery();
    const { data: modulesData } = useGetModulesQuery();
    const { data: statusesData } = useGetStatusesQuery();
    const { data: prioritiesData } = useGetPrioritiesQuery();

    if (!ticketTypesData || !modulesData || !statusesData || !prioritiesData) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    const handleClose = () => {
        navigate('/tickets');
    };

    const handleSave = async (formData: TicketCreateDto) => {
        try {
            await createTicket(formData).unwrap();
            navigate('/tickets');
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card>
                <CardHeader
                    title="Create New Ticket"
                    action={
                        <IconButton onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    }
                />
                <CardContent>
                    <AddTicketForm
                        onSave={handleSave}
                        isLoading={isLoading}
                        isError={isError}
                        ticketTypes={ticketTypesData as DropdownItemDto[]}
                        modules={modulesData as DropdownItemDto[]}
                        statuses={statusesData as DropdownItemDto[]}
                        priorities={prioritiesData as DropdownItemDto[]}
                    />
                </CardContent>
            </Card>
        </Container>
    );
};

export default AddTicketPage;
