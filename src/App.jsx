import './App.css';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import { Outlet } from 'react-router-dom';
import TopButton from './components/common/Topbutton.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

function App() {

  return (
    <>
      <Header></Header>
      <main>
        <ScrollToTop />
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
      <TopButton />
    </>
  )
}

export default App;
