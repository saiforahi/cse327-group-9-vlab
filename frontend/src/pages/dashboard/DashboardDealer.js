import React from "react";
import {
  CCol,
  CContainer,
  CCard,
  CRow,
  CCardHeader,
  CButton,
  CCardBody,
} from "@coreui/react";
import Product from "../../components/dashboard/ProductCart";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fetchDashboard } from "../../store/slices/DashboardSlice";
import { fetchUserData } from "../../store/slices/AuthSlice";
import "./dashboard.css";
import { useLocation } from "react-router";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
// import "../../pages/products/product.css";


const Dashboard = () => {
  let location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    console.log("dashboard mounted", location.state);
    if (location.state?.from === "login") {
      enqueueSnackbar("Welcome ", { variant: "success" });
    }
    if (location.state?.message) {
      console.log("message", location.state.message);
      enqueueSnackbar(location.state.message, { variant: "warning" });
    }
  }, [location.state, enqueueSnackbar]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchUserData);
    dispatch(fetchDashboard);
  }, [dispatch]);

  const user = useSelector((state) => state.auth.data);

  const stockProducts = useSelector((state) => state.stockProducts.data);
  const status = useSelector((state) => state.stockProducts.status);

  const products = stockProducts.ADK.map(item => {
    const product = { ...item.product, from : 'adk', dealer_id : ''  }
    return { ...item, product: product}
  })

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
                    <p className="mb-0 text-secondary">TOTAL INCOME</p>
                    <h4 className="my-1 text-info">{ user.wallet ? user.wallet.total_income : 0 } Tk</h4>
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
                    <p className="mb-0 text-secondary">PRODUCTS BALANCE</p>
                    <h4 className="my-1 text-danger">{ user.wallet ? user.wallet.product_balance : 0 } Tk</h4>
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
                    <p className="mb-0 text-secondary">STOCK BALANCE</p>
                    <h4 className="my-1 text-success">{ user.wallet ? user.wallet.stock_balance : 0 } </h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                    <i className="bx bxs-bar-chart-alt-2"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
          <div className="col">
            <div
              className="card radius-10 border-start border-0 border-3 border-info"
              style={{ background: "#efeaea" }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">SALES BALANCE</p>
                    <h4 className="my-1 text-info">{ user.wallet ? user.wallet.sales_balance : 0 } Tk</h4>
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
                    <p className="mb-0 text-secondary">PROFIT</p>
                    <h4 className="my-1 text-danger">{ user.wallet ? user.wallet.profit : 0 } Tk</h4>
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
                    <p className="mb-0 text-secondary">WITHDRAW</p>
                    <h4 className="my-1 text-success">{ user.wallet ? user.wallet.withwraw : 0 } Tk</h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                    <i className="bx bxs-bar-chart-alt-2"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
          <div className="col-md-4">
            <div
              className="card radius-10 border-start border-0 border-3 border-info"
              style={{ background: "#efeaea" }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">MAIN BALANCE</p>
                    <h4 className="my-1 text-info">{ user.withwdraw ? user.wallet.main_balance : 0 } Tk</h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                    <i className="bx bxs-cart"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <>
          <CCard className="">
            <CCardHeader>
              <CRow>
                <CCol>
                  <h6 className="mt-2">Adk Product List</h6>
                </CCol>
                <CCol className="text-right">
                  <CButton
                    className="m-1"
                    to={"/dashboard/products-cards"}
                    type="button"
                    size="sm"
                    color="success"
                    variant="outline"
                    shape="pill"
                  >
                    Show All Product
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
            { status === 'loading' ? <h3 className="text-center mt-4">Loading....</h3> : (
              <div
                className="row"
                style={{ backgroudColor: "#fafbfb !important" }}
              >
                <div className="col">
                  <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlay
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                      desktop: {
                        breakpoint: {
                          max: 3000,
                          min: 1024,
                        },
                        items: 3,
                        partialVisibilityGutter: 40,
                      },
                      mobile: {
                        breakpoint: {
                          max: 464,
                          min: 0,
                        },
                        items: 1,
                        partialVisibilityGutter: 30,
                      },
                      tablet: {
                        breakpoint: {
                          max: 1024,
                          min: 464,
                        },
                        items: 2,
                        partialVisibilityGutter: 30,
                      },
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                  >
                    { products.length > 0 ? products.map((item, index) => (
                        <div className="p-3" key={index}>
                          <Product item={item}></Product>
                        </div>
                    )) : <h4 className="text-center mt-4">(Empty)</h4>}
                  </Carousel>
                </div>
              </div>
            )}
          </CCardBody>
          </CCard>
        </>
      </CContainer>
    </>
  );
};

export default React.memo(Dashboard);
