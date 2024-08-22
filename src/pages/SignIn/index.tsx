import { Wrapper } from "./style";
import { ChangeEvent, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Meta from "components/common/Meta";
import { authAPI } from "services/api/auth";
import { useAppSelector } from "services/redux/store";
import { ROUTES } from "utils/constants/routes";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [showToast, setShowToast] = useState<boolean>(false);

  console.log("isLoggedIn: ", isLoggedIn);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res: any = await authAPI.signIn({
        email: email,
        password: password,
      });

      setToastMessage(res.message);
      setToastType("success");
      setShowToast(true);
      navigate(ROUTES.dashboard);
    } catch (error: any) {
      console.log("error: ", error);
      setToastMessage(error.message);
      setToastType("error");
      setShowToast(true);
    }
    [navigate];
  };

  if (isLoggedIn) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  const redirectRegisterPage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <>
      <Meta title="Demo App - Sign In" />
      <Wrapper>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-3">
              <h1 className="text-center mb-4">Login</h1>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
                <br />
                <br />
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={redirectRegisterPage}
                >
                  Register
                </button>
              </form>
              <ToastContainer
                position="top-end"
                className="p-3 toast-container"
              >
                <Toast
                  show={showToast}
                  onClose={() => setShowToast(false)}
                  className={
                    toastType === "success"
                      ? "custom-toast-success"
                      : "custom-toast-error"
                  }
                  delay={3000}
                  autohide
                >
                  <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
              </ToastContainer>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SignIn;
