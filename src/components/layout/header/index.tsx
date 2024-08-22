import { Wrapper } from "./style";
import { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AddTask from "components/Model/AddTask";
import ArchivedTasks from "components/Model/ArchivedTask";
import { authFail } from "services/redux/AuthSlice";
import { appToaster } from "utils/constants";
import DeveloperCountList from "components/Model/DeveloperTask";

const Header = () => {
  const dispatch = useDispatch();
  const [showAddTask, setShowAddTask] = useState(false);
  const [showArchivedTasks, setShowArchivedTasks] = useState(false); // State for ArchivedTasks modal

  const [showDeveloperCount, setShowDeveloperCount] = useState(false); // State for Developer Task count modal

  // Fetch the username from localStorage
  const username = JSON.parse(localStorage.getItem("userDemoAppDev") as never);

  const onLogout = () => {
    dispatch(authFail());
    appToaster("success", "Logout successfully");
  };

  return (
    <Wrapper>
      <div>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto nav_bar_wrapper">
              <div className="button-group">
                <Button variant="light" onClick={() => setShowAddTask(true)}>
                  Add Task
                </Button>
                <Button
                  variant="light"
                  onClick={() => setShowArchivedTasks(true)}
                >
                  Archived List
                </Button>
                <Button
                  variant="light"
                  onClick={() => setShowDeveloperCount(true)}
                >
                  Developer Task List
                </Button>{" "}
              </div>
            </Nav>

            <div className="centered-username">
              <span className="username">{username.name}</span>
            </div>

            <Form className="d-flex">
              <Button variant="outline-success" onClick={onLogout}>
                Logout
              </Button>
            </Form>
          </Container>
        </Navbar>
      </div>

      {showAddTask && <AddTask show={showAddTask} setShow={setShowAddTask} />}
      {showArchivedTasks && (
        <ArchivedTasks
          show={showArchivedTasks}
          setShow={setShowArchivedTasks}
        />
      )}

      {showAddTask && (
        <AddTask show={showAddTask} setShow={setShowDeveloperCount} />
      )}
      {showDeveloperCount && (
        <DeveloperCountList
          show={showDeveloperCount}
          setShow={setShowDeveloperCount}
        />
      )}
    </Wrapper>
  );
};

export default Header;
