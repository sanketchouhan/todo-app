import './App.css';
import GroupsPage from './components/groups_page/GroupsPage';
import SideMenu from './components/side_menu/SideMenu';
import TasksPage from './components/tasks_page/TasksPage';
import Home from './components/home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { useSelector } from "react-redux";

function App() {

  // user from redux state
  const {user} = useSelector(state => state.user);

  // protected route
  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
       user ? 
          <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location }}} />   
    )} />
  );

  return (
      <Router>
        <div className="App">
          <h1 className="header">ToDo App</h1>
          <div className="content">
            <div className="content_left">
              <Switch>
                <ProtectedRoute path="/taskpage" component={TasksPage} />
                <ProtectedRoute path="/grouppage" component={GroupsPage} />
                <Route path="/">
                  <Home />
                </Route>
              </Switch>  
            </div>
            {user && <div className="content_right"><SideMenu /></div>}
          </div>
        </div>
      </Router>
  );
}



export default App;
