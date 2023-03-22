import React, {  } from "react";
import { CContainer } from "@coreui/react";
// import innerRoutes from '../../routes/DashboardRoutes'
import { useDispatch, useSelector } from "react-redux";

import "./dashboard.css";
import { useLocation } from "react-router";
import { useSnackbar } from "notistack";
import { fetchUserData } from "../../store/slices/AuthSlice";

// import { has_permission } from '../../helper';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Dashboard = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    dispatch(fetchUserData())
    window.scrollTo(0, 0);
    if (location.state?.from === "login") {
      enqueueSnackbar("Welcome ", { variant: "success" });
    }
    if (location.state?.message) {
      console.log("message", location.state.message);
      enqueueSnackbar(location.state.message, { variant: "warning" });
    }
  }, [enqueueSnackbar, location]);
  const user = useSelector((state) => state.auth.data);
  return (
    <>
      <CContainer>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
          <div className="col">
            <div
              className="card radius-10 border-start border-0 border-3 border-info"
              style={{ background: "#efeaea" }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Widget 1</p>
                    <h4 className="my-1 text-info">{ user.wallet ? user.wallet.product_balance : 0 }</h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                    <i className="bx bxs-cart"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className="card radius-10 border-start border-0 border-3 border-danger"
              style={{ background: "#efeaea" }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Widget 1</p>
                    <h4 className="my-1 text-danger">{ user.wallet ? user.wallet.marketing_balance : 0 }</h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                    <i className="bx bxs-wallet"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className="card radius-10 border-start border-0 border-3 border-success"
              style={{ background: "#efeaea" }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Widget 1</p>
                    <h4 className="my-1 text-success">{ user.wallet ? user.wallet.stock_balance : 0 }</h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                    <i className="bx bxs-bar-chart-alt-2"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </CContainer>
    </>
  );
};

export default React.memo(Dashboard);
