import NotionDataReader from '../Components/NotionDataReader';

const Project = () => {
  const loggedIn = localStorage.getItem('loggedIn');
  return (
    <div>
      {loggedIn ? (
        <NotionDataReader />
      ) : (
        <p>Please log in to view project data.</p>
      )}
    </div>
  );
};

export default Project;
