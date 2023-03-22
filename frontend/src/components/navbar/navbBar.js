import * as React from 'react';
import { CNav,CNavItem,CNavLink } from '@coreui/react';

 const navBar = () =>{
    return (
        <>
        <CNav variant="underline">
  <CNavItem>
    <CNavLink href="#" active>
      Active
    </CNavLink>
  </CNavItem>
  <CNavItem>
    <CNavLink href="#">Link</CNavLink>
  </CNavItem>
  <CNavItem>
    <CNavLink href="#">Link</CNavLink>
  </CNavItem>
  <CNavItem>
    <CNavLink href="#" disabled>
      Disabled
    </CNavLink>
  </CNavItem>
</CNav>
        
        
        </>
    )
 }
 export default navBar;