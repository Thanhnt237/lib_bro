import { Layout } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { titlePath } from '../constants'

function Header() {
    const {pathname} = useLocation()
  return (
   <Layout.Header style={{backgroundColor : "#FFF"}}>
       <h2>{titlePath[pathname]}</h2>
   </Layout.Header>
  )
}

export default Header