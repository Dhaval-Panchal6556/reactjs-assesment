import { Wrapper } from './style';

import { useState } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import AddTask from 'components/Model/AddTask';
import ArchivedTasks from 'components/Model/ArchivedTask';

import { authFail } from 'services/redux/AuthSlice';

const Header = () => {
  const dispatch = useDispatch();
  const [showAddTask, setShowAddTask] = useState(false);
  const [showArchivedTasks, setShowArchivedTasks] = useState(false); // State for ArchivedTasks modal

  // Fetch the username from localStorage
  const username = JSON.parse(localStorage.getItem('userDemoAppDev') as never);

  const onLogout = () => {
    dispatch(authFail());
  };

  return (
    <Wrapper>
      <div>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto nav_bar_wrapper">
              <Button variant="light" onClick={() => setShowAddTask(true)}>
                Add Task
              </Button>
            </Nav>

            <Nav className="me-auto archived_button">
              <Button variant="light" onClick={() => setShowArchivedTasks(true)}>
                Archived List
              </Button>
            </Nav>
            <div className="centered-username">
              <span className="username">{username.name}</span>
            </div>
            <Form className="d-flex">
              {/* <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              /> */}
              <div className="flex-container">
                <Button variant="outline-success" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            </Form>
          </Container>
        </Navbar>
      </div>
      {showAddTask && <AddTask show={showAddTask} setShow={setShowAddTask} />}
      {showArchivedTasks && (
        <ArchivedTasks show={showArchivedTasks} setShow={setShowArchivedTasks} />
      )}
    </Wrapper>
  );
};

export default Header;
