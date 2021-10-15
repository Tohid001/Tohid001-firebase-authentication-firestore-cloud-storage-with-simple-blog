import Home from "./Home";
import NavBar from "./NavBar";
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Contact from "./Contact";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";


function App() {

  return (
    <Router>
      <div className="App">
       <NavBar/>
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route path='/contact'>
              <Contact/>
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails/>
            </Route>
            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
        
        </div>
      </div>
    </Router>
  );
}

export default App;
