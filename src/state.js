import React, { useContext } from 'react';
import { useLocalStorage } from './hook/useLocalStorage';

const initialState = {
    users: [],
    passwords: [],
    isAuth: false
}

const Context = React.createContext()

export const AppContext = () => useContext(Context)

const AppProvider = ({ children }) => {
    const [state, setState] = useLocalStorage('passwords', initialState.passwords)
    const [users, setUser] = useLocalStorage('users', initialState.users)
    const [auth, setAuth] = useLocalStorage('auth', initialState.isAuth)

    const addUser = (u) => {
        const user = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            login: u.name,
            password: u.psw,
        }
        setUser([...users, user])
    }

    const addPassword = (item) => {
        const newItem = {
            id: state.length ? state[state.length - 1].id + 1 : 1,
            name: item.service,
            login: item.login,
            password: item.password,
            hiddenPassword: item.password.split('').map(item => item = '*').join('')
        }
        setState([...state, newItem])
    }

    const removePassword = (id) => {
        const filtered = state.filter(pass => {
            return Number(id) !== pass.id
        });
        setState(filtered);
    }

    const editPassword = (id, data) => {
        const edited = state.map(item => {
            return item.id === id ?
                {
                    ...item,
                    name: data.service,
                    login: data.login,
                    password: data.password,
                    hiddenPassword: data.password.split('').map(item => item = '*').join('')
                } :
                { ...item }
        });
        setState(edited);
    }

    return (
        <Context.Provider value={{
            state,
            users,
            auth,
            setAuth,
            addUser,
            addPassword,
            removePassword,
            editPassword
        }}>
            {children}
        </Context.Provider>
    )
}

export default AppProvider