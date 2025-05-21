import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Room from "./pages/Room.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/room/:roomId/:userId" element={<Room />} />
            </Routes>

        </Router>

    );
}

export default App;
