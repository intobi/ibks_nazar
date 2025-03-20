import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import {
    useGetTicketByIdQuery,
    useUpdateTicketMutation,
    useGetRepliesByTicketIdQuery,
    useCreateReplyMutation,
    useGetTicketTypesQuery,
    useGetModulesQuery,
    useGetStatusesQuery,
    useGetPrioritiesQuery,
} from '../store/api';
import { TicketUpdateDto } from '../interfaces/TicketUpdateDto';
import TicketDetailHeader from '../components/TicketDetailHeader';
import NewReplySection from '../components/NewReplySection';
import TicketDetailBody from '../components/TicketDetailBody';

const TicketDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const ticketId = Number(id);

    const [editMode, setEditMode] = useState(false);

    const { data: ticketData, isLoading: isTicketLoading, error: ticketError } = useGetTicketByIdQuery(ticketId);
    const [updateTicket, { isLoading: isUpdating }] = useUpdateTicketMutation();

    const { data: ticketTypesData } = useGetTicketTypesQuery();
    const { data: modulesData } = useGetModulesQuery();
    const { data: statusesData } = useGetStatusesQuery();
    const { data: prioritiesData } = useGetPrioritiesQuery();

    const { data: replies, refetch: refetchReplies } = useGetRepliesByTicketIdQuery(ticketId);
    const [createReply, { isLoading: isReplyCreating }] = useCreateReplyMutation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [moduleId, setModuleId] = useState<number>(0);
    const [priorityLvlId, setPriorityLvlId] = useState<number>(0);
    const [typeId, setTypeId] = useState<number>(0);
    const [statusId, setStatusId] = useState<number>(0);

    const [newReplyContent, setNewReplyContent] = useState('');

    useEffect(() => {
        if (ticketData) {
            setTitle(ticketData.title);
            setDescription(ticketData.description);
            setModuleId(Number(ticketData.moduleId));
            setPriorityLvlId(Number(ticketData.priorityLvlId));
            setTypeId(Number(ticketData.typeId));
            setStatusId(Number(ticketData.statusId));
        }
    }, [ticketData]);

    const handleClose = () => navigate('/tickets');
    const handleEdit = () => setEditMode(true);
    const handleCancel = () => {
        if (ticketData) {
            setTitle(ticketData.title);
            setDescription(ticketData.description);
            setModuleId(Number(ticketData.moduleId));
            setPriorityLvlId(Number(ticketData.priorityLvlId));
            setTypeId(Number(ticketData.typeId));
            setStatusId(Number(ticketData.statusId));
        }
        setEditMode(false);
    };

    const handleSave = async () => {
        if (!ticketData) return;
        const payload: TicketUpdateDto = {
            id: ticketData.id,
            title,
            description,
            moduleId,
            priorityLvlId,
            typeId,
            // statusId – read-only
        };
        try {
            await updateTicket(payload).unwrap();
            setEditMode(false);
        } catch (err) {
            console.error('Error updating ticket:', err);
        }
    };

    const handleCreateReply = async () => {
        if (!newReplyContent.trim()) return;
        try {
            await createReply({ content: newReplyContent, ticketId }).unwrap();
            setNewReplyContent('');
            refetchReplies();
        } catch (err) {
            console.error('Error creating reply:', err);
        }
    };

    const loadingDropdowns =
        editMode &&
        (!ticketTypesData || !modulesData || !statusesData || !prioritiesData);

    if (isTicketLoading) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }
    if (ticketError) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Alert severity="error">Щось пішло не так при завантаженні тікета.</Alert>
            </Container>
        );
    }
    if (!ticketData) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Alert severity="info">Дані тікета не знайдено.</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <TicketDetailHeader
                        ticketId={ticketData.id}
                        ticketTitle={ticketData.title}
                        editMode={editMode}
                        isUpdating={isUpdating}
                        onClose={handleClose}
                        onEdit={handleEdit}
                        onCancel={handleCancel}
                        onSave={handleSave}
                    />
                    <NewReplySection
                        newReplyContent={newReplyContent}
                        setNewReplyContent={setNewReplyContent}
                        isReplyCreating={isReplyCreating}
                        onCreateReply={handleCreateReply}
                    />
                    <TicketDetailBody
                        editMode={editMode}
                        loadingDropdowns={loadingDropdowns}
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        moduleId={moduleId}
                        setModuleId={setModuleId}
                        priorityLvlId={priorityLvlId}
                        setPriorityLvlId={setPriorityLvlId}
                        typeId={typeId}
                        setTypeId={setTypeId}
                        statusId={statusId}
                        ticketTypesData={ticketTypesData}
                        modulesData={modulesData}
                        statusesData={statusesData}
                        prioritiesData={prioritiesData}
                        replies={replies || []}
                    />
                </CardContent>
            </Card>
        </Container>
    );
};

export default TicketDetailPage;
