import DatabasSchema from '../Components/DatabasSchema';

const Timelog = () => {
  const loggedIn = localStorage.getItem('loggedIn');
  return (
    <div>
      {loggedIn ? (
        <DatabasSchema />
      ) : (
        <p>Please log in to view the database schema.</p>
      )}
    </div>
  );
};

export default Timelog;
