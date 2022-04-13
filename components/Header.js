import { Menu, MenuItem } from "semantic-ui-react";
import React from 'react';
import Link from 'next/link'

function 
Header() {
  return (
    <Menu style={{marginTop: "10px"}}>
      
      <Link href="/">
        <a className="item">CrowdCoin</a>
      </Link>
        
      <Menu.Menu position="right">
        <Menu.Item><a href="/">Campaigns</a></Menu.Item>
        <Menu.Item><a href="/campaigns/new">+</a></Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default 
Header