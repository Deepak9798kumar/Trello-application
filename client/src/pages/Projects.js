import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Container, TextField, Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get('/projects', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProjects(response.data);
    };
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/projects',
        { name, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setProjects([...projects, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create project', error);
    }
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Projects
        </Typography>
        <form onSubmit={handleCreateProject}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Create Project
          </Button>
        </form>
        <List sx={{ mt: 4, width: '100%' }}>
          {projects.map((project) => (
            <ListItem key={project._id}>
              <ListItemText primary={project.name} secondary={project.description} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Projects;
