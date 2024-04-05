
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Registeruser from './Registeruser';
import Createuser from './Createuser';
import Updateuser from './Updateuser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path = '/' element = {<Registeruser />}></Route>
          <Route exact path = '/create' element = {<Createuser />}></Route>
          <Route exact path = '/update/:id' element = {<Updateuser/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
