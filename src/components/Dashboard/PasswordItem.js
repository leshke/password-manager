import React, { useState } from 'react'
import { AppContext } from '../../state'

const PasswordItem = ({ login, password, hiddenPassword, name, id }) => {
    const { removePassword, editPassword } = AppContext()

    const [editMode, setEditMode] = useState(false)
    const [decrypt, setDecrypt] = useState(false)

    const [value, setValue] = useState({
        service: name,
        login: login,
        password: password,
    })

    const handleRemove = (e) => {
        const id = e.currentTarget.id
        removePassword(id)
    }

    const handleEdit = (e) => {
        setEditMode(!editMode)
    }

    const saveEditedData = (e) => {
        const id = Number(e.currentTarget.id)
        editPassword(id, value)
        setEditMode(!editMode)
    }

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

    const hidePassword = () => {
        setDecrypt(!decrypt)
    }

    return <tr>
        {
            editMode ?
                <>
                    <td><input onChange={onChangeInput} name='service' value={value.service}></input></td>
                    <td><input onChange={onChangeInput} name='login' value={value.login}></input></td>
                    <td><input onChange={onChangeInput} name='psw' value={value.password}></input></td>
                </> :
                <>
                    <td>{name}</td>
                    <td>{login}</td>
                    <td onClick={hidePassword}>{decrypt ? password : hiddenPassword}</td>
                </>
        }
        <td>
            <button id={id} className='btn del' onClick={handleRemove}>delete</button>
            {
                !editMode ?
                    <button id={id} className='btn edit' onClick={handleEdit}>edit</button> :
                    <button id={id} className='btn save' onClick={saveEditedData}>save</button>
            }
        </td>
    </tr>
}

export default PasswordItem
