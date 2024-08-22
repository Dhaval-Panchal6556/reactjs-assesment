import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";

import { authAPI } from "services/api/auth";
import { appToaster } from "utils/constants";

interface DeveloperCountListProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeveloperCountList: React.FC<DeveloperCountListProps> = ({ show, setShow }) => {
  const [developerCountList, setDeveloperCountList] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const size = 1    ;

  const getList = useCallback(async () => {
    try {
      // Fetch developer list count from the API
      const response: any = await authAPI.developerCountList({
        page: page + 1, // Correct page number for the API (if API uses 1-based indexing)
        limit: size,
      }); // Replace with actual API endpoint

      const developerCountRes = response.data.developerCountRes;

      setDeveloperCountList(developerCountRes);
      setCount(response.data.total_records);
      appToaster("success", response.message);
    } catch (error: any) {
      appToaster("error", error.message);
    }
  }, [page]);

  useEffect(() => {
    getList();
  }, [getList]);

  const getStartIndex = () => page * size + 1;
  const totalPages = Math.ceil(count / size);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Developer Task List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {developerCountList.length === 0 ? (
          <p>No developer tasks found.</p>
        ) : (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Developer Name</th>
                  <th>Todo Count</th>
                  <th>In Progress Count</th>
                </tr>
              </thead>
              <tbody>
                {developerCountList.map((developer, i) => (
                  <tr key={i}>
                    <td>{getStartIndex() + i}</td>
                    <td>{developer.developerName}</td>
                    <td>{developer.todoCount}</td>
                    <td>{developer.inProgressCount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Previous
                  </a>
                </li>
                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(0)}
                  >
                    First
                  </a>
                </li>
                <li
                  className={`page-item ${
                    page === totalPages - 1 ? "disabled" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Next
                  </a>
                </li>
                <li
                  className={`page-item ${
                    page === totalPages - 1 ? "disabled" : ""
                  }`}
                >
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

export default DeveloperCountList;
