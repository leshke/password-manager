import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../state";
import s from './SignUp.module.css'

const SignUp = ({ history }) => {
  const { addUser, state } = AppContext()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const onChangeInput = (e) => {
    if (e.target.name === 'name') {
      setLogin(e.target.value);
    }
    else if (e.target.name === 'psw') {
      setPassword(e.target.value);
    }
  }

  const onSubmit = (name, psw) => (e) => {
    e.preventDefault()
    const user = state.some(item => item.login === name)
    if (!user) {
      const user = { name, psw }
      addUser(user)
      history.push("/login")
    }
    else {
      setError(!error)
    }
  }

  return <div className={s.registration}>
    <h3>Sign UP</h3>
    <form>
      <label htmlFor="uname">Username</label>
      <input value={login} onChange={onChangeInput} type="text" placeholder="Create Username" name="name" required />
      <br />
      <label htmlFor="psw">Password</label>
      <input value={password} onChange={onChangeInput} type="password" placeholder="Create Password" name="psw" required />
      <div>
        <button className='btn' onClick={onSubmit(login, password)} type="submit">Create account</button>
      </div>
      {error ? <span className='error'>Existing Login name</span> : ''}
    </form>
    <hr />
    <span>If you have an existing account </span>
    <NavLink to='/login'> go to Login page</NavLink>
  </div >
}

export default SignUp