import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 83px;

  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .register-container h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .register-form {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .register-button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .register-button:hover {
    background-color: #0056b3;
  }

  .custom-toast-success {
    background-color: #28a745; /* Example color for success */
    color: white; /* Ensure text is readable */
  }

  .custom-toast-error {
    background-color: #dc3545; /* Example color for error */
    color: white; /* Ensure text is readable */
  }
`;
