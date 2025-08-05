// App.jsx - Main React component for FLocky web chat application
import Chat from '@/components/Chat.jsx';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@/styles/App.css';
import Login from '@/components/Login.jsx';
import Register from '@/components/Register.jsx';
import { Provider } from 'react-redux';
import { store } from '@/store/store.js';
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/authSlice.js";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
            }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </HashRouter>
      </div>
    </Provider>

  );
}

function RequireAuth({ children }) {
  const dispatch = useDispatch();
  const username = localStorage.getItem('authName')
  const isAuthenticated = useSelector((state) => state.auth).isAuthenticated

  if (username) {
    dispatch(login(username));

    return children;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" replace />;
}

export default App;