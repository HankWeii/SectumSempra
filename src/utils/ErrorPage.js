import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon, Button } from 'semantic-ui-react'

export default function ErrorPage({error}) {
    const navigate = useNavigate()
    const toFontPage =() =>{
        navigate('/')
        window.location.reload()
    }
    return (
        <div style={{display:'flex', justifyContent:'space-around',marginTop:'30px'}}>
            <div>
                <div style={{color:'red', fontSize:'50px'}}>
                    Error!!
                </div>
                <div style={{marginTop:'40px'}}>
                    <div>
                        <Icon name='undo' size='huge' color='brown' onClick={toFontPage} />
                    </div>
                    點我
                </div>
            </div>
        </div>
    )
}
