import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const AddUser = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const navigate = useNavigate();

  const saveUser = async () => {
    // e.preventDefault();
    try {
        await axios.post('http://localhost:5000/menus', {
            nama,
            harga
        });
        navigate("/")
    } catch (err) {
        console.log(err)
    }
  }

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="nama"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Harga</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="harga"
              />
            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
            <Link to={"/"} className="button mx-5 is-warning">Kembali</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
