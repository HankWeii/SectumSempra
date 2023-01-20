import React from 'react'
import { Image, Icon, Header, Statistic } from 'semantic-ui-react'
import 'firebase/compat/storage'
import { Link } from 'react-router-dom'


export default function TemplatePage(props) {
    const {data, gender} = props

    return (
        <>
            <Link key={data.id} style={{marginBottom:'50px'}} to={`/${gender}/${data.firstDoc}/${data.twiceCollection}/${data.id}`} >
                <Image src={data.imageUrl[0]} size='medium' />
                <Header floated='left'>
                    {data.name}{' '}．{' '}
                </Header>
                <Statistic size='huge'  floated='right'>
                    <div style={{display:'flex', justifyContent:'end', fontSize:'30px',marginTop:'5px'}}>
                        <Statistic.Value>{data.price}</Statistic.Value>
                    </div>                   
                </Statistic>
            </Link>
        </>
    )
}
