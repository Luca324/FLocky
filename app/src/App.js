// App.js
import Chat from './components/Chat';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector } from 'react-redux';

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
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default App;