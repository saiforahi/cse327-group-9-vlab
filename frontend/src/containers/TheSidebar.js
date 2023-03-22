import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./TheSidebar.css";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from "@coreui/react";
import { changeState } from "../store/slices/SideBarSlice";
import { has_permission } from "../helper";
// sidebar nav config
import { useHistory } from "react-router";
import { API, USER_GUARD, USER_ID } from "../Config";
import { useLocation } from "react-router-dom";

const TheSidebar = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const show = useSelector((state) => state.sidebar.sidebarShow);

  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;
    console.log(path);
    if (path.match("/dashboard/Projects/")) {
      console.log(path);
    }
    if (path.match("/dashboard/WBS/")) {
      console.log(path);
    }
    if (path.match("/dashboard/EVMS/")) {
      console.log(path);
    }
  }, [location]);

  const guard = sessionStorage.getItem(USER_GUARD);

  const logout = () => {
    API.get("auth/logout/")
      .then((res) => {
        sessionStorage.clear();
        history.push("/");
      })
      .catch((err) => {
        sessionStorage.clear();
        history.push("/");
      });
  };
  return (
    <CSidebar
      colorScheme="light"
      show={show}
      onShowChange={(val) => dispatch(changeState(val))}
    >
      <CSidebarBrand className="d-md-down-none custom-color" to={"/dashboard"}>
        <CImg
          className="c-sidebar-brand-full"
          style={{marginTop:'12px'}}
          src={'assets/icons/virtual_lab_logo.svg'}
          height={35}
        />
        {/* <h6 className="c-sidebar-brand-full" style={{ marginTop: "18px" }}>
          Virtual Lab
        </h6> */}

        <CImg
          className="c-sidebar-brand-minimized"
          src={'assets/icons/vl_logo.svg'}
          height={35}
        />
        <span className="c-sidebar-brand-minimized name-brand1">VHL</span>
      </CSidebarBrand>
      <CSidebarNav className="vo-sidebar">
        {/* <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        /> */}
        <CSidebarNavItem
            to="/dashboard/tycoon"
            icon="cil-list"
            name="Dashboard"
            className="vo-navItem "
          />
        <hr />
        <CSidebarNavItem
          to="/dashboard/messages"
          icon="cil-notes"
          name="Message"
          className="vo-navItem"
        />
        <CSidebarNavItem
          to="/dashboard/my-plan"
          icon="cil-pen"
          name="My Plan"
          className="vo-navItem"
        />
        <CSidebarNavItem
          to="/dashboard/profile"
          icon="cil-people"
          name="User Profile"
          className="vo-navItem"
        />
        <CSidebarNavItem
          to="/dashboard/my-arena"
          icon="cil-people"
          name="My Arena"
          className="vo-navItem"
        />
        
      </CSidebarNav>
      {/* <span className="copyright-text">&copy; DMA V1.0.0</span> */}
      <CSidebarMinimizer />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
