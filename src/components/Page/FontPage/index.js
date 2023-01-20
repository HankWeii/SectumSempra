import React from 'react'
import { useState, useEffect } from 'react';
import { Carousel } from 'antd'
import { Grid, Image } from 'semantic-ui-react';
import firebase from '../../../utils/firebase'
import './FontPage.css'

export default function FontPage() {
  const [imageUrls, setImageUrl] = useState([])
  useEffect(()=>{
    firebase.firestore().collection('fontpage').onSnapshot(collectionSnapshot=>{
      const data = collectionSnapshot.docs.map(doc=>{
        const {id} = doc;
        const data = doc.data()
        return {...data,id}
      })
      setImageUrl(data,...imageUrls)
    })
  }, [])
    return (
      <>
        <div className='carousel_outer'>
          <Carousel autoplay className='outer'>
            {
              imageUrls.map(imageUrl=>{
                return(
                  <div key={imageUrl.id}>
                    <h3 className='contentStyle'>
                      <Image src={imageUrl.imageUrl} />
                    </h3>
                  </div>
                )
              })
            }
            <div>
              <h3 className='contentStyle'>4</h3>
            </div>
          </Carousel>
        </div>
      </>



      // <Carousel afterChange={onChange} autoplay style={{width:'30vw'}}>
      //   <div>
      //     <h3 style={contentStyle}>1</h3>
      //   </div>
      //   <div>
      //     <h3 style={contentStyle}>2</h3>
      //   </div>
      //   <div>
      //     <h3 style={contentStyle}>3</h3>
      //   </div>
      //   <div>
      //     <h3 style={contentStyle}>4</h3>
      //   </div>
      // </Carousel>
    )
}
