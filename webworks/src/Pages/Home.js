import './Home.css';

const Home = () => {
  return (
    <div className="welcome-container">
      <div className="welcome">
        <h1>Välkommen till Webworks!</h1>
        <img
          src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg" // Använd src-attributet för att ladda bilden
          alt="Backround for welcome container"
          className="background-image"
        />
      </div>
    </div>
  );
};

export default Home;
