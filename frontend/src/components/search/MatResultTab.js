import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import { Avatar, Card, CardContent, CardHeader, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import { BASE_URL } from '../../Config';
import PeopleIcon from '@mui/icons-material/PeopleSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import ExtensionSharpIcon from '@mui/icons-material/ExtensionSharp';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import CoPresentSharpIcon from '@mui/icons-material/CoPresentSharp';

import { useHistory } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
export default function DraggableSearchResultTab(props) {
    const [open, setOpen] = React.useState(false);
    const history = useHistory()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const theme = useTheme();

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const go_to_project_details=(item)=>{
        console.log(item)
        history.push({ pathname: '/dashboard/Projects/my-projects/details/' + item.work_package_number, state: { project: item } })
    }
    return (
        <div>

            <Dialog
                maxWidth={"sm"}
                fullWidth={true}
                open={props.open}
                onClose={props.handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                TransitionComponent={Transition}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Search Result
                </DialogTitle>

                <DialogContent>
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold', marginBottom: 3 }} color="#000000" >
                        You searched for '{props.searchText}'
                    </Typography>
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <Tabs value={value} onChange={handleChange} centered indicatorColor="primary">
                            <Tab icon={<PeopleIcon fontSize="small" />} label={"Employees ("+props.result?.employees?.length+")"} {...a11yProps(0)} />
                            <Tab icon={<ExtensionSharpIcon fontSize="small" />} label={"Projects ("+props.result?.projects?.length+")"} {...a11yProps(1)} />
                            <Tab icon={<AssignmentSharpIcon fontSize="small" />} label="WBS" {...a11yProps(2)} />
                            <Tab icon={<CoPresentSharpIcon fontSize="small" />} label="Meetings" {...a11yProps(3)} />
                        </Tabs>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                    {props.result?.employees?.length > 0 && Array.from(props.result.employees).map((item, idx) => (
                                        <ListItem key={idx} secondaryAction={
                                            <IconButton edge="end" aria-label="View Profile" title="View Profile" onClick={()=>{props.handleClose();history.push('/dashboard/profile/'+item.id);}}>
                                              <AccountCircleSharpIcon />
                                            </IconButton>
                                          }>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {/* <ImageIcon /> */}
                                                    <img src={BASE_URL+item.profile_pic}/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={item.first_name+' '+item.last_name} secondary={item.slc_details?.slc?.name} />
                                        </ListItem>
                                    ))}
                                </List>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {props.result?.projects?.length > 0 && Array.from(props.result.projects).map((item, idx) => (
                                        <ListItem key={idx} onClick={()=>{props.handleClose();go_to_project_details(item)}}>
                                            
                                            <ListItemIcon>
                                                <ExtensionSharpIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary={item.sub_task} secondary={"Planned Delivery Date: "+item.planned_delivery_date} />
                                        </ListItem>
                                    ))}
                                </List>
                            </TabPanel>
                            <TabPanel value={value} index={2} dir={theme.direction}>
                                This Section is currently under development
                            </TabPanel>
                            <TabPanel value={value} index={3} dir={theme.direction}>
                                This Section is currently under development
                            </TabPanel>
                        </SwipeableViews>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.handleClose}>
                        Close
                    </Button>
                    {/* <Button onClick={props.handleClose}>Subscribe</Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}
