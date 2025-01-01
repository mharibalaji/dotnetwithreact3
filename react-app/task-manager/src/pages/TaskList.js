import React, { useState, useEffect } from "react";
import { getTasks, deleteTask } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Table, Container, Row, Col } from "react-bootstrap";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteTask(taskToDelete.id);
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const confirmDelete = (task) => {
    setTaskToDelete(task);
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center text-primary">Task List</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-between">
          <Button
            variant="success"
            as={Link}
            to="/tasks/new"
            className="btn btn-success"
          >
            Add New Task
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead className="bg-primary text-white">
              <tr>
                <th>Title</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.priority}</td>
                    <td>{task.dueDate}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        as={Link}
                        to={`/tasks/edit/${task.id}`}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => confirmDelete(task)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No tasks available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the task{" "}
          <strong>{taskToDelete?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TaskList;
