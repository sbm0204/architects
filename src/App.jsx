import './App.css';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import { Outlet } from 'react-router-dom';
import Service from './components/service/Service.jsx';
import Main from './components/Main.jsx';
import AlertStatusCards from './components/AlertStatusCards/AlertStatusCards.jsx';
import GuideLine from './components/guideLine/GuideLine.jsx';

function App() {

  return (
    <>
      {/* <main>
        <Outlet />
        </main> */}
      <Header></Header>

      <Main />
      {/* <GuideLine /> */}
      {/* <AlertStatusCards /> */}
      {/* <Service /> */}

      <Footer></Footer>
    </>
  )
}

export default App;
