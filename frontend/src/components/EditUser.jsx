import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditMenu = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getMenuById();
  }, []);

  const UpdateMenu = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/menus/${id}`, {
        nama,
        harga
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getMenuById = async () => {
    const response = await axios.get(`http://localhost:5000/menus/${id}`);
    setNama(response.data.nama);
    setHarga(response.data.harga);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={UpdateMenu}>
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Name"
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
                placeholder="Harga"
              />
            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>

            <Link to={"/"} className="button mx-5 is-warning">Kembali</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenu;
