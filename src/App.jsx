import './App.css';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import { Outlet } from 'react-router-dom';
import Service from './components/service/Service.jsx';
import AirQualityCard from './components/mainChart/AirQualityCard.jsx';
import Main from './components/Main.jsx';

function App() {

  return (
    <>
      {/* <main>
        <Outlet />
        </main> */}
      <Header></Header>

      <Main />

      <Footer></Footer>
    </>
  )
}

export default App;
