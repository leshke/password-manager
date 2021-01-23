import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../state";
import s from '../SignUp/SignUp.module.css'

const SignIn = ({ history }) => {
    const { setAuth, state } = AppContext()
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
        const user = state.find(item => item.login === name && item.password === psw)

        if (user) {
            setAuth(user.id)
            history.push(`/dashboard/${user.id}`)
        }
        else {
            setError(!error)
        }
    }

    return <div className={s.login}>
        <h3>Sign IN</h3>
        <form>
            <label htmlFor="uname">
                <b>Username</b>
            </label>
            <input value={login} onChange={onChangeInput} type="text" placeholder="Login" name="name" />
            <label htmlFor="psw">
                <b>Password</b>
            </label>
            <input value={password} onChange={onChangeInput} type="password" placeholder="Password" name="psw" />
            <div>
                <button className='btn' onClick={onSubmit(login, password)} type="submit">Submit</button>
            </div>
            {error ? <span>Wrong data</span> : ''}
        </form>
        <hr />
        <NavLink to='/registration'>Create new account</NavLink>
    </div>
}

export default SignIn