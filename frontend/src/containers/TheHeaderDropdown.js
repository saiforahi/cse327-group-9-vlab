import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { API, BASE_URL, USER_ID } from "../Config";
import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";
import "./header.css";

const TheHeaderDropdown = () => {
  let history = useHistory();
  const profile_details = useSelector((state) => state.profile.data);
  function logout() {
    API.get("/logout")
      .then((res) => {
        window.sessionStorage.clear();
        history.push("/");
      })
      .catch((err) => {
        sessionStorage.clear();
        history.push("/");
      });
  }
  return (
    <>
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      ></CDropdown>
      <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImg
              src={
                profile_details.profile_pic != null
                  ? BASE_URL + profile_details.profile_pic
                  : "avatars/user-avatar-default.png"
              }
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />
          </div>
          <span className="ml-2  u-name">{profile_details.first_name}</span>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center drop-text"
          >
            <strong>Account</strong>
          </CDropdownItem>
          <CDropdownItem
            className="drop-text"
            to={"/dashboard/profile/" + sessionStorage.getItem(USER_ID)}
          >
            <CIcon name="cil-user" className="mfe-2" />
            Profile
          </CDropdownItem>

          <CDropdownItem divider />
          <CDropdownItem
            onClick={() => {
              logout();
            }}
            className="drop-text"
          >
            <CIcon name="cil-account-logout" className="mfe-2" />
            Log out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  );
};

export default TheHeaderDropdown;
