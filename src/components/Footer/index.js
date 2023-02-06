import React from 'react'
import { List, Menu, Grid, Icon, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
    return (
        <>
        <div className='foot_outer'>
            <div>
                <ul>
                    <li>關於品牌</li>
                    <li><Link to='/about_brand'>品牌故事</Link></li>
                    <li><Link to='/store'>門市據點</Link></li>
                    <li><Link to='/staff'>人才招募</Link></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>會員服務</li>
                    <li><Link to='/about_brand'>會員中心</Link></li>
                    <li><Link to='/store'>客服中心</Link></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>購物須知</li>
                    <li><Link to='/about_brand'>訂購流程</Link></li>
                    <li><Link to='/store'>十天鑑賞期</Link></li>
                </ul>
            </div>
            <div style={{marginTop:'30px'}}>
                <Header>FOLLOW US</Header>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <Icon name='instagram' size='large'/>
                    <Icon name='facebook' size='large'/>
                    <Icon name='linechat' size='large'/>
                </div>
            </div>
        </div>
        <div className='ten_vh'></div>
        </>
    )
}
