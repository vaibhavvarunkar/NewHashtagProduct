import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Home from './screens/Home';
import View from './screens/View';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/view" component={View} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
