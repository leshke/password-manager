import React, { useContext } from 'react';
import { useLocalStorage } from './hook/useLocalStorage';

const initialState = []

const Context = React.createContext()

export const AppContext = () => useContext(Context)

const AppProvider = ({ children }) => {
    const [state, setState] = useLocalStorage('state', initialState)

    const addUser = (u) => {
        const user = {
            id: state.length ? state[state.length - 1].id + 1 : 1,
            login: u.name,
            password: u.psw,
            isAuth: false,
            passwordData: []
        }

        setState([...state, user])
    }

    const setAuth = (userID) => {
        const authorizeUser = state.map(item => {
            return item.id === userID ?
                {
                    ...item,
                    isAuth: true
                } :
                { ...item }
        })

        setState(authorizeUser)
    }

    const setLogout = (userID) => {
        const logOutUser = state.map(item => {
            return item.id === userID ?
                {
                    ...item,
                    isAuth: false
                } :
                { ...item }
        })

        setState(logOutUser)
    }

    const addPassword = (data) => {
        const newItem = {
            id: Date.now(),
            name: data.service,
            login: data.login,
            password: data.password,
            hiddenPassword: data.password.split('').map(item => item = '*').join('')
        }

        const result = state.map((item) => {
            if (item.isAuth) {
                return { ...item, passwordData: [...item.passwordData, newItem] }
            }
            return { ...item }
        })

        setState(result);
    }

    const removePassword = (id) => {
        const result = state.map(item => {
            if (item.isAuth) {
                let filtered = item.passwordData.filter(pass => {
                    return Number(id) !== pass.id
                });
                return { ...item, passwordData: filtered }
            }
            return { ...item }
        });

        setState(result);
    }

    const editPassword = (id, data) => {
        const result = state.map(item => {
            if (item.isAuth) {
                const edited = item.passwordData.map(item => {
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
                return { ...item, passwordData: edited }
            }
            return { ...item }
        });

        setState(result);
    }

    return (
        <Context.Provider value={{
            state,
            setAuth,
            setLogout,
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