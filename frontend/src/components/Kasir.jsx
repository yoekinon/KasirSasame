import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [bill, setBill] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    getMenus();
  }, []);

  useEffect(() => {
    setIsCartEmpty(cart.length === 0);
  }, [cart]);

  const getMenus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/menus");
      setMenus(response.data);
    } catch (error) {
      console.error("Error fetching menus: ", error);
    }
  };

  const addToCart = (menu) => {
    const existingItemIndex = cart.findIndex((item) => item.id === menu.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const updatedMenu = { ...menu, quantity: 1 };
      setCart([...cart, updatedMenu]);
    }
    setBill((prevBill) => prevBill + menu.harga);
  };

  const removeFromCart = (itemId) => {
    const itemToRemove = cart.find((item) => item.id === itemId);
    if (itemToRemove.quantity > 1) {
      const updatedCart = cart.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCart(updatedCart);
      setBill((prevBill) => prevBill - itemToRemove.harga);
    } else {
      const updatedCart = cart.filter((item) => item.id !== itemId);
      setCart(updatedCart);
      setBill((prevBill) => prevBill - itemToRemove.harga);
    }
  };

  const printSelectedMenus = () => {
    // Membuka jendela cetak hanya dengan menu yang dipilih
    const printContent = document.getElementById("selected-menus").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`/`} className="button is-warning">
          Kembali
        </Link>
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
            {menus.map((menu, index) => (
              <tr key={menu.id}>
                <td>{index + 1}</td>
                <td>{menu.nama}</td>
                <td>
                  {menu.harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td>
                  <button
                    onClick={() => addToCart(menu)}
                    className="button is-small is-info"
                  >
                    Tambah
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h2>Cart</h2>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item my-5">
                <span>
                  {item.quantity}x {item.nama} :{" "}
                  {item.harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}{" "}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="button is-small is-danger mx-5"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>
            Total: Rp.{" "}
            {bill.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
          {!isCartEmpty && (
            <button onClick={printSelectedMenus} className="button is-primary">
              Cetak
            </button>
          )}
        </div>
      </div>
      <div
        id="selected-menus"
        style={{ display: "none", marginTop: "5px", marginBottom: "5px" }}
      >
        <h4 style={{ textAlign: "center" }}>Cafe Sasame</h4>
        <center>
          <img
            src="https://lh3.googleusercontent.com/fife/ALs6j_ECt4pbqRyg_4ZipenMjloYsxishW0O21ZEyjZV9Qsrx-tKzqKU9VExw_TEZTrzP_VhVbyU1vCmkkQgUsOGec6I9l0q7XUYpuxs5G7isvRpqSLXtOZczqEZIjJ6sfkDSg6OEWrwuy2EQELwEUdL4iP2p966YSR20Yc-mUmlMOMeL0QDIm1XkmIxAdM0RVQt1TqrWcFtVbJRa_LSpUGNqHrE9ZxKEB3tqnofBV6T0khQMUmOCnhixCJtQltQz_33xoFTDcUINTvNBpXcmQ_A81cSSomr87yl6BsiqyYqXnHgOEEqAgHdm-wvnzsLYPBkm1YckCRRZyF7RIsr6gaV9nL-ZTwO_Xc0mbtDnkFKlw1fI4ndvkfcYN14Wlto9qhSXLSOJ_YZsnye470NeI_gcCJ8Edfb0FhkDDoixmbTTF7gvBRVaU8Hniuzm2dmWndvcXEWfhu7EWJ3hq5nAxc_yVCUxHa-t1jPoORix6_IVtHW-V0aE45cTNA0xx8essaJu6YN_4eFZB6ST08FGBuNv-opbJT3J62IGbqeNCJh0zxOcegojy1pZLzIx53PoXnrFm6HZczIkQwg3C_BiDTwOvSdgcLj0E8-AXrMOrlceFns_eGRbtXKYE-vu5CijMx_g2IGT25PuHEeHKbgaXWjcU9iqnxnhXnsh-z2-NsahB-EZZHoZz2WHzv88ILCA4pWFFkpluI2y8eRzXl6AIlFstbcLLWwDA-B8oPIlnMHa9N7pOkb4VTg5pb-HJS60cBKcORLc43VQFRo_eEmvCoB8AXu1ci0W2T6mibLTTCMcYflXLy0g7KGdfS4qB_6StKrrUC4Z9468BtXS6hHUK8hhBKlsO6sevxnVUgLt07AqMCCL2fr8kXeSXFqKUotOSleBWHEAZB77F4equr1GPkQ0ujGYgjiMU5MyQmY7YviRJR_lNC8gyLvcHhbr2FJ9EvVU0DQsn3nUbO5G5uyL8fZsjuIbwH3YuA0dlxC7SpddRDRB1RYzhN4NvfSoSACLEChrHJD-QsvplP0Ka9ST2tRUKC6NCm1qP1iEZVZ8ptnhwGzPtYm-7597VKG7o1k0c0wm4i_EcwG6KR71TaGEyMA2n68ny7hMJ03UBv78Qop7YH1WsFn_uGKvrH5K0NEmn5SIk99pqWjLhbmuId4VeywabWpkynFqbSTb6TAOXQj1MmOvDMUV5cEZTyHBAhBUD35SU03VsQEJ0YatR8yopjN-vebc5egMsp3NrUwefz_aXO0lZC3g5joB4miz2vCKCgeOQpTGnNzwuo_ZoNKCRsEFlYZ-R2LgsyRsGufdevQrbvz332yUNfTAWadaV7PPwk1YHE1vNCwcGI0EsBOByoKkdqxHcreYJv1FHzzSitmSsCHuZmyqvukuhwV88wLRIWlfiYymmtaUcKJpS6YBIWHyD6rMtFv5lLbHjrn1tmVnRLwvHnqjZrjsLPGAzlF2fI-BooBXEl7xitkgg8dVIJFSMQlb9ioTwDF5Z5ho0v8YL58ETOAN3dMQjskQ8sgXk0tEartIX3BafLGBQui8C4DiT7IG1hN31gRjo6mur8kgPZ-Pv9XF1QANPycalEJvWH-eOUlruhLbFhJwT-hWhfJeX1es89fYWC1abbD0tqchS6rJmyo2J4OcOeJx3O0WEcJGHLGQX8XsVgondZraAXTh-tLuchcwhawlANEQULqzqEhdRx3Us8qe63jUBA=w1919-h911"
            alt=""
            height={64}
            width={64}
          />
        </center>
        <div
          style={{
            borderTop: "1px solid black",
            marginTop: "15px",
            borderTopStyle: "dashed"
          }}
        ></div>
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item my-5">
              <span>
                {item.nama} <br />
                {item.quantity} x{" "}
                {item.harga.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}{" "}
              </span>
            </li>
          ))}
        </ul>
        <div
          style={{
            borderTop: "1px solid black",
            marginBottom: "15px",
            borderTopStyle: "dashed"
          }}
        ></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{fontWeight: "bold"}}>Total: Rp. </p>
          <p style={{fontWeight: "bold"}}>
            {bill.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
        <div
          style={{
            borderTop: "1px solid black",
            marginTop: "15px",
            borderTopStyle: "dashed"
          }}
        ></div>
      </div>
    </div>
  );
};

export default UserList;
