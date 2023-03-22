import React, { Suspense } from 'react';
import { CCol, CContainer, CFade, CRow } from '@coreui/react';
import innerRoutes from '../../routes/DashboardRoutes'
  
import './dashboard.css';
import { useLocation } from 'react-router';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { has_permission } from '../../helper';
import {Link} from "react-router-dom";
const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const Dashboard=()=> {
    let location = useLocation()
    const dispatch = useDispatch()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    React.useEffect(()=>{
        window.scrollTo(0, 0);
        console.log('dashboard mounted',location.state)
        if(location.state?.from == 'login'){
            enqueueSnackbar('Welcome ',{variant:'success'})
        }
        if(location.state?.message){
            console.log('message',location.state.message)
            enqueueSnackbar(location.state.message,{variant:'warning'})
        }
        //console.log(new Date(JSON.parse(sessionStorage.getItem('TOKEN')).time).toISOString())
        // #efeaea

    },[])
    return (
        <>
        <CContainer>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
                <div className="col">
                    <div className="card radius-10 border-start border-0 border-3 border-info" style={{ background:"#efeaea"}}>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">TOTAL INCOME</p>
                                    <h4 className="my-1 text-info">4805</h4>
                                </div>
                                <div className="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                                    <i className="bx bxs-cart"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card radius-10 border-start border-0 border-3 border-danger" style={{ background:"#efeaea"}}>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">PRODUCTS BALANCE</p>
                                    <h4 className="my-1 text-danger">$84,245</h4>
                                </div>
                                <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto"><i
                                    className="bx bxs-wallet"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card radius-10 border-start border-0 border-3 border-success" style={{ background:"#efeaea"}}>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">STOCK</p>
                                    <h4 className="my-1 text-success">34.6%</h4>
                                </div>
                                <div
                                    className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                                    <i className="bx bxs-bar-chart-alt-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
                <div className="col">
                    <div className="card radius-10 border-start border-0 border-3 border-info" style={{ background:"#efeaea"}}>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">SALES BALANCE</p>
                                    <h4 className="my-1 text-info">4805</h4>
                                </div>
                                <div className="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                                    <i className="bx bxs-cart"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card radius-10 border-start border-0 border-3 border-danger" style={{ background:"#efeaea"}}>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">PROFIT</p>
                                    <h4 className="my-1 text-danger">$84,245</h4>
                                </div>
                                <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto"><i
                                    className="bx bxs-wallet"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card radius-10 border-start border-0 border-3 border-success" style={{ background:"#efeaea"}}>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">WITHDRAW</p>
                                    <h4 className="my-1 text-success">34.6%</h4>
                                </div>
                                <div
                                    className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                                    <i className="bx bxs-bar-chart-alt-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-3">
                <div className="col d-flex">
                    <div className="card radius-10 w-100">
                        <div className="card-body">
                            <p className="font-weight-bold mb-1 text-secondary">Weekly Revenue</p>
                            <div className="d-flex align-items-center mb-4">
                                <div>
                                    <h4 className="mb-0">$89,540</h4>
                                </div>
                                <div className="">
                                    <p className="mb-0 align-self-center font-weight-bold text-success ms-2">4.4%
                                    </p>
                                </div>
                            </div>
                            <div className="chart-container-0">
                                <div className="chartjs-size-monitor"
                                     style={{ position: "absolute", inset: "0px", overflow: "hidden", pointerEvents: "none", visibility: "hidden", zIndex: "-1" }}>
                                    <div className="chartjs-size-monitor-expand"
                                         style={{ position:"absolute", left:"0", top:"0",right:"0",bottom:"0", overflow:"hidden", pointerEvents:"none",visibility:"hidden", zIndex:"-1" }}>
                                        <div style={{ position:"absolute", width:"1000000px", height:"1000000px", left:"0", top:"0" }}></div>
                                    </div>
                                    <div className="chartjs-size-monitor-shrink"
                                         style={{ position:"absolute", left:"0", top:"0", right:"0", bottom:"0", overflow:"hidden", pointerEvents:"none", visibility:"hidden", zIndex:"-1" }}>
                                        <div style={{ position:"absolute", width:"200%", height:"200%", left:0, top:"0" }}></div>
                                    </div>
                                </div>
                                <canvas id="chart3" width="562" height="320"
                                        style={{ display: "block", width: "562px", height: "320px" }}
                                        className="chartjs-render-monitor"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col d-flex">
                    <div className="card radius-10 w-100">
                        <div className="card-header bg-transparent">
                            <div className="d-flex align-items-center">
                                <div>
                                    <h6 className="mb-0">Orders Summary</h6>
                                </div>

                            </div>
                        </div>
                        <div className="card-body">
                            <div className="chart-container-1">
                                <div className="chartjs-size-monitor"
                                     style={{ position: "absolute", inset: "0px", overflow: "hidden", pointerEvents: "none", visibility: "hidden", zIndex: "-1" }}>
                                    <div className="chartjs-size-monitor-expand"
                                         style={{ position:"absolute", left:"0", top:"0", right:"0", bottom:"0", overflow:"hidden", pointerEvents:"none", visibility:"hidden", zIndex:"-1" }}>
                                        <div
                                            style={{ position:"absolute", width:"1000000px", height:"1000000px", left:"0", top:"0" }}></div>
                                    </div>
                                    <div className="chartjs-size-monitor-shrink"
                                         style={{ position:"absolute", left:"0", top:"0", right:"0", bottom:"0", overflow:"hidden", pointerEvents:"none", visibility:"hidden", zIndex:"-1" }}>
                                        <div style={{ position:"absolute", width:"200%", height:"200%", left:"0", top:"0" }}></div>
                                    </div>
                                </div>
                                <canvas id="chart4" width="562" height="260"
                                        style={{ display: "block", width: "562px", height: "260px" }}
                                        className="chartjs-render-monitor"></canvas>
                            </div>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">Completed <span
                                className="badge bg-gradient-quepal rounded-pill">25</span>
                            </li>
                            <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">Pending <span
                                className="badge bg-gradient-ibiza rounded-pill">10</span>
                            </li>
                            <li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">Process <span
                                className="badge bg-gradient-deepblue rounded-pill">65</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col d-flex">
                    <div className="card radius-10 w-100">
                        <div className="card-header bg-transparent">
                            <div className="d-flex align-items-center">
                                <div>
                                    <h6 className="mb-0">Top Selling Categories</h6>
                                </div>
                                <div className="dropdown ms-auto">

                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="chart-container-0">
                                <div className="chartjs-size-monitor"
                                     style={{ position:"absolute", left:"0", top:"0", right:"0", bottom:"0", overflow:"hidden", pointerEvents:"none", visibility:"hidden", zIndex:"-1" }}>
                                    <div className="chartjs-size-monitor-expand"
                                         style={{ position:"absolute", left:"0", top:"0", right:"0", bottom:"0", overflow:"hidden", pointerEvents:"none", visibility:"hidden", zIndex:"-1" }}>
                                        <div
                                            style={{ position:"absolute", width:"1000000px", height:"1000000px", left:"0", top:"0" }}></div>
                                    </div>
                                    <div className="chartjs-size-monitor-shrink"
                                         style={{ position:"absolute", left:"0", top:"0", right:"0", bottom:"0", overflow:"hidden", pointerEvents:"none", visibility:"hidden", zIndex:"-1" }}>
                                        <div style={{ position:"absolute", width:"200%", height:"200%", left:"0", top:"0" }}></div>
                                    </div>
                                </div>
                                <canvas id="chart5" width="562" height="320"
                                        style={{ display: "block", width: "562px", height: "320px" }}
                                        className="chartjs-render-monitor"></canvas>
                            </div>
                        </div>
                        <div className="row row-group border-top g-0">
                            <div className="col">
                                <div className="p-3 text-center">
                                    <h4 className="mb-0 text-danger">$45,216</h4>
                                    <p className="mb-0">Clothing</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="p-3 text-center">
                                    <h4 className="mb-0 text-success">$68,154</h4>
                                    <p className="mb-0">Electronic</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </CContainer>
        </>
    );
}

export default React.memo(Dashboard)
