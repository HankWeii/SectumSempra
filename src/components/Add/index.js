import React from 'react'
import { useState } from 'react'
import { Input, Header, Button } from 'semantic-ui-react'
import firebase from '../../utils/firebase'

export default function Add() {
    const [firstCollection, setFirstCollection] = useState('')
    const [firstDoc, setFirstDoc] = useState('')
    const [twiceCollection, setTwiceCollection] = useState('')
    const [twiceDoc, setTwiceDoc] = useState('')
    const [thirdDoc, setThirdDoc] = useState('')
    const prodeuctId = 
    {
        imageUrl:[], //第一張為封面
        name:'', 
        price:''
    }
    const color = {
        S: 0,
        L: 0,
        X: 0,
        XL: 0
    }
    const createProduct = ()=>{
        firebase
        .firestore()
        .collection(firstCollection)
        .doc(firstDoc)
        .collection(twiceCollection)
        .doc(twiceDoc)
        .update({
            imageUrl:['https://firebasestorage.googleapis.com/v0/b/sectumsempra-1ffde.appspot.com/o/women%2Faccessory%2F263093462_1286460315513109_1763013142894628597_n.png?alt=media&token=8ac883a5-73b8-4a3e-8417-17e2ef13f009'], //第一張為封面
            name:'貓貓', 
            price:'1234'
        })
        firebase
        .firestore()
        .collection(firstCollection)
        .doc(firstDoc)
        .collection(twiceCollection)
        .doc(twiceDoc)
        .collection('stock')
        .doc(thirdDoc)
        .set({
            S: 1,
            L: 2,
            X: 3,
            XL: 4
        })
    }
    return (
        <>
            <Header>Sex (first collection)</Header>
            <Input placeholder='Ex: women...' value={firstCollection} onChange={(e)=>setFirstCollection(e.target.value)}/>
            <Header>Kind (first doc)</Header>
            <Input placeholder='Ex: shirt...' value={firstDoc} onChange={(e)=>setFirstDoc(e.target.value)}/>
            <Header>Kind (twice collection)</Header>
            <Input placeholder='Ex: shirt...' value={twiceCollection} onChange={(e)=>setTwiceCollection(e.target.value)}/>
            <Header>Product id (twice doc)</Header>
            <Input placeholder='any' value={twiceDoc} onChange={(e)=>setTwiceDoc(e.target.value)} />
            <hr />
            <Header>stock</Header>
            <Header>color (third doc)</Header>
            <Input placeholder='Ex: #676363' value={thirdDoc} onChange={(e)=>setThirdDoc(e.target.value)} />
            <h2 style={{color:'red'}}>請先去Add改資料再按建立</h2>
            <Button onClick={createProduct}>建立</Button>
        </>
    )
}
