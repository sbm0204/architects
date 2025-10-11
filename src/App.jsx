import './App.css';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <Header></Header>

      <main>
        <Outlet />
      </main>

      <Footer></Footer>
    </>
  )
}

export default App;
