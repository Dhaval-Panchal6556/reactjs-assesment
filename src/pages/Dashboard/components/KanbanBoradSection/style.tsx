import styled from 'styled-components';

export const Wrapper = styled.div`
  .kanban-board {
    padding: 20px;
    height: 100%;
  }

  .kanban-board h4 {
    text-align: center;
    background-color: #007bff;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  .droppable-col {
    min-height: 400px;
    padding: 10px;
    border: 2px dashed #ddd;
    background-color: #f8f9fa;
    border-radius: 5px;
    transition: background-color 0.2s ease;
  }

  .dragging-over {
    background-color: #e9ecef; /* Highlight when dragging over */
  }

  .dragging {
    opacity: 0.6; /* Make the dragging task semi-transparent */
  }

  .shower-theme-icon {
    color: #000000; /* White color for the icon */
    background-color: #ff0000; /* Black background */
    border-radius: 50%; /* Round shape */
    padding: 5px; /* Spacing around the icon */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Adding a soft shadow */
    transition: transform 0.3s ease; /* Smooth transition for hover effect */
  }

  .shower-theme-icon:hover {
    transform: scale(1.1); /* Slightly enlarge the icon on hover */
    background-color: #333; /* Slightly lighter black on hover */
  }
`;
