import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 83px;
  position: relative;

  /* Position the ToastContainer in the top-right corner */
  .toast-container {
    position: fixed;
    top: 20px; /* Adjust the vertical distance from the top */
    right: 20px; /* Adjust the horizontal distance from the right */
    z-index: 1050; /* Ensure it appears on top of other elements */
  }

  /* Styling for success toast */
  .custom-toast-success {
    background-color: #28a745; /* Example color for success */
    color: white; /* Ensure text is readable */
  }

  /* Styling for error toast */
  .custom-toast-error {
    background-color: #dc3545; /* Example color for error */
    color: white; /* Ensure text is readable */
  }
`;
