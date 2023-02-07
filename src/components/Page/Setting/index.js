import React from 'react'
import { useEffect, useState } from 'react'
import { Header, Button, Segment, Modal, Input, Message, Grid, Divider } from 'semantic-ui-react'
import firebase from '../../../utils/firebase'
import './Setting.css'

const DisplayName = ({user})=>{
    const [modalOpen, setModalOpen] = useState(false)
    const [newDisplayName, setNewDisplayName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleChangeName =()=>{
        setIsLoading(true)
        firebase.auth().currentUser.updateProfile({
            displayName: newDisplayName
        }).then(()=>{
            setModalOpen(false)
            setIsLoading(false)
        })
    }
    return(
        <>
            <Header size='small'>
                用戶名稱
                <Button floated='right' onClick={()=>setModalOpen(true)}>修改</Button>
            </Header>
            <Segment vertical>{user.displayName}</Segment>
            <Modal open={modalOpen}>
                <Modal.Header>修改用戶名稱</Modal.Header>
                <Modal.Content>
                    <Input 
                        placeholder='輸入新用戶名稱' 
                        value={newDisplayName} 
                        onChange={e=>setNewDisplayName(e.target.value)}
                        fluid
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={handleChangeName} loading={isLoading}>確定</Button>
                    <Button onClick={()=>setModalOpen(false)}>取消</Button>
                </Modal.Actions>
            </Modal>
        </>
        
    )
}

function Password({user}) {
    const [modalOpen, setModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isError, setIsError] = useState('')
    const changePassword =()=>{
        if(oldPassword === newPassword) {
            setIsError('新密碼不得和舊密碼相同')
            return
        }
        setIsError(true)
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword)
        user.reauthenticateWithCredential(credential).then(()=>{
            user.updatePassword(newPassword).then(()=>{
                setModalOpen(false)
                setOldPassword('')
                setNewPassword('')
                setIsError('')
                setIsLoading(false)
            }).catch(error=>{
                setIsError('密碼需至少6個字元')
                setIsLoading(false)
            })
        }).catch(error=>{
            setIsError('密碼錯誤')
            setIsLoading(false)
        })
    }

    return (
        <>
            <Header size='small'>
                密碼
                <Button floated='right' onClick={()=>setModalOpen(true)}>修改</Button>
            </Header>
            <Segment vertical>*******</Segment>
            <Modal open={modalOpen} size='mini'>
                <Modal.Header>更改密碼</Modal.Header>
                <Modal.Content>
                    <Modal.Header>密碼</Modal.Header>
                    <Input fluid placeholder='輸入密碼' value={oldPassword} onChange={e=>setOldPassword(e.target.value)} />
                    <Modal.Header>新密碼</Modal.Header>
                    <Input fluid placeholder='輸入新密碼' value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
                    {isError && <Message negative>{isError}</Message>}
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={changePassword} loading={isLoading}>確定</Button>
                    <Button onClick={()=>{setModalOpen(false);setIsError('');setOldPassword('');setNewPassword('')}}>取消</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default function Setting({user}) {
    return(
    <div className='middle'>
        <div className='setting_content'>
            <Header size='huge' >設定</Header>
            <Divider />
            <DisplayName user={user} />
            <Password user={user} />
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>    
    </div>
    )
}