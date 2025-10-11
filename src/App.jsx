import './App.css';
import AlertStatusCards from './components/AlertStatusCards/AlertStatusCards.jsx';
import Header from './components/common/Header.jsx';
import GuideLine from './components/GuideLine.jsx';
import Footer from './components/common/Footer.jsx';

function App() {

  return (
    <>
      <Header></Header>

      <GuideLine></GuideLine>
      <AlertStatusCards></AlertStatusCards>

      <Footer></Footer>
    </>
  )
}

export default App;
