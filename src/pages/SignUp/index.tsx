import { Wrapper } from './style';
import { ChangeEvent, useState } from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authAPI } from 'services/api/auth';
import { ROUTES } from 'utils/constants/routes';

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const item = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      password: password
    };
    try {
      const res: any = await authAPI.signUp(item);
      console.log('res: ', res);

      console.log('res.message: ', res.message);
      setToastMessage(res.message);
      setToastType('success');
      setShowToast(true);

      navigate(ROUTES.dashboard);
    } catch (error: any) {
      setToastMessage(error.message);
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleBack = () => {
    navigate(ROUTES.signIn);
  };

  return (
    <>
      <Wrapper>
        <div className="register-container">
          <h1>Register</h1>
          <form className="register-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={phoneNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="countryCode">Country Code:</label>
              <input
                type="text"
                id="countryCode"
                name="countryCode"
                required
                value={countryCode}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCountryCode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="register-button">
              Register
            </button>
            <Button variant="secondary" onClick={handleBack} className="mt-3">
              Back to Login
            </Button>
          </form>
          <ToastContainer position="top-end" className="p-3">
            <Toast
              show={showToast}
              onClose={() => setShowToast(false)}
              className={toastType === 'success' ? 'custom-toast-success' : 'custom-toast-error'}
              delay={3000}
              autohide
            >
              <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      </Wrapper>
    </>
  );
};

export default SignUp;
