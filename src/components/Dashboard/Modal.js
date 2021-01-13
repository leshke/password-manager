import { useState } from "react";
import { AppContext } from "../../state";
import s from './Dashboard.module.css'

const Modal = ({ open, closeModal }) => {
    const { addPassword } = AppContext()

    const [value, setValue] = useState({
        service: '',
        login: '',
        password: '',
    })

    const onChangeInput = (e) => {
        if (e.target.name === 'service') {
            setValue({ ...value, service: e.target.value });
        }
        else if (e.target.name === 'login') {
            setValue({ ...value, login: e.target.value });
        }
        else if (e.target.name === 'psw') {
            setValue({ ...value, password: e.target.value });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!!value.service && !!value.login && !!value.password) {
            addPassword(value)
            setValue(value.service = '', value.login = '', value.password = '')
            closeModal()
        }
    }

    if (!open) {
        return null;
    }

    return <div className={s.modalContainer}>
        <div className={s.modalWindow}>
            <button className={s.closeModal} onClick={closeModal}>&times;</button>
            <div className={s.modalContent}>
                <form>
                    <label>Service</label>
                    <input value={value.service} name="service" onChange={onChangeInput} placeholder='Enter the name of service'></input>
                    <br />
                    <label>Login</label>
                    <input value={value.login} name="login" onChange={onChangeInput} placeholder='Enter your login'></input>
                    <br />
                    <label>Password</label>
                    <input type='password' value={value.password} name="psw" onChange={onChangeInput} placeholder='Enter your password'></input>
                    <br />
                    <button className='btn subm' onClick={onSubmit} type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
}

export default Modal