import React from 'react'
import { Container, Menu } from 'semantic-ui-react'
import Header from './header'

function Layout(props) {
  return (
    <Container>
      <Header/>
      {props.children}
    </Container>
  )
}

export default Layout