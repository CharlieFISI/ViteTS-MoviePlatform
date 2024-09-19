import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../views/Home';
import MovieDetails from '../views/MovieDetails';
import NotFound from '../views/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/movie/:id'
          element={<MovieDetails />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
