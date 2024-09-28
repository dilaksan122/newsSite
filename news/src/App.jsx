import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import News from './Components/News/News';
import Cinema from './Components/Cinema/Cinema';
import Sports from './Components/Sports/Sports';
import Reviews from './Components/Reviews/Reviews';
import Festival from './Components/Festival/Health';
import SportsDetail from './Components/Sports/SportsDetail';
import CinemaDetails from './Components/Cinema/CinemaDetails';
import Technology from './Components/Cartoons/Technology';
import TechnologyDetail from './Components/Cartoons/TechnologyDetail';
import HealthDetail from './Components/Festival/HealthDetail';
import ReviewsDetail from './Components/Reviews/ReviewsDetail';
import Health from './Components/Festival/Health';
import Privacy from './Components/Privacy/Privacy';
import Contact from './Components/Contact/Contact';
import NewsLetter from './Components/NewsLetter/NewsLetter';
import Footer from './Components/Footer/Footer';
import './App.css'


function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/cinema/:slug" element={<CinemaDetails />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/sports/:slug" element={<SportsDetail />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/:slug" element={<ReviewsDetail />} />
          <Route path="/health" element={<Health />} />
          <Route path="/health/:slug" element={<HealthDetail />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/technology/:slug" element={<TechnologyDetail />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/newsLetter' element={<NewsLetter />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
