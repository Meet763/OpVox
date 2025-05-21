import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.scss';

const HomePage = () => {
    const [roomId, setRoomId] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (roomId.trim() && userId.trim()) {
            navigate(`/room/${roomId}/${userId}`);
        }
    };

    return (
        <div className="home-page">
            <div className="logo">
                <img src="src/assets/OptimozLogoSmall.png" alt="logo" />
            </div>
            <h2>Join a Room</h2>
            <form onSubmit={handleSubmit}>
                <div>

                    <label htmlFor="roomId">Room ID:</label>
                    <input
                        type="text"
                        id="roomId"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        placeholder="Enter Room ID"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="userId">User ID:</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter User ID"
                        required
                    />
                </div>
                <button type="submit">Join</button>
            </form>
        </div>
    );
};

export default HomePage;
