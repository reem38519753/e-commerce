import axios from "axios";
import { useState } from "react";
import { baseURL, LOGIN } from "./../../API/Api";
import "./Auth.css";
import LoadingSubmit from "../../Components/Dashbord/Loading";
import Cookie from "cookie-universal";
import { Form } from 'react-bootstrap';

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ================ Loading ================
  const [loading, setLoading] = useState(false);


  // ================ Cookie ==================
  const cookie = Cookie();

  // ================ Error ================
  const [err, setErr] = useState("");

  // تحتوى على الحدث الذى يتم داخل المدخلات
  function handelChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ارسال البيانات الموجوده فى المدخلات
  async function handelSubmit(e) {
    e.preventDefault();
    // عمل لودنج اثناء ارسال البيانات
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, {
        email: form.email,
        password: form.password,
      });

      // الغاء اللودنج بعد ارسال البيانات
      setLoading(false);
      
      // حفظ التوكين
      const token = res.data.token;
      cookie.set('e-commerce', token);
      // انتقل الى الصفحة الرئيسية
      window.location.pathname = "/users";
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("ًWrong Email Or Password ");
      } else {
        setErr("Enternal server Error");
      }
    }
  }

  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="container">
        <div className="row vh-100">
          <form className="form" onSubmit={handelSubmit}>
            <div className="custom-form">
              <h1 className="mb-5">Login</h1>
              <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
                <Form.Control
                  value={form.email}
                  name="email"
                  onChange={handelChange}
                  type="email" 
                  placeholder="Enter your email .."
                  required
                  />
                <Form.Label>Email</Form.Label>
              </Form.Group>

              <Form.Group className="form-custom" controlId="exampleForm.ControlInput2">
                <Form.Control
                  value={form.password}
                  name="password"
                  onChange={handelChange}
                  type="password"
                  placeholder="Enter your password .."
                  minLength="6"
                  required />
                <Form.Label>Password:</Form.Label>
              </Form.Group>

              <button className="btn btn-primary">Login</button>
              
              <a href="http://127.0.0.1:8000/login-google" class="login-with-google-btn" >
                Login with Google
              </a>

              {err !== "" && <span className="error">{err}</span>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
