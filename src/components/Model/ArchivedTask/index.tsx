import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

import { authAPI } from 'services/api/auth';

interface ArchivedTasksProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the Task interface
interface Task {
  _id: string;
  title: string;
  status: 'todo' | 'inProgress' | 'completed' | 'expired';
  assignedTo: string;
  assignedId: string;
  assignedName: string;
}

const ArchivedTasks: React.FC<ArchivedTasksProps> = ({ show, setShow }) => {
  const [archivedTasks, setArchivedTasks] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const size = 2;

  useEffect(() => {
    // Fetch archived tasks from the API
    const fetchArchivedTasks = async () => {
      try {
        const response = await authAPI.listTask({ page: page, limit: size }); // Replace with actual API endpoint

        const taskList = response.data.taskList[0];
        const fetchedTasks: Task[] = [
          ...taskList.expiredTasks.map((task: any) => ({ ...task, status: 'expired' }))
        ];
        setArchivedTasks(fetchedTasks);
        setCount(response.data.data.total_records);
      } catch (error) {
        console.error('Error fetching archived tasks:', error);
      }
    };

    fetchArchivedTasks();
  }, []);

  const getStartIndex = () => page * size + 1;
  const totalPages = Math.ceil(count / size);

  const handlePageChange = (newPage: any) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Archived Tasks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {archivedTasks.length === 0 ? (
          <p>No archived tasks found.</p>
        ) : (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Task Name</th>
                </tr>
              </thead>
              <tbody>
                {archivedTasks.map((task, i) => (
                  <tr key={task._id}>
                    <td>{getStartIndex() + i}</td>
                    <td>{task.title}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                  <a className="page-link" href="#" onClick={() => handlePageChange(page - 1)}>
                    Previous
                  </a>
                </li>
                <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                  <a className="page-link" href="#" onClick={() => handlePageChange(0)}>
                    First
                  </a>
                </li>
                <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
                  <a className="page-link" href="#" onClick={() => handlePageChange(page + 1)}>
                    Next
                  </a>
                </li>
                <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(totalPages - 1)}
                  >
                    Last
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ArchivedTasks;
