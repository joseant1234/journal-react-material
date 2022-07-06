import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { FirebaseAuth } from "../firebase/config";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { login, logout } from "../store/auth/authSlice";
import { CheckingAuth } from "../ui";

export const AppRouter = () => {

  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // cuando el estado de la autenticacion cambia
    onAuthStateChanged(FirebaseAuth, async(user) => {
      if(!user) return dispatch(logout());
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });

  }, [])


  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>
        {
          (status === 'authenticated')
          ? <Route path="/*" element={<JournalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
        }
        {/* si ninguna ruta coincide va al login */}
        <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
