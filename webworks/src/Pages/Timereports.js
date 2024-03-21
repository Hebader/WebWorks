import NotionTimereportsReader from '../Components/NotionTimereportsReader';

const Timereports = () => {
  const loggedIn = localStorage.getItem('loggedIn');
  return (
    <div>
      {loggedIn ? (
        <NotionTimereportsReader />
      ) : (
        <p>Please log in to view time reports.</p>
      )}
    </div>
  );
};

export default Timereports;
