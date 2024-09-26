import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import App from './App';
import Profile from './Components/Profile';
import Search from './Components/Search';
import { Provider } from 'react-redux';
import appStore from './Redux-store/appStore';
import Home from './Components/Home';
import TrailerPage from './Components/TrailerPage';
import MoviePage from './Components/MoviePage';

//router
const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "home",
      element: <Home />,
    }, {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "search",
      element: <Search />
    },
    {
      path: "watch",
      element: <TrailerPage />
    }, {
      path: "/:id",
      element: <MoviePage />
    }
  ],

}])




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);

