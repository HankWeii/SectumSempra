import React from 'react'
import { useEffect, useState } from 'react'
import Category from './Category/Category'
import Women from './Women/Women'
import ProductPage from './ProductPage'
import { Route, Routes, Link } from 'react-router-dom'
import { Grid, Image, Divider } from 'semantic-ui-react'
import firebase from '../../utils/firebase'

function WomenFontPage() {
    const [data, setData] = useState(null)
    useEffect(()=>{
        firebase.firestore().collection('allFontpageData').doc('womenFontpage').onSnapshot(docSnapshot=>{
            const data = docSnapshot.data()
            setData(data)
            console.log(data)
        })
    }, [])
    return (
        <>
            {
                data &&
                <>
                <Image src={data.imageUrl} />
                <Divider />
                <h2>熱門商品:</h2>
                {data.hotImageUrl.map(url=>
                    <Image src={url} key={url} size='small' as={Link} to='/women/vest/vest/product1' />
                )}
                </>
            }
        </>
    )
}

export default function WomenNavigate() {

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={1}>
                    <div></div>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Category gender='women'/>
                </Grid.Column>
                <Grid.Column width={9}>
                    <Routes>
                        <Route path='/' element={<WomenFontPage />} />
                        <Route path='/accessory' element={<Women gender='women' category='accessory' categorys='shades'/>}/>
                        <Route path='/vest' element={<Women gender='women' category='vest' categorys='vest'/>} />
                        <Route path='/:firstdoc/:twicecollection/:id' element={<ProductPage gender='women'/>} />
                    </Routes>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
