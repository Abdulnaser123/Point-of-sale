/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItem from "./pages/AddItem";
import DeleteItem from "./pages/DeleteItem";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import POSPage from "./pages/POSPage";
import UpdateItem from "./pages/UpdateItem";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/pos' element={<POSPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/AddItem' element={<AddItem />} />
        <Route path='/DeleteItem' element={<DeleteItem />} />
        <Route path='/UpdateItem' element={<UpdateItem />} />
      </Routes>
    </Router>
  );
}

export default App;
