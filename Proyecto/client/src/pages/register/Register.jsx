import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Registro</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Nombre de usuario</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Ingrese su nombre de usuario..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Correo electrónico</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Introduce tu correo electrónico..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Contraseña</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Ingresa tu contraseña..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
        Registro
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>¡Algo salió mal!</span>}
    </div>
  );
}
