import { useHistory } from "react-router-dom";
import { AppContext } from "../../state";
import s from '../SignUp/SignUp.module.css'

const Logout = () => {
    const { state, setLogout } = AppContext()

    const authorizedUser = state.find(item => item.isAuth)

    const history = useHistory()

    const onLogout = () => {
        setLogout(authorizedUser.id)
        history.push('/login')
    }

    return <div className={s.logout}>
        <button className='btn logout' onClick={onLogout}>Logout</button>
    </div>
}

export default Logout