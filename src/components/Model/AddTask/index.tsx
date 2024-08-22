import { ChangeEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

import { authAPI } from 'services/api/auth';

import { appToaster } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

interface IProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Developer {
  _id: string;
  name: string;
}

const AddTask: React.FC<IProps> = ({ show, setShow }) => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [selectedDeveloperId, setSelectedDeveloperId] = useState<string>('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const onSubmit = async () => {
    const value: any = localStorage.getItem('userDemoAppDev'); // Replace 'myKey' with your key

    const finalValue = JSON.parse(value);

    const addTaskObj: any = {
      title: title,
      status: 'todo',
      developerId: finalValue.developerId,
      assignedTo: selectedDeveloperId || ''
    };
    try {
      const res: any = await authAPI.addTask(addTaskObj);
      console.log('res: ', res);

      appToaster('success', res.message);

      console.log('res.message: ', res.message);

      setTimeout(() => window.location.reload(), 1000); // Reload the page after a short delay

      navigate(ROUTES.dashboard);
    } catch (error: any) {
      // setToastMessage(error.message);
      // setToastType('error');
      // setShowToast(true);
    }
  };

  const handleClose = () => {
    setShow(false);
    // setTimeout(() => window.location.reload(), 500); // Reload the page after a short delay
    onSubmit(); // Pass the required argument
  };

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await authAPI.developerList({ page: 1, limit: 10 }); // Replace with actual API call
        setDevelopers(res.data.taskList); // Set the developer list
        setSelectedDeveloperId(res.data.taskList[0]._id); // Set the default selected developer
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };

    fetchDevelopers();
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form for adding task details */}
        <Form>
          {/* Task Title */}
          <Form.Group className="mb-3" controlId="formTaskTitle">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              required
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Assigned To Dropdown */}
          <Form.Group className="mb-3" controlId="formAssignedTo">
            <Form.Label>Assigned To</Form.Label>
            <Form.Select
              value={selectedDeveloperId}
              onChange={(e) => setSelectedDeveloperId(e.target.value)}
            >
              {developers.map((developer) => (
                <option key={developer._id} value={developer._id}>
                  {developer.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTask;
