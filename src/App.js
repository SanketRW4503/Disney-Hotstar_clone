import Header from './Components/Header';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from './Components/Footer';
import useOnline from './Utils/CustomHooks/useOnline';
import NoInternet from './Components/NoInternet';
function App() {

  const [bgcolor, setBgcolor] = useState('bg-[#16181f]');

  const onlineStatus= useOnline();

  const user = useSelector((store) => store?.user)

  const location = useLocation();


  

  useEffect(() => {
    if (user) {
      setBgcolor('bg-[#16181f]');
    } else {
      setBgcolor('bg-gradient-to-t from-black to-blue-950')
    }
  }, [user])


  if(onlineStatus===false) return <NoInternet/>


  return (

    <div className={`absolute z-10 top-0 left-0 right-0 bottom-0 ${bgcolor}`}>
      <Header />
      <Outlet />
      {
        //show on home page only
        location.pathname === '/home' ? <Footer /> : null
      }
    </div>

  );
}


export default App;