import React from 'react'
import { CSidebar,CBadge,CNavItem,CSidebarBrand,CSidebarNav, CSidebarToggler,CNavTitle,CNavGroup } from '@coreui/react'
import CIcon from '@coreui/icons-react';
const SideBar = () => {
    return (
        <>
            <CSidebar>
                <CSidebarBrand>Sidebar Brand</CSidebarBrand>
                <CSidebarNav>
                    <CNavTitle>Nav Title</CNavTitle>
                    <CNavItem href="#">
                        <CIcon className="nav-icon" name="cil-speedometer" />
                        Nav item
                    </CNavItem>
                    <CNavItem href="#">
                        <CIcon className="nav-icon" name="cil-speedometer" />
                        With badge
                        <CBadge color="primary ms-auto">NEW</CBadge>
                    </CNavItem>
                    <CNavGroup toggler="Nav dropdown">
                        <CNavItem href="#">
                            <CIcon className="nav-icon" name="cil-puzzle" /> Nav dropdown
                            item
                        </CNavItem>
                        <CNavItem href="#">
                            <CIcon className="nav-icon" name="cil-puzzle" /> Nav dropdown
                            item
                        </CNavItem>
                    </CNavGroup>
                </CSidebarNav>
                <CSidebarToggler />
            </CSidebar>
        </>
    )
}

export default SideBar