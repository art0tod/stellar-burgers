import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../services/store';
import { login } from '../../slices/authSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const result = dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
