import React, { useEffect }from 'react'
import {
    CCardHeader,
    CCardBody, CTabPane, CTabs, CContainer, CNavItem, CTabContent,
    CCol,
    CRow,
    CCard,
    CButton, CNav, CNavLink, CInput, CCardFooter, CNavbar
} from "@coreui/react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CIcon from '@coreui/icons-react';
import { useSelector } from 'react-redux'
import { API, PERMISSIONS, PUBLIC_API, TOKEN, USER_ID } from "../../Config";
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { immerable } from 'immer';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
const Settings = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const statecommissions = useSelector(state=>{       
        return state.commissions.data
    })
    const [dealercommissions, setdealerCommissions] = React.useState(statecommissions.dealer_bonus);
    console.log(dealercommissions,'dealercommissions')

    const dealerComChnage = (i, e) => {
        let newFormValues = [...dealercommissions];
        newFormValues[i][e.target.name] = e.target.value;
        setdealerCommissions(newFormValues);
    };
    return (
        <>
            <CTabs activeTab="dealer_bonus_tab">
                <CNav variant="tabs" className="tab-style">
                    {/**View Profile */}
                    <CNavItem>
                        <CNavLink data-tab="dealer_bonus_tab" className="special">
                            <CIcon name="cil-user" /> Dealer Bonus
                        </CNavLink>
                    </CNavItem>
                    {/**change password */}
                    <CNavItem>
                        <CNavLink data-tab="sub_dealer_bonus_tab" className="special">
                            <CIcon name="cil-pen-alt" className="mr-1" />
                            Tycoon
                        </CNavLink>
                    </CNavItem>
                </CNav>
                {/**___________nav tab details______ */}
                <CTabContent>
                    <CTabPane data-tab="master_tab">
                        <CContainer>
                            <CRow>
                                <h3>Master Config</h3>
                            </CRow>
                        </CContainer>

                    </CTabPane>
                    <CTabPane data-tab="dealer_bonus_tab">
                        <CContainer>
                            <CRow>
                                <CCol>
                                    <h6 className='mt-3 mb-2'>Dealer Bonus Configure</h6>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>SL NO</th>
                                                <th>Dealer Type</th>
                                                <th>Capital</th>
                                                <th>Product</th>
                                                <th>Commission</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dealercommissions.map((item, index) =>
                                                    <tr key={index}>
                                                        <td>1{item.id}</td>
                                                        <td>{item.type_name}</td>
                                                        <td>
                                                            <CInput
                                                                type="text"
                                                                name="capital"
                                                                id="capital"
                                                                value={item.capital}
                                                                className="form-control-sm"
                                                            />
                                                        </td>
                                                        <td>
                                                            <CInput
                                                                type="text"
                                                                name="product"
                                                                id="product"
                                                                value={item.product}
                                                                onChange={ e => dealerComChnage(index, e)}
                                                                className="form-control-sm"
                                                            />
                                                        </td>
                                                        <td>
                                                        <CInput
                                                                type="text"
                                                                name="Commision"
                                                                id="Commision"
                                                                value={item.commission}
                                                                className="form-control-sm"
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <div className='text-right'>
                                    {<CButton className="m-1" type="button" variant="outline" color="primary" >Submit
                                        </CButton>}
                                    </div>
                                </CCol>
                            </CRow>
                        </CContainer>

                    </CTabPane>
                    {/**_____Change Password___ */}
                    <CTabPane data-tab="sub_dealer_bonus_tab">
                        <CContainer>
                            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', width: 1 }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons={true}
                                    orientation="vertical"
                                    sx={{ marginTop: '25px',paddingRight:'20px' }}
                                >
                                    <Tab label="MRP Bonus" />
                                    <Tab label="Instant Sale" />
                                    <Tab label="Monthly Salary" />
                                    <Tab label="Sale expense" />
                                </Tabs>
                                <TabPanel value={value} index={1} sx={{padding:0}}>
                                    <CCard>
                                        <CCardHeader>
                                            <strong>Sub Dealer</strong> <small>Instant Sale Bonus Configuration</small>
                                        </CCardHeader>
                                        <CCardBody className="pb-3">
                                            <p className="text-medium-emphasis small">
                                                As shown in the below form, you can set the bonus configuration here
                                            </p>
                                            <hr />
                                            <CRow>
                                                <p className="text-medium-emphasis small">Instant Sell Bonus on 2000-5000 </p>
                                                <CCol sm>
                                                    <CInput placeholder="(%)" />
                                                </CCol>
                                                
                                                
                                            </CRow>
                                            <hr />
                                            <CRow>
                                            <p className="text-medium-emphasis small">Instant Sell Bonus on 10000-20000 </p>
                                            <CCol sm>
                                                    <CInput placeholder="(%)" />
                                                </CCol>
                                            </CRow>
                                            <hr />
                                            <CRow>
                                            <p className="text-medium-emphasis small">Instant Sell Bonus on 50000-100000 </p>
                                            <CCol sm>
                                                    <CInput placeholder="(%)" />
                                                </CCol>
                                            </CRow>
                                            <hr />
                                            
                                        </CCardBody>
                                        <CCardFooter>
                                            <CButton className="m-1" color='primary' size='sm'>Save</CButton>
                                            <CButton className="m-1" color='danger' size='sm'>Reset</CButton>
                                        </CCardFooter>
                                    </CCard>
                                </TabPanel>
                            </Box>

                        </CContainer>
                    </CTabPane>
                </CTabContent>
            </CTabs>
        </>
    )
}

export default Settings