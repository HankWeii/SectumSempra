import React from 'react'
import { useEffect, useState } from 'react'
import { Header, Divider, Image, Icon, Statistic, Button } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import firebase from '../../../utils/firebase'
import './Shopcart.css'

export default function Shopcart({userUid}) {
    const [shopcartData, setShopcartData] = useState([])
    let number = 0;
    let totalCount = 0
    let totalPrice = 0
    const navigate = useNavigate()

    useEffect(()=>{
        userUid ? 
        firebase.firestore().collection('user').doc(userUid).collection('shopcart').orderBy('shopcartAt','desc').onSnapshot(collectionSnapshot=>{
            const data = collectionSnapshot.docs.map(doc=>{
                const {id} = doc
                const data = doc.data()
                return {...data,id}
            })
            setShopcartData(data)
        })
        : navigate('/signin')
    }, [])

    const deleteShopcart = (productObj)=>{
        const {id} = productObj
        firebase.firestore().collection('user').doc(userUid).collection('shopcart').doc(id).delete()
    }
    return (
        <div className='pageOuter'>
            <div className='pageBoder'>
                <Header size='huge' textAlign='center' style={{marginBottom:'20px'}}>購物車</Header>
                {
                    shopcartData.map(productObj=>{
                        number += 1
                        totalCount += productObj.count
                        totalPrice += productObj.price * 1
                        return (
                            <div className='product_info' key={productObj.id}>
                                <span className='shopcart_number'>{number}</span>
                                <span className='shopcart_product_image'>
                                    <Image src={productObj.imageUrl}  size='small'/>
                                </span>
                                <span className='shopcart_product_name'>
                                    <Link to={`/${productObj.sex}/${productObj.firstdoc}/${productObj.twicecollection}/${productObj.id}`}>
                                        {productObj.name}
                                    </Link>
                                </span>
                                <span className='shopcart_count'>1</span>
                                <span className='shopcart_product_price'>
                                    <Statistic size='mini' color='red'>
                                        <Statistic.Value>{productObj.price}</Statistic.Value>
                                    </Statistic>
                                </span>
                                <span>
                                    <Icon name='times' onClick={()=>deleteShopcart(productObj)} />
                                </span>                    
                            </div>
                        )
                    })
                }
                <Divider horizontal>Total</Divider>
                <div className='total_container'>
                    <span className='total_text'>
                        共
                        <Statistic size='small' color='red'>
                            <Statistic.Value>{totalCount}</Statistic.Value>
                        </Statistic>
                        件
                    </span>
                    <span className='total_text'>
                        NT$
                        <Statistic size='small' color='red'>
                            <Statistic.Value>{totalPrice}</Statistic.Value>
                        </Statistic>
                    </span>
                    <Button color='green'>結帳去</Button>
                </div>
            </div>
        </div>
    )
}
