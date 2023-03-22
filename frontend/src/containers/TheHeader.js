import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CButton,
  CRow,
  CCol,
  CSidebarNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useHistory, NavLink } from "react-router-dom";
// routes config
import routes from "../routes/DashboardRoutes";
import { changeState } from "../store/slices/SideBarSlice";
import { TheHeaderDropdown } from "./index";
import "./TheHeader.css";
import MatSearch from "../components/search/MatSearch";
import { USER_GUARD } from "../Config";

// Cart
import { useCart } from "react-use-cart";

const CartNotification = () => {
  const { isEmpty, totalUniqueItems } = useCart();
  console.warn("Items old: " + totalUniqueItems);
  if (isEmpty) return <span>0</span>;
  return (
    <>
      <span>{totalUniqueItems}</span>
    </>
  );
};

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  let history = useHistory();
  const user = useSelector((state) => state.auth.data);
  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch(changeState(val));
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch(changeState(val));
  };
  React.useEffect(() => {
    console.log("sidebar --- ", sidebarShow);
  }, []);
  const guard = sessionStorage.getItem(USER_GUARD);
  let paneltype;
  if (guard === "dealer") {
    paneltype = "dealer";
  } else if (guard === "tycoon") {
    paneltype = "tycoon";
  } else {
    paneltype = "admin";
  }

  const {
    isEmpty,
    cartTotal,
    totalUniqueItems,
    items,
    totalItems,
    updateItemQuantity,
    removeItem,
    emptyCart,
    metadata,
  } = useCart();
  let cartItem = 0;
  if (isEmpty) cartItem = 0;

  return (
    <CHeader
      withSubheader
      className="justify-content-between"
      colorScheme="light"
    >
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />

      {/* <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand> */}

      <CHeaderNav className="d-md-down-none">
        {/* <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem> */}
        {/* <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem> */}

        <CHeaderNavItem className="px-3 justify-content-between">
          <MatSearch />
        </CHeaderNavItem>
      </CHeaderNav>
      <CHeaderNav className="px-3">
        {sessionStorage.getItem(USER_GUARD) !== "admin" && (
          <CHeaderNavItem className="d-flex justify-content-center align-items-center">
            {/* <span className="mx-1 badge badge-primary badge-inline badge-pill">
              <span
                className="text-light d-flex justify-content-between align-items-center"
                style={{ fontSize: 17 }}
              >
                <AttachMoneyIcon />
                <span>{user.wallet?.product_balance}</span>
              </span>
            </span> */}
            
            {/* <span className="flex-grow-1 cart-number">
              <span className="badge badge-primary badge-inline badge-pill">
                <CartNotification />
              </span>
            </span> */}
          </CHeaderNavItem>
        )}
        {/* <TheHeaderDropdownMssg/> */}
        <TheHeaderDropdown />
      </CHeaderNav>
      <CSubheader className="px-3 justify-content-between">
        {/* <CButton className="back-button" onClick={() => history.goBack()}><CIcon name="cil-arrow-thick-from-right" className="mr-2" />Back</CButton> */}
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3 custom-router"
          routes={routes}
        />
        {/* <p style={{ margin: "10px 0px 0px 0px" }} className="text-capitalize">
          Welcome ,{" "}
          <span className="text-primary">
            {user?.first_name} {user?.last_name}
          </span>
        </p> */}
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
