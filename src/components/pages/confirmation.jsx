import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Confirmation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 4,
        p: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main' }} />
        </Box>
        
        <Typography variant="h5" component="h1" gutterBottom>
          Vérification de votre compte
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Un lien de vérification a été envoyé à votre adresse email.
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Veuillez cliquer sur ce lien pour activer votre compte.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Si vous ne voyez pas l'email dans votre boîte de réception, vérifiez votre dossier spam.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Confirmation;
