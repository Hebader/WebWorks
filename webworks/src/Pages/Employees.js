import NotionEmployeeReader from '../Components/NotionEmployeeReader';

const Employee = () => {
  const loggedIn = localStorage.getItem('loggedIn');
  return (
    <div>
      {loggedIn ? (
        <NotionEmployeeReader />
      ) : (
        <p>Please log in to view employee data.</p>
      )}
    </div>
  );
};

export default Employee;
