import { useState } from "react";
import { AppContext } from "../../state";
import s from './SignUp.module.css'

const SignUp = ({ history }) => {
  const { addUser } = AppContext()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const onChangeInput = (e) => {
    if (e.target.name === 'name') {
      setLogin(e.target.value);
    }
    else if (e.target.name === 'psw') {
      setPassword(e.target.value);
    }
  }

  const onSubmit = (name, psw) => (e) => {
    if (name && psw) {
      e.preventDefault()
      const user = { name, psw }
      addUser(user)
      history.push("/login")
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
    </form>
  </div >
}

export default SignUp