import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Eventdetails from './components/Eventdetails';
import Viewall from './components/Viewall';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Organizerboard from './components/Organizerboard';
import Addevent from './components/Addevent';
import Mytickets from './components/Mytickets';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/events/:id' >
          <Eventdetails />
        </Route>
        <Route path='/viewall'>
          <Viewall />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/mytickets'>
          <Mytickets />
        </Route>
        <Route path='/organizerboard'>
          <ProtectedRoute user={user} allowedRole="organizer">
            <Organizerboard />
          </ProtectedRoute>
        </Route>
        <Route path='/addevent'>
          <ProtectedRoute user={user} allowedRole="organizer">
            <Addevent />
          </ProtectedRoute>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
