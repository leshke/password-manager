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
        const id = e.currentTarget.parentNode.parentNode.id
        removePassword(id)
    }

    const handleEdit = (e) => {
        setEditMode(!editMode)
    }

    const saveEditedData = (e) => {
        const id = Number(e.currentTarget.parentNode.parentNode.id)
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

    return <tr id={id}>
        {
            editMode ?
                <td><input onChange={onChangeInput} name='service' value={value.service}></input></td> :
                <td>{name}</td>
        }
        {
            editMode ?
                <td><input onChange={onChangeInput} name='login' value={value.login}></input></td> :
                <td>{login}</td>
        }
        {
            editMode ?
                <td><input onChange={onChangeInput} name='psw' value={value.password}></input></td> :
                <td onClick={hidePassword}>{decrypt ? password : hiddenPassword}</td>
        }
        <td>
            <button className='btn del' onClick={handleRemove}>delete</button>
            {
                !editMode ?
                    <button className='btn edit' onClick={handleEdit}>edit</button> :
                    <button className='btn save' onClick={saveEditedData}>save</button>
            }
        </td>
    </tr>
}

export default PasswordItem
