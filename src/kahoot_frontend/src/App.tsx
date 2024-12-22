import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./index.css";
import Create from "./pages/Create";
import ConnectWallet from "./pages/ConnectWallet";
import LiveGame from "./pages/LiveGame";
import Waiting from "./pages/Waiting";
import ShowQuizTitle from "./pages/ShowQuizTitle";
import GamePlayer from "./pages/GamePlayer";
import SoloGame from "./pages/SoloGame";
import Library from "./pages/Library";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectWallet />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<Create />} />
        <Route path="/live-game/:gameId?" element={<LiveGame />} />
        <Route path="/waiting/:gameId?" element={<Waiting />} />
        <Route path="/show-quiz-title/:gameId?" element={<ShowQuizTitle />} />
        <Route path="/game-player/:gameId?" element={<GamePlayer />} />
        <Route path="/solo-game/:gameId?" element={<SoloGame />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </Router>
  );
}

export default App;
