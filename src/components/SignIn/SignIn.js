import { useState } from "react";
import { AppContext } from "../../state";
import s from '../SignUp/SignUp.module.css'

const SignIn = ({ history }) => {
    const { setAuth } = AppContext()
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
        const userData = JSON.parse(localStorage.getItem('users'));
        const user = userData.find(item => item.login === name && item.password === psw)
        if (user) {
            setAuth(true)
            history.push(`/dashboard/${user.id}`)
        }
        else {
            setError(!error)
        }
    }

    return <div className={s.login}>
        <h3>Enter your login and password</h3>
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
    </div>
}

export default SignIn