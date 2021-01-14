import { AppContext } from "../../state";
import s from '../SignUp/SignUp.module.css'

const Logout = () => {
    const {setAuth } = AppContext()

    const onLogout = () => {
        setAuth(false)
    }

    return <div className={s.logout}>
        <button className='btn logout' onClick={onLogout}>Logout</button>
    </div>
}

export default Logout