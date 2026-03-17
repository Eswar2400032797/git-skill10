import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const initialStudents = [
  { id: 101, name: "Aarav Sharma", course: "Computer Science" },
  { id: 102, name: "Ishita Reddy", course: "Electronics" },
  { id: 103, name: "Rohan Mehta", course: "Mechanical" },
  { id: 104, name: "Nitya Gupta", course: "Civil" },
  { id: 105, name: "Dev Kumar", course: "Data Science" }
];

const emptyStudent = { id: "", name: "", course: "" };

export default function StudentManager() {
  const [students, setStudents] = useState(initialStudents);
  const [newStudent, setNewStudent] = useState(emptyStudent);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleAddStudent = () => {
    const idValue = Number(newStudent.id);
    const nameValue = newStudent.name.trim();
    const courseValue = newStudent.course.trim();

    if (!newStudent.id || !nameValue || !courseValue) {
      setError("Please fill id, name, and course.");
      return;
    }

    if (!Number.isInteger(idValue) || idValue <= 0) {
      setError("ID must be a positive number.");
      return;
    }

    if (students.some((student) => student.id === idValue)) {
      setError("Student ID already exists.");
      return;
    }

    setStudents((prevStudents) => [
      ...prevStudents,
      { id: idValue, name: nameValue, course: courseValue }
    ]);
    setNewStudent(emptyStudent);
  };

  const handleDelete = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  return (
    <Paper className="student-paper" elevation={0}>
      <Stack spacing={3}>
        <Box className="title-band">
          <SchoolRoundedIcon fontSize="large" sx={{ color: '#6b7fd8' }} />
          <Box>
            <Typography 
              variant="h4" 
              fontWeight={700}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              StudentManager
            </Typography>
            <Typography color="text.secondary">
              Add, list, and delete student records instantly with React Hooks.
            </Typography>
          </Box>
          <Chip
            label={`${students.length} students`}
            color="info"
            variant="filled"
            sx={{ 
              fontWeight: 700,
              fontSize: '1.1rem',
              boxShadow: '0 4px 12px rgba(99, 161, 237, 0.3)'
            }}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="ID"
              name="id"
              value={newStudent.id}
              onChange={handleChange}
              placeholder="Enter ID"
              variant="filled"
              sx={{
                '& .MuiFilledInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(8px)',
                },
                '& .MuiInputLabel-root': { color: '#6b7fd8' },
                '& .MuiFilledInput-input': { color: '#1e293b' }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={newStudent.name}
              onChange={handleChange}
              placeholder="Enter name"
              variant="filled"
              sx={{
                '& .MuiFilledInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(8px)',
                },
                '& .MuiInputLabel-root': { color: '#6b7fd8' },
                '& .MuiFilledInput-input': { color: '#1e293b' }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Course"
              name="course"
              value={newStudent.course}
              onChange={handleChange}
              placeholder="Enter course"
              variant="filled"
              sx={{
                '& .MuiFilledInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(8px)',
                },
                '& .MuiInputLabel-root': { color: '#6b7fd8' },
                '& .MuiFilledInput-input': { color: '#1e293b' }
              }}
            />
          </Grid>
        </Grid>

        <Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<PersonAddAltRoundedIcon />}
            onClick={handleAddStudent}
            sx={{
              boxShadow: '0 8px 25px rgba(99, 161, 237, 0.4)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                boxShadow: '0 12px 32px rgba(99, 161, 237, 0.5)',
              },
              fontWeight: 600,
              borderRadius: '12px',
              padding: '12px 24px',
            }}
          >
            Add Student
          </Button>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        {students.length === 0 ? (
          <Paper className="empty-state" variant="outlined">
            <Typography variant="h6">No students available</Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper} variant="outlined" className="table-shell">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow
                    key={student.id}
                    className="student-row"
                    sx={{ animationDelay: `${student.id % 5 * 45}ms` }}
                  >
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteOutlineRoundedIcon />}
                        onClick={() => handleDelete(student.id)}
                        sx={{
                          borderColor: '#f87171',
                          color: '#dc2626',
                          '&:hover': {
                            backgroundColor: 'rgba(248, 113, 113, 0.1)',
                            borderColor: '#ef4444',
                          },
                          borderRadius: '8px',
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Paper>
  );
}
