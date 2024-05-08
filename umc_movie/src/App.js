import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navigation";
import Home from "./Routes/MainPage";
import Popular from "./Routes/PopularPage";
import NowPlaying from "./Routes/NowPlayingPage";
import TopRated from "./Routes/TopRatedPage";
import Upcoming from "./Routes/Upcoming";
import { Detail } from "./Routes/MovieDetail";
import Notfound from "./Routes/NotFound";
import { Signup } from "./Routes/signup";
import { Login } from "./Routes/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/now" element={<NowPlaying />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/movies/:id" element={<Detail />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
