import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Container from './component/layout/Container';

import Company from './component/pages/Company';
import Contact from './component/pages/Contact';
import Home from './component/pages/Home';
import NewProject from './component/pages/NewProject';
import Navbar from './component/layout/Navbar'
import Footer from './component/layout/Footer';
import Projects from './component/pages/Projects';
import Project from './component/pages/Project';

 function App() {
  return (
   <Router>
     <Navbar></Navbar>

      <Switch>
        <Container customClass="min-height">
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/company">
            <Company />
          </Route>
          
          <Route path="/contact">
            <Contact />
          </Route>

          <Route  path="/newproject">
            <NewProject />
          </Route>

          <Route  path="/projects">
            <Projects />
          </Route>

          <Route  path="/project/:id">
            <Project />
          </Route>

        </Container>
      </Switch>
      <Footer/>
   </Router>
  );
}

export default App;
