import React from 'react'
import { useEffect, useState } from 'react'
import firebase from '../../../utils/firebase'
import TemplatePage from '../Templates/TemplatePage'
import 'firebase/compat/storage'
import { useLocation } from 'react-router-dom'

export default function Women(props) {
    const [data, setData] = useState([])
    const location = useLocation()
    console.log(props)
    useEffect(()=>{
        firebase
        .firestore()
        .collection(`${props.gender}`)
        .doc(`${props.category}`)
        .collection(`${props.categorys}`)
        .onSnapshot(collectionSnapshot=>{
            const data = collectionSnapshot.docs.map(doc=>{
                const {id} = doc
                const firstDoc = props.category
                const twiceCollection = props.categorys
                return {...doc.data(),id,firstDoc,twiceCollection}
            })
            setData(data)
            console.log(data)
        })
    },[location.pathname])
    
    return (
        <div style={{display:'flex',flexWrap: 'wrap',justifyContent: 'space-between'}}>
        {
            data.map(data=>{
                return(
                    <TemplatePage data={data} key={data.id} gender={props.gender}/>
                )
            })
        }
        </div>
    )
}
