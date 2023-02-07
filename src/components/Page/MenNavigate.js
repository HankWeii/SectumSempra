import React from 'react'
import { useState, useEffect } from 'react'
import WomenCategory from './Category/Category'
import Women from './Women/Women'
import ProductPage from './ProductPage'
import { Route, Routes, Link } from 'react-router-dom'
import { Grid, Image, Divider } from 'semantic-ui-react'
import firebase from '../../utils/firebase'

function MenFontPage() {
    const [data, setData] = useState(null)
    useEffect(()=>{
        firebase.firestore().collection('allFontpageData').doc('menfontpage').onSnapshot(docSnapshot=>{
            const data = docSnapshot.data()
            setData(data)
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
                    <WomenCategory gender='men' />
                </Grid.Column>
                <Grid.Column width={9}>
                    <Routes>
                        <Route path='/' element={<MenFontPage />} />
                        <Route path='/accessory' element={<Women category='accessory' categorys='shades'/>}/>
                        <Route path='/shirt' element={<h2>男生襯衫類葉面</h2>} />
                        <Route path='/tshirt' element={<Women gender='men' category='tshirt' categorys='tshirt'/>} />
                        <Route path='/vest' element={<Women category='vest' categorys='vest'/>} />
                        <Route path='/:firstdoc/:twicecollection/:id' element={<ProductPage gender='men'/>} />
                    </Routes>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}