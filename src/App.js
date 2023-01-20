import Header from './components/Header';
import Page from './components/Page';
import Footer from './components/Footer';
import ErrorBoundary from './utils/ErrorBoundary';
import './App.css'

function App() {
  return (
    <div className='allpage'>
      <Header />
      <hr />
      <ErrorBoundary>
        <Page />
      </ErrorBoundary>
      <Footer/>
    </div>
  );
}

export default App;
