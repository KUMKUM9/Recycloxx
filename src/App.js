import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth';
import BrowseListings from './pages/BrowseListings';
import ListingDetails from './pages/ListingDetails';
import ListingForm from './pages/ListingForm';
import Profile from './pages/Profile';
import RecyclePointsMap from './pages/RecyclePointsMap';
import Footer from './components/Footer';
import ChatbotBubble from './components/ChatbotBubble';
import MemoryGame from './components/MemoryGame';
import { GamePointsProvider } from './context/GamePointsContext';
import ProtectedRoute from './components/ProtectedRoute';

// Create context for login state
export const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null); // null means not logged in

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthContext.Provider value={{ user, setUser }}>
        <GamePointsProvider>
          <BrowserRouter>
            <Header />
            <Navbar />
            <main style={{ padding: '1rem' }}>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/browse' element={<BrowseListings />} />
                <Route path='/listing/new' element={<ListingForm />} />
                <Route path='/listing/:id' element={<ListingDetails />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/map' element={<RecyclePointsMap />} />
                <Route path='/game' element={
                  <ProtectedRoute>
                    <MemoryGame />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
            <ChatbotBubble />
          </BrowserRouter>
        </GamePointsProvider>
      </AuthContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  );
}
