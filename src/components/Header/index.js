import React from 'react'
import sectumsempra from './sectumsempra1.jpg'
import { Menu, Image, Icon, Divider, Button, List } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import firebase from '../../utils/firebase'
import './Header.css'


export default function Header() {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const mainItem = ['Women', 'Men', 'Kids', 'Baby'];
    const item = [{name:'團購',path: '/groupbuy'},{name:'門市據點',path:'/store'},{name:'Q & A', path:'/qa'}];
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            setUser(user)
        })
    },[])

    const signOut = ()=>{
        firebase.auth().signOut().then(()=>{
            navigate('/')
        })
    }
    return (
        <>
            <div className='cellphone_header' style={{display: menuIsOpen ? 'block' : 'none'}}>
                <Icon name='angle double left' size='big'   onClick={()=>setMenuIsOpen(false)} />
                <List size='big'>
                    <Divider horizontal section ><Icon name='block layout' /></Divider>
                    {
                        mainItem.map(item =>{
                            return (
                                <List.Item key={'cell'+ item} as={Link} to={`/${item}`} onClick={()=>setMenuIsOpen(false)}>
                                    {item}
                                </List.Item>
                            )
                        })
                    }
                    <Divider horizontal section><Icon name='question circle' /></Divider>
                    {
                        item.map(item=>{
                            return(
                                <List.Item as={Link} to={item.path} key={'cell' + item.name} onClick={()=>setMenuIsOpen(false)}>
                                    {item.name}
                                </List.Item>
                            )
                        })
                    }
                    <Divider horizontal section ><Icon name='setting' /></Divider>
                    {
                        user ? 
                        <List.Item as={Link} to='/userdata' onClick={()=>setMenuIsOpen(false)}>
                            會員資料
                        </List.Item>
                        :
                        <List.Item as={Link} to='/signin' onClick={()=>setMenuIsOpen(false)}>
                            登入
                        </List.Item>
                    }
                    <List.Item as={Link} to='/shopcart' onClick={()=>setMenuIsOpen(false)}>
                        購物車
                    </List.Item>
                    <List.Item as={Link} to='/setting' onClick={()=>setMenuIsOpen(false)}>
                        設定
                    </List.Item>
                </List>
            </div>
            <div className='header_screen'>
                <Menu secondary widths={4}>
                    <Menu.Item>
                        <Image src={sectumsempra} as={Link} to='/'/>
                    </Menu.Item>              
                    <Menu.Item>
                        {
                            mainItem.map(item=>{
                                return (
                                    <Menu.Item as={Link} to={`/${item}`} key={item}>
                                        <div className='nav_mainitem'>{item}</div>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu.Item>          
                    <Menu.Item position='right'>
                        {
                            item.map(itemObj=>{
                                return(
                                    <Menu.Item as={Link} to={itemObj.path} key={itemObj.name}>
                                        <div className='nav_item'>{itemObj.name}</div>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu.Item>
                    
                    <Menu.Item position='right'>
                        {
                        user ? 
                        <Menu.Item as={Button} onClick={signOut}>
                                <Icon size='big' name='user circle' />
                        </Menu.Item>
                        :
                        <Menu.Item as={Link} to='/signin'>
                                登入
                        </Menu.Item>
                        }
                        <Menu.Item as={Link} to='/shopcart'>
                            <Icon size='big' name='shop'/>
                        </Menu.Item>
                        <Menu.Item as={Link} to='/setting'>
                            <Icon size='big' name='setting'/>
                        </Menu.Item>
                    </Menu.Item>
                </Menu>
            </div>
            <div className='arrow_icon'>
                <Icon link name='angle double right' size='big' onClick={()=>setMenuIsOpen(true)} />
            </div>
            <div className='hide_logo'>
                <Image src={sectumsempra} as={Link} to='/'/>
            </div>
        </>
    )
}
