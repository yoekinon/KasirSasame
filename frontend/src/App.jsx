import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList.jsx";
import AddUser from "./components/AddUser.jsx";
import EditUser from "./components/EditUser.jsx";
import Kasir from "./components/Kasir.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList/>}/>
        <Route path="add" element={<AddUser/>}/>
        <Route path="edit/:id" element={<EditUser/>}/>
        <Route path="kasir" element={<Kasir/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
