import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../../sass/UserAdmin.scss';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Container,
} from '@mui/material';

const AddNewProject = ({
  projects,
  onBackClick,
  handleNewProjectFormSubmit,
  newlyCreatedProject,
}) => {
  // initialize state hooks
  const [newProjectName, setNewProjectName] = useState(''); // manage input state
  const [validationError, setValidationErrors] = useState(''); // validation errors
  const [addProjectSuccess, setAddProjectSuccess] = useState(''); // project successfully added to db

  // Handle input change
  const handleNameChange = (event) => {
    setNewProjectName(event.target.value);
  };

  if (newlyCreatedProject !== null) {
    return <Redirect to={`/project/${newlyCreatedProject}`} />;
  }

  // Handle Form Submit
  const handleProjectFormSubmit = (event) => {
    event.preventDefault();

    // Clear notifications on resubmit
    setValidationErrors('');
    setAddProjectSuccess('');

    // Validation

    // If there's no project name don't do anything
    if (!newProjectName) {
      setValidationErrors(`Project name is required`);
      return;
    }

    // If the entry already exists in the db, set error and clear form
    const validationMatch = Object.values(projects)
      .filter(
        (project) =>
          project.name.toLowerCase() === newProjectName.toLowerCase().trim()
      )
      .map((p) => p.name);
    if (validationMatch.length > 0) {
      setValidationErrors(
        `The project name "${newProjectName}" is already in use.`
      );
      setNewProjectName(''); // clear the form
    } else {
      handleNewProjectFormSubmit(newProjectName);
      setNewProjectName(''); // clear the form
      setAddProjectSuccess(`The project "${newProjectName}" has been added!`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="div" className="add-new-project" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Project
        </Typography>
        <Box component="form" onSubmit={handleProjectFormSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Project Name"
            value={newProjectName}
            onChange={handleNameChange}
            margin="normal"
          />
          {validationError && <Alert severity="error">{validationError}</Alert>}
          {addProjectSuccess && (
            <Alert severity="success">{addProjectSuccess}</Alert>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Add Project
          </Button>
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onBackClick}
          sx={{ mt: 2 }}
        >
          Admin Dashboard
        </Button>
      </Box>
    </Container>
  );
}; // End AddNewProject

export default AddNewProject;
