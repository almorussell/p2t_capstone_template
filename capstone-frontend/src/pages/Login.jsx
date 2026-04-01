import { useState } from 'react'
import { login } from '../services/AuthService';
import { useNavigate } from 'react-router';
import { useUserStore } from '../store/UserStore';

const Login = () => {
  const { authSuccess } = useUserStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
        const data = await login(formData);
        authSuccess({ email: data.email, role: data.role, username: data.username });
        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" name="email" id="email" placeholder='Enter Email' required value={formData.email} onChange={handleChange} />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name="password" id="password" placeholder='Enter Password' required value={formData.password} onChange={handleChange} />
            <br />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login