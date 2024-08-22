// DeleteTask.tsx
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import { authAPI } from 'services/api/auth';

interface DeleteTaskProps {
  taskId: string;
  onClose: () => void;
  onDeleteSuccess: () => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ taskId, onClose, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await authAPI.deleteTask({ _id: taskId } as never); // Replace with your actual API call
      onDeleteSuccess(); // Notify parent component about the successful deletion
      setTimeout(() => window.location.reload(), 500); // Reload the page after a short delay
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      onClose(); // Close the modal
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTask;
