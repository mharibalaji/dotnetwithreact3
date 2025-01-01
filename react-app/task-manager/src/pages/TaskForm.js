import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, updateTask, getTasks } from "../services/api";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

function TaskForm() {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "", priority: "Low" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        try {
          const response = await getTasks();
          const taskToEdit = response.data.find((t) => t.id === parseInt(id));
          if (taskToEdit) {
            setTask({
              title: taskToEdit.title,
              description: taskToEdit.description,
              dueDate: taskToEdit.dueDate.split("T")[0],
              priority: taskToEdit.priority,
            });
          }
        } catch (error) {
          console.error("Error fetching task:", error);
        }
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTask(id, task);
      } else {
        await createTask(task);
      }
      navigate("/tasks");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleBack = () => {
    navigate("/tasks");
  };

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <h2 className="text-center text-primary">
            {id ? "Edit Task" : "Create Task"}
          </h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={handleBack} className="me-2">
                    Back to Task List
                </Button>
                <Button variant="primary" type="submit">
                    {id ? "Update Task" : "Add Task"}
                </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskForm;
