import React from 'react'
import { useEffect, useState } from 'react'
import Signin from './Signin'
import FontPage from './FontPage'
import WomenNavigate from './WomenNavigate'
import MenNavigate from './MenNavigate'
import AboutBrand from './AboutBrand'
import Shopcart from './Shopcart'
import Add from '../Add'
import Setting from './Setting'
import { Route, Routes, useNavigate, Link } from 'react-router-dom'
import { Icon, Modal } from 'semantic-ui-react'
import firebase from '../../utils/firebase'
import 'firebase/compat/auth'
import './Page.css'

export default function Page() {
    const [userUid, setUserUid] = useState(null)
    const [user, setUser] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            setUserUid(user.uid)
            setUser(user)
        })
    }, [])

    const iconName = ['shop','setting','question circle']
    const handleClick = (e, name)=>{
        switch (name.name) {
            case 'shop' :
                navigate('/shopcart')
                return;
            case 'setting' :
                navigate('/setting')
                return;
            default :
                return;
        }
    }

    return (
        <>
        <div className='cellphone_item'>
            <div>
                <Icon name='block layout' size='huge' color='grey' onClick={()=>setModalIsOpen(true)} />
            </div>
            {
                iconName.map(iconName =>{
                    return (
                        <div>
                            <Icon name={iconName} size='huge' color='grey' onClick={(e, name)=>handleClick(e, name)} />
                        </div>
                    )
                })
            }
        </div>
        <Routes>
            <Route path='/women/*' element={<WomenNavigate />}/>
            <Route path='/men/*' element={<MenNavigate />} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/' element={<FontPage />} />
            <Route path='/SectumSempra/' element={<FontPage />} />
            <Route path='/about_brand' element={<AboutBrand />} />
            <Route path='/shopcart' element={<Shopcart userUid={userUid}/>}/>
            <Route path='/add' element={<Add />} />
            <Route path='/setting' element={<Setting user={user} />} />
        </Routes>
        <Modal open={modalIsOpen} onClose={()=>setModalIsOpen(false)} onOpen={()=>setModalIsOpen(true)}>
            <Modal.Content>
                <Link to='/women' onClick={()=>setModalIsOpen(false)}>Women</Link>
            </Modal.Content>
            <Modal.Content>
                <Link to='/men' onClick={()=>setModalIsOpen(false)}>Men</Link>
            </Modal.Content>
            <Modal.Content>
                <Link to='/kids' onClick={()=>setModalIsOpen(false)}>Kids</Link>
            </Modal.Content>
            <Modal.Content>
                <Link to='/baby' onClick={()=>setModalIsOpen(false)}>Baby</Link>
            </Modal.Content>
        </Modal>
        </>
    )
}
