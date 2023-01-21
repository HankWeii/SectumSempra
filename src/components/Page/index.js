import React from 'react'
import { useEffect, useState } from 'react'
import Signin from './Signin'
import FontPage from './FontPage'
import WomenNavigate from './WomenNavigate'
import MenNavigate from './MenNavigate'
import AboutBrand from './AboutBrand'
import Shopcart from './Shopcart'
import Add from '../Add'
import { Route, Routes } from 'react-router-dom'
import firebase from '../../utils/firebase'
import 'firebase/compat/auth'

export default function Page() {
    const [userUid, setUserUid] = useState(null)

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            setUserUid(user.uid)
        })
    }, [])


    return (
        <Routes>
            <Route path='/women/*' element={<WomenNavigate />}/>
            <Route path='/men/*' element={<MenNavigate />} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/' element={<FontPage />} />
            <Route path='/SectumSempra' element={<FontPage />} />
            <Route path='/about_brand' element={<AboutBrand />} />
            <Route path='/shopcart' element={<Shopcart userUid={userUid}/>}/>
            <Route path='/add' element={<Add />} />
        </Routes>
    )
}
