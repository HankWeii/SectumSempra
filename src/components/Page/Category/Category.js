import React from 'react'
import { Menu } from 'semantic-ui-react'
import firebase from '../../../utils/firebase'
import 'firebase/compat/firestore'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'



export default function Category({gender}) {
    const [data, setData] = useState([])
    const [activeItem, setActiveItem] = useState('')
    useEffect(()=>{
        firebase
        .firestore()
        .collection(`${gender}`)
        .get()
        .then(collectionSnapshot=>{
            const data = collectionSnapshot.docs.map(doc=>{
                const id = doc.id
                return {...doc.data(),id}
            })
            setData(data)
        })
    }, [])
    const handleActive= (e, {name})=>{
        setActiveItem(name)
    }
    return (
        <Menu pointing secondary vertical color='teal'>
            {
                data.map((data)=>{
                    firebase.firestore().collection(`${gender}`).doc(data.id).update({
                        path: `/${gender}/${data.id}`
                    })
                    return(
                        <Menu.Item 
                        key={data.id} 
                        name={data.name}
                        active={activeItem === data.name}
                        onClick={handleActive}
                        as={Link}
                        to={`/${gender}/${data.id}`}
                        />
                    )
                })
            }
        </Menu>
    )
}
