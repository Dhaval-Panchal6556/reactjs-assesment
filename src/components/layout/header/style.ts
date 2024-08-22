import styled from 'styled-components';

export const Wrapper = styled.div`
  // justify-content: space-between;
  // background-color: blanchedalmond;

  // .left {
  //   display: flex;
  //   h2 {
  //     margin-right: 20px;
  //   }
  //   ul {
  //     display: flex;
  //     gap: 20px;
  //   }
  // }

  .nav_bar_wrapper a {
    padding-left: 20px;
    text-decoration: none;
    color: #fff;
    font-size: 16px;
    padding: 8px 12px;
    transition:
    color 0.3s,
    background-color 0.3s;
    border-radius: 4px;
  }

  .archived_button {
    margin-left: -1100px; /* Adds space between buttons */
  }

  .button-group {
    display: flex;
    // flex-direction: column;
    gap: 10px; /* Adds space between buttons */
  }
  
  .button-group button {
    // width: 100%; /* Makes the buttons full width within the container */
  }
  
  .centered-username {
    margin-left: auto;
    margin-right: 20px; /* Adds some spacing before the logout button */
  }
  

  .flex-container {
    display: flex;
    justify-content: space-between; /* Distribute space between buttons */
  }

  /* Add to your CSS or styled components file */
  .centered-username {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }

  .username {
    color: white; /* White color for the username text */
    font-size: 1.2rem; /* Increase font size for better visibility */
    font-weight: bold; /* Make the username text bold */
  }
`;
