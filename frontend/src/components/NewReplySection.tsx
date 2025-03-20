import React from 'react';
import { Grid, TextField, Button, Typography, CircularProgress, Box } from '@mui/material';

interface NewReplySectionProps {
    newReplyContent: string;
    setNewReplyContent: (val: string) => void;
    isReplyCreating: boolean;
    onCreateReply: () => void;
}

const NewReplySection: React.FC<NewReplySectionProps> = ({
                                                             newReplyContent,
                                                             setNewReplyContent,
                                                             isReplyCreating,
                                                             onCreateReply,
                                                         }) => {
    return (
        <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
                New Reply
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={10}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Enter your reply..."
                        value={newReplyContent}
                        onChange={(e) => setNewReplyContent(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={onCreateReply}
                        disabled={isReplyCreating}
                        sx={{ height: '100%' }}
                    >
                        {isReplyCreating ? <CircularProgress size={20} /> : 'Save'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewReplySection;
