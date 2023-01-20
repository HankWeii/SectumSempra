import React from 'react'
import WomenCategory from './Category/Category'
import Women from './Women/Women'
import ProductPage from './ProductPage'
import { Route, Routes } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

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
                        <Route path='/' element={<h2>WomenFontPage</h2>} />
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