import React from 'react';
import {
    Grid,
    Typography,
    TextField,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Paper,
    Box,
} from '@mui/material';
import DropdownSelect from './DropdownSelect';
import { DropdownItemDto } from '../interfaces/DropdownItemDto';
import { ReplyDto } from '../interfaces/ReplyDto';

interface TicketDetailBodyProps {
    editMode: boolean;
    loadingDropdowns: boolean;
    title: string;
    setTitle: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
    moduleId: number;
    setModuleId: (val: number) => void;
    priorityLvlId: number;
    setPriorityLvlId: (val: number) => void;
    typeId: number;
    setTypeId: (val: number) => void;
    statusId: number;
    ticketTypesData?: DropdownItemDto[];
    modulesData?: DropdownItemDto[];
    statusesData?: DropdownItemDto[];
    prioritiesData?: DropdownItemDto[];
    replies: ReplyDto[];
}

const TicketDetailBody: React.FC<TicketDetailBodyProps> = ({
                                                               editMode,
                                                               loadingDropdowns,
                                                               title,
                                                               setTitle,
                                                               description,
                                                               setDescription,
                                                               moduleId,
                                                               setModuleId,
                                                               priorityLvlId,
                                                               setPriorityLvlId,
                                                               typeId,
                                                               setTypeId,
                                                               statusId,
                                                               ticketTypesData,
                                                               modulesData,
                                                               statusesData,
                                                               prioritiesData,
                                                               replies,
                                                           }) => {
    if (editMode && loadingDropdowns) {
        return <CircularProgress />;
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                {editMode ? (
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Edit Ticket
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2">Module</Typography>
                                <DropdownSelect
                                    label="Module"
                                    value={moduleId}
                                    onChange={(e) => setModuleId(Number(e.target.value))}
                                    options={modulesData || []}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2">Urgent Lvl</Typography>
                                <DropdownSelect
                                    label="Priority"
                                    value={priorityLvlId}
                                    onChange={(e) => setPriorityLvlId(Number(e.target.value))}
                                    options={prioritiesData || []}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2">Type</Typography>
                                <DropdownSelect
                                    label="Type"
                                    value={typeId}
                                    onChange={(e) => setTypeId(Number(e.target.value))}
                                    options={ticketTypesData || []}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2">State</Typography>
                                <Typography>
                                    {statusesData?.find((s) => s.id === statusId)?.value || statusId}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Description</Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                ) : (
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Ticket Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Module
                                </Typography>
                                <Typography variant="body1">
                                    {modulesData?.find((m) => m.id === moduleId)?.value || moduleId}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Urgent Lvl
                                </Typography>
                                <Typography variant="body1">
                                    {prioritiesData?.find((p) => p.id === priorityLvlId)?.value || priorityLvlId}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Type
                                </Typography>
                                <Typography variant="body1">
                                    {ticketTypesData?.find((t) => t.id === typeId)?.value || typeId}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    State
                                </Typography>
                                <Typography variant="body1">
                                    {statusesData?.find((s) => s.id === statusId)?.value || statusId}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" color="textSecondary">
                                Description
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                {description}
                            </Typography>
                        </Box>
                    </Paper>
                )}
            </Grid>

            <Grid item xs={12} md={4}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Replies
                    </Typography>
                    {replies.length ? (
                        <List>
                            {replies.map((rep) => (
                                <ListItem key={rep.id} disablePadding sx={{ mb: 1 }}>
                                    <Paper variant="outlined" sx={{ width: '100%', p: 1 }}>
                                        <ListItemText primary={rep.content} />
                                    </Paper>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography>No replies yet.</Typography>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TicketDetailBody;