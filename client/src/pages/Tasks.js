import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import {
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Button,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText
} from '@mui/material';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [project, setProject] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Backlog');
    const [tags, setTags] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignedUser, setAssignedUser] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/tasks', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
            }
        };
        fetchTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const taskData = {
            project,
            name,
            description,
            status,
            tags: tags.split(','),
            dueDate,
            assignedUser
        };
        console.log("project Name", taskData.project)

        try {
            const response = await axios.post(
                '/tasks',
                taskData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setTasks([...tasks, response.data]);
            setProject('');
            setName('');
            setDescription('');
            setStatus('Backlog');
            setTags('');
            setDueDate('');
            setAssignedUser('');
        } catch (error) {
            console.error('Error creating task:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Task Management
            </Typography>
            <Box component="form" onSubmit={handleCreateTask} noValidate sx={{ mt: 3 }}>
                <TextField
                    label="Project"
                    fullWidth
                    margin="normal"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                />
                <TextField
                    label="Task Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {/* <TextField
                    label="Status"
                    fullWidth
                    margin="normal"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                /> */}

                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="Backlog">Backlog</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="On Hold">On Hold</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Tags (comma-separated)"
                    fullWidth
                    margin="normal"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <TextField
                    label="Due Date"
                    fullWidth
                    margin="normal"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <TextField
                    label="Assigned User"
                    fullWidth
                    margin="normal"
                    value={assignedUser}
                    onChange={(e) => setAssignedUser(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Create Task
                </Button>
            </Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Task List
            </Typography>
            <List>
                {tasks.map((task) => (
                    <ListItem key={task.id}>
                        <ListItemText
                            primary={task.name}
                            secondary={`Project: ${task.project}, Status: ${task.status}, Tags: ${task.tags.join(', ')}, Due Date: ${task.dueDate}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Tasks;
