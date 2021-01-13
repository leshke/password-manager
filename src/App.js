import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import AppProvider from './state';

const App = () => {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Switch>
            <Redirect exact from='/' to='/registration' />
            <Route exact path="/dashboard/:id" component={Dashboard} />
            <Route path="/registration" component={SignUp} />
            <Route path="/login" component={SignIn} />
          </Switch>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
