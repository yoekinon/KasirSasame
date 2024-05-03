import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [menus, setUser] = useState([]);

  useEffect(() => {
    getmenus();
  }, []);

  const getmenus = async () => {
    const response = await axios.get("http://localhost:5000/menus");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/menus/${id}`)
        getmenus();
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`add`} className="button is-info">Add New</Link>
        <Link to={`kasir`} className="button is-success mx-3">Kasir</Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.nama}</td>
                <td>{user.harga.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}</td>
                <td>
                    <Link to={`edit/${user.id}`} className="button is-small is-info mx-2">Edit</Link>
                    <button onClick={() => deleteUser(user.id)} className="button is-small is-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
