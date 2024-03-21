import NotionMyData from '../Components/NotionMyData';

const MyData = () => {
  const loggedIn = localStorage.getItem('loggedIn');
  return (
    <div>
      {loggedIn ? <NotionMyData /> : <p>Please log in to view your data.</p>}
    </div>
  );
};

export default MyData;
