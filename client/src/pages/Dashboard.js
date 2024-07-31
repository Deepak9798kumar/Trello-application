import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Box mt={4}>
          <Button component={Link} to="/projects" variant="contained" color="primary" sx={{ mr: 2 }}>
            Projects
          </Button>
          <Button component={Link} to="/tasks" variant="contained" color="secondary">
            Task Board
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
