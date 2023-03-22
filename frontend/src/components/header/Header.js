import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { changeState } from '../../store/slices/DrawerSlice';
import { changeUserDropdownMenuState } from '../../store/slices/ConfigSlice';
import { useHistory } from 'react-router-dom';
import { drawerWidth } from '../../Config';
import MatAppbar from './MatAppbar';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = useSelector(state => state.drawer.open)
    const user_menu = useSelector(state=>state.config.user_dropdown_header_menu_show)
    const dispatch = useDispatch()
    let history = useHistory()
    const handleDrawerOpen = () => {
        dispatch(changeState(true))
    };
    const handleClose = () => {
        dispatch(changeUserDropdownMenuState(false))
        setAnchorEl(null);
    };
    
    return (
        // <React.Fragment>
        //     <AppBar position="fixed" open={open}>
        //         <Grid
        //             container
        //             direction="row"
        //             justifyContent="space-between"
        //             alignItems="center"
        //             spacing={{ xs: 2, md: 3 }}
        //             columns={{ xs: 4, sm: 8, md: 12 }}
        //         >
        //             <Grid item xs={11} md={11}>
        //                 <Toolbar sx={{ justifyContent: 'space-between' }}>
        //                     <IconButton
        //                         color="inherit"
        //                         aria-label="open drawer"
        //                         onClick={handleDrawerOpen}
        //                         edge="start"
        //                         sx={{
        //                             marginRight: '36px',
        //                             ...(open && { display: 'none' }),
        //                         }}
        //                     >
        //                         <MenuIcon />
        //                     </IconButton>
        //                     {/* <Typography variant="h6" noWrap component="div">
        //                     Header
        //                 </Typography> */}
        //                 </Toolbar>
        //             </Grid>
        //             <Grid item xs={1} md={1} justifyContent="flex-end">
        //                 <ImageAvatars />
        //             </Grid>
        //         </Grid>
        //         <Menu
        //             anchorEl={anchorEl}
        //             open={user_menu}
        //             onClick={handleClose}
        //             onClose={handleClose}
        //             PaperProps={{
        //                 elevation: 0,
        //                 sx: {
        //                     overflow: 'visible',
        //                     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        //                     mt: 1.5,
        //                     '& .MuiAvatar-root': {
        //                         width: 32,
        //                         height: 32,
        //                         ml: -0.5,
        //                         mr: 1,
        //                     },
        //                     '&:before': {
        //                         content: '""',
        //                         display: 'block',
        //                         position: 'absolute',
        //                         top: 0,
        //                         right: 14,
        //                         width: 10,
        //                         height: 10,
        //                         bgcolor: 'background.paper',
        //                         transform: 'translateY(-50%) rotate(45deg)',
        //                         zIndex: 0,
        //                     },
        //                 },
        //             }}
        //             transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        //             anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        //         >
        //             {/* <MenuItem>
        //                 <Avatar /> Profile
        //             </MenuItem>
        //             <MenuItem>
        //                 <Avatar /> My account
        //             </MenuItem>
        //             <Divider />
        //             <MenuItem>
        //                 <ListItemIcon>
        //                     <PersonAdd fontSize="small" />
        //                 </ListItemIcon>
        //                 Add another account
        //             </MenuItem> */}
        //             <MenuItem>
        //                 <ListItemIcon>
        //                     <Settings fontSize="small" />
        //                 </ListItemIcon>
        //                 Settings
        //             </MenuItem>
        //             <MenuItem onClick={()=>{logout()}}>
        //                 <ListItemIcon>
        //                     <Logout fontSize="small" />
        //                 </ListItemIcon>
        //                 Logout
        //             </MenuItem>
        //         </Menu>
        //     </AppBar>
        // </React.Fragment>
        <MatAppbar/>
    );
}
