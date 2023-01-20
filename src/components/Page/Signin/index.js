import React from 'react'
import { Container, Menu, Form, Message } from 'semantic-ui-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import firebase from '../../../utils/firebase'
import 'firebase/compat/auth'

export default function Signin() {
    const [activeItem, setActiveItem] = useState('signin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit =()=>{
        setIsLoading(true)
        if(activeItem === 'register') {
            if(password !== passwordCheck) {
                setError('確認密碼不一致')
                setIsLoading(false)
                return
            }
            firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(()=>{
                navigate('/')
                setIsLoading(false)
            })
            .catch(error=>{
                switch(error.code) {
                    case 'auth/invalid-email':
                        setError('信箱格式錯誤')
                        setIsLoading(false)
                        break;
                    case 'auth/email-already-in-use':
                        setError('此信箱已註冊')
                        setIsLoading(false)
                        break;
                    case 'auth/weak-password':
                        setError('密碼強度過弱')
                        setIsLoading(false)
                        break;
                    default:
                        break;
                }
            })
        } else if (activeItem === 'signin') {
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(()=>{
                navigate('/')
                setIsLoading(false)
            })
            .catch(error=>{
                switch(error.code){
                    case 'auth/wrong-password':
                        setError('信箱或密碼錯誤')
                        setIsLoading(false)
                        break;
                    case 'auth/user-not-found':
                        setError('信箱或密碼錯誤')
                        setIsLoading(false)
                        break;
                    case 'auth/invalid-email':
                        setError('信箱格式錯誤')
                        setIsLoading(false)
                        break;
                    default:
                        break;
                }
            })
        }

    }
    return (
        <Container>
            <Menu widths={2}>
                <Menu.Item active={activeItem === 'signin'} onClick={()=>{setActiveItem('signin');setError('')}}>登入</Menu.Item>
                <Menu.Item active={activeItem === 'register'} onClick={()=>{setActiveItem('register');setError('')}}>註冊</Menu.Item>
            </Menu>
            <Form onSubmit={onSubmit}>
                <Form.Input label='Email' placeholder='請輸入信箱' value={email} onChange={e=>setEmail(e.target.value)}/>
                <Form.Input label='Password' type='password' placeholder='請輸入密碼' value={password} onChange={e=>setPassword(e.target.value)}/>
                {activeItem === 'register' && <Form.Input label='確認密碼' type='password' placeholder='請輸入密碼' value={passwordCheck} onChange={e=>setPasswordCheck(e.target.value)} />}
                {
                    error && <Message negative>{error}</Message>
                }
                <Form.Button loading={isLoading}>
                    {activeItem === 'signin' && '登入'}
                    {activeItem === 'register' && '註冊'}
                </Form.Button>
            </Form>
        </Container>
    )
}
