import Chat from './components/Chat';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css'
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <p>HI there</p>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;