import { Wrapper } from './style';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';

import DeleteTask from 'components/Model/DeleteTask';

import { authAPI } from 'services/api/auth';

// Define the Task interface
interface Task {
  _id: string;
  title: string;
  status: 'todo' | 'inProgress' | 'completed' | 'expired';
  assignedTo: string;
  assignedId: string;
  assignedName: string;
}

interface Developer {
  _id: string;
  name: string;
}

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // State for selected task
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>(''); // State for selected developer
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);

  // Fetch task list from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await authAPI.listTask({ page: 1, limit: 100 }); // Replace with actual API endpoint
        const taskList = response.data.taskList[0];
        const fetchedTasks: Task[] = [
          ...taskList.todoTasks.map((task: any) => ({ ...task, status: 'todo' })),
          ...taskList.inProgressTasks.map((task: any) => ({ ...task, status: 'inProgress' })),
          ...taskList.completedTasks.map((task: any) => ({ ...task, status: 'completed' })),
          ...taskList.expiredTasks.map((task: any) => ({ ...task, status: 'expired' }))
        ];
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const fetchDevelopers = async () => {
      try {
        const res = await authAPI.developerList({ page: 1, limit: 10 }); // Replace with actual API call
        setDevelopers(res.data.taskList); // Set the developer list
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };

    fetchTasks();
    fetchDevelopers();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      console.log('now: ', now);
      const updatedTasks = tasks.map((task: any) => {
        if (task.status === 'inProgress' && task.inProgressDate) {
          console.log('task.inProgressDate: ', task.inProgressDate);
          const taskAge = (now.getTime() - new Date(task.inProgressDate).getTime()) / 1000; // Time in seconds
          if (taskAge > 120) {
            // 2 minutes
            updateTaskStatus(task._id, 'expired');
            return { ...task, status: 'expired' };
          }
        }
        return task;
      });
      setTasks(updatedTasks);
    }, 60000); // Check every minute

    return () => clearInterval(timer);
  }, [tasks]);

  // Handle task update (API call)
  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await authAPI.updateTask({
        _id: taskId,
        status: newStatus
      });
      console.log('Task updated successfully');
      setTimeout(() => window.location.reload(), 500); // Reload the page after a short delay
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Handle drag end
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const draggedTask = tasks[source.index];

    // Prevent moving expired tasks
    if (draggedTask.status === 'expired') {
      console.log('Expired tasks cannot be moved.');
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task._id === draggedTask._id ? { ...task, status: destination.droppableId } : task
    );

    if (draggedTask.status === 'todo' && updatedTasks[0].status === 'completed') {
      console.log('First of all you can move task inProgress and then you can move completed task');
      return;
    }

    setTasks(updatedTasks);

    updateTaskStatus(draggedTask._id, destination.droppableId);
  };

  // Open modal when task is clicked
  const handleTaskClick = (task: Task) => {
    console.log('task: ', task);
    setSelectedTask(task);
    setSelectedDeveloper(task.assignedId); // Set the selected developer
    setShowModal(true);
  };

  const handleDeveloperChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeveloper(e.target.value); // Update the selected developer
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  // Handle updating task details in modal
  const handleUpdateTask = async (developerId: string) => {
    if (selectedTask) {
      await authAPI.updateTaskDetails({
        _id: selectedTask._id,
        title: selectedTask.title,
        status: selectedTask.status,
        assignedTo: developerId // Use the selected developer ID
      });

      const updatedTasks = tasks.map((task) =>
        task._id === selectedTask._id ? { ...task, assignedId: developerId } : task
      );
      setTasks(updatedTasks);
      setShowModal(false);
      setTimeout(() => window.location.reload(), 500); // Reload the page after a short delay
    }
  };

  // Handle input change for task fields
  const handleChange = (e: any) => {
    console.log('e: ', e.target.value);
    if (selectedTask) {
      console.log('selectedTask: ', selectedTask);
      setSelectedTask({ ...selectedTask, [e.target.name]: e.target.value });
    }
  };

  const columns = {
    todo: { name: 'To-do', tasks: tasks.filter((task) => task.status === 'todo') },
    inProgress: {
      name: 'In Progress',
      tasks: tasks.filter((task) => task.status === 'inProgress')
    },
    completed: { name: 'Completed', tasks: tasks.filter((task) => task.status === 'completed') },
    expired: { name: 'Expired', tasks: tasks.filter((task) => task.status === 'expired') }
  };

  return (
    <Wrapper>
      <Container fluid className="kanban-board">
        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            {Object.entries(columns).map(([columnId, column]) => (
              <Col key={columnId}>
                <h4>{column.name}</h4>
                <Droppable droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`droppable-col ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <Card
                              className={`mb-3 ${snapshot.isDragging ? 'dragging' : ''}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => handleTaskClick(task)} // Handle task click
                            >
                              <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                  <Card.Title>{task.title}</Card.Title>
                                  <AiOutlineClose
                                    className="shower-theme-icon cursor-pointer"
                                    onMouseOver={(e) =>
                                      (e.currentTarget.style.transform = 'scale(1.8)')
                                    }
                                    onMouseOut={(e) =>
                                      (e.currentTarget.style.transform = 'scale(1.1)')
                                    }
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent card click from triggering
                                      setTaskIdToDelete(task._id.toString()); // Set the task ID to delete
                                      setShowDeleteModal(true); // Show the delete modal
                                    }}
                                  />
                                </div>
                              </Card.Body>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
            ))}
          </Row>
        </DragDropContext>

        {/* Task Edit Modal */}

        {selectedTask && (
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formTaskTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={selectedTask.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTaskStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    value={selectedTask.status}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  >
                    <option value="todo">To-do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="expired">Expired</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAssignedTo">
                  <Form.Label>Assigned To</Form.Label>
                  <Form.Control
                    as="select"
                    name="assignedTo"
                    value={selectedDeveloper} // Bind to selectedDeveloper state
                    onChange={(e: any) => handleDeveloperChange(e)} // Handle dropdown change
                  >
                    {developers.map((developer) => (
                      <option key={developer._id} value={developer._id}>
                        {developer.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="dark" onClick={() => handleUpdateTask(selectedDeveloper)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* Delete Task Modal */}
        {showDeleteModal && taskIdToDelete && (
          <DeleteTask
            taskId={taskIdToDelete}
            onClose={() => setShowDeleteModal(false)} // Close the modal
            onDeleteSuccess={() => {
              // Handle successful deletion (e.g., refresh tasks or remove task from state)
              setShowDeleteModal(false); // Close the modal after deletion
              // Your logic to remove the task from the Kanban board
            }}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default KanbanBoard;
