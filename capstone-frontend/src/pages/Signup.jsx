import { useState } from 'react'
import { signup } from '../services/AuthService';
import { useNavigate } from 'react-router';
import { useUserStore } from '../store/UserStore';

const Signup = () => {
  const { authSuccess } = useUserStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
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
        const data = await signup(formData);
        authSuccess({ email: data.email, username: data.username, role: data.role });
        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <br />
            <input type="text" name="username" id="username" placeholder='Enter Username' required value={formData.username} onChange={handleChange} />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" name="email" id="email" placeholder='Enter Email' required value={formData.email} onChange={handleChange} />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name="password" id="password" placeholder='Enter Password' required value={formData.password} onChange={handleChange} />
            <br />
            <button type="submit">Create Account</button>
        </form>
    </div>
  )
}

export default Signup