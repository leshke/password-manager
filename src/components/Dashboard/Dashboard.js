import React, { useState } from 'react'
import { AppContext } from '../../state'
import s from './Dashboard.module.css'
import Modal from './Modal'
import PasswordItem from './PasswordItem'

const Dashboard = () => {
    const { state } = AppContext()
    const [open, settoggleModal] = useState(false)

    const openModal = () => {
        settoggleModal(true)
    }

    const closeModal = () => {
        settoggleModal(false)
    }

    const data = state.map(item => <PasswordItem key={item.id} {...item} />)

    return <>
        <button className='btn add' onClick={openModal}>New password</button>
        <Modal open={open} closeModal={closeModal} />
        <table className={s.table}>
            <tbody>
                <tr>
                    <th>Service</th>
                    <th>Login</th>
                    <th>Password <br />(click to encrypt)</th>
                    <th>Settings</th>
                </tr>
                {data}
            </tbody>
        </table>
        {state.length === 0 ? <h2>Add new password</h2> : ''}
    </>
}

export default Dashboard


