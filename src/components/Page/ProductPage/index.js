import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Image, Header, Container, Statistic, Menu, Segment, Modal, Button, Dropdown, Icon } from 'semantic-ui-react'
import firebase from '../../../utils/firebase'
import './ProductPage.css'

export default function ProductPage({gender}) {
    const [productData, setProductData] = useState({})
    const [productStock, setProductStock] = useState([])
    const [nowColor, setNowColor] = useState({})
    const [nowSize, setNowSize] = useState('')
    const size = ['S','M','L','XL']
    const {id, firstdoc,twicecollection} = useParams()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [userUid, setuserUid] = useState(null)
    const [shopcarted, setShopcarted] = useState(false)

    useEffect(()=>{
        firebase
        .firestore()
        .collection(`${gender}`)
        .doc(firstdoc)
        .collection(twicecollection)
        .doc(id)
        .onSnapshot(docSnapshot=>{
            const data = docSnapshot.data()
            setProductData(data)
        })

        firebase.auth().onAuthStateChanged(user=>{
            setuserUid(user.uid)
        })

    }, [])
    useEffect(()=>{
        firebase
        .firestore()
        .collection(`${gender}`)
        .doc(firstdoc)
        .collection(twicecollection)
        .doc(id)
        .collection('stock')
        .onSnapshot(collectionSnapshot=>{
            const data = collectionSnapshot.docs.map(doc=>{
                const colorName = doc.id
                return {...doc.data(),colorName}
            })
            setProductStock(data)
            console.log(data)
        })
    },[])
    const handleClick =(e,{name})=>{
        setNowSize(name)
    }
    const colorChange =(e) =>{
        firebase
        .firestore()
        .collection(`${gender}`)
        .doc(firstdoc)
        .collection(twicecollection)
        .doc(id)
        .collection('stock')
        .doc(e.target.value)
        .onSnapshot(docSnapshot=>{
            const {id} = docSnapshot
            setNowColor({...docSnapshot.data(),id})
        })

        firebase.firestore().collection('user').doc(userUid).collection('shopcart').onSnapshot(collectionSnapshot=>{
            collectionSnapshot.docs.map(doc=>{
                if(doc.id === id) {
                    setShopcarted(true)
                }
            })
        })
    }

    const imageOnClick = (e) =>{
        setModalIsOpen(true)
        setImageUrl(e.target.currentSrc)
    }

    const addToShopcart = ()=>{
        firebase.firestore().collection('user').doc(userUid).collection('shopcart').doc(id).set({
            sex: gender,
            firstdoc,
            twicecollection,
            id,
            price: productData.price,
            imageUrl: productData.imageUrl[0],
            name: productData.name,
            count : 1,
            shopcartAt : firebase.firestore.Timestamp.now()
        })
    }
    return (
        <>
        <div className='product_top'>
        <div className='product_top_content'>
            <Image src={productData.imageUrl} size='medium' floated='left'/>
            <Container style={{maxWidth:'400px'}} as='span'>
                <Header>{productData.name}</Header>
                <div className='info_line'></div>
                NT$
                <Statistic color='red'>
                    <Statistic.Value>{productData.price}</Statistic.Value>
                    
                </Statistic>
                <Segment>
                    {
                        productStock.map(stock=>{
                            return (
                                <input 
                                type='button'
                                className={`color_button ${nowColor.id===stock.colorName && 'color_buttonClick'}`}
                                value={stock.colorName}
                                onClick={colorChange}
                                style={{backgroundColor:stock.colorName}}
                                key={stock.colorName}
                                />
                            )
                        })
                    }
                </Segment>
                <Menu widths={size.length}>
                    {
                        firstdoc !== 'accessory' && size.map(size=>{
                            return (
                                <Menu.Item onClick={handleClick} name={size} active={nowSize === size} key={size}/>
                            )
                        })
                    }
                </Menu>
                {
                    (nowColor.S || nowColor.count) && 
                    <Segment basic>
                        <Header size='huge'>剩餘庫存</Header>
                        {firstdoc === 'accessory' 
                        ? productStock.map(obj=>{
                            if(obj.colorName === nowColor.id) {
                                return <Header size='huge'>{obj.count}</Header>
                            }
                        })
                        : size.map(size=>{
                            return (
                                <>
                                    <Header size='medium' color={nowSize === size && 'red'} key={size + 'count'}>
                                        {size} : {' '}
                                        <Header as='span'>
                                            {size === 'S' && nowColor.S}
                                            {size === 'M' && nowColor.M}
                                            {size === 'L' && nowColor.L}
                                            {size === 'XL' && nowColor.XL}
                                        </Header>
                                    </Header>
                                </>
                            )
                        })}
                        {   
                            (nowSize || firstdoc === 'accessory') ? 
                            shopcarted 
                            ? <Button>已加入購物車</Button> 
                            : <Button positive onClick={addToShopcart}>加至購物車</Button>
                            : <></>
                        }
                    </Segment>
                }
            </Container>
        </div>
        </div>
        {
            productData.imageUrl?.map(url=>{
                return (
                    <>
                        <Image src={url} key={url} style={{paddingTop:'10%'}} onClick={imageOnClick} size='big'   />
                        <Modal open={modalIsOpen} size='small'>
                            <Modal.Actions>
                                <Button onClick={()=>setModalIsOpen(false)}><Icon name='times'/></Button>
                            </Modal.Actions>
                            <Modal.Content>
                                <Image src={imageUrl} />
                            </Modal.Content>
                        </Modal>
                    </>   
                )
            })
        }
        </>
    )
}
