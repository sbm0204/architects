import './App.css';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import TopButton from './components/common/TopButton.jsx';

function App() {

  return (
    <>
      <ScrollRestoration />
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
      <TopButton />
    </>
  )
}

export default App;
