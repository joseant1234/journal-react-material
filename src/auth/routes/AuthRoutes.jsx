import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom'
import { CheckingAuth } from '../../ui';
import { LoginPage, RegisterPage } from '../pages';

export const AuthRoutes = () => {
  const { status } = useSelector(state => state.auth);

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
