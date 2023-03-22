import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserDropdownMenuState } from '../../store/slices/ConfigSlice';

export default function ImageAvatars() {
    const dispatch=useDispatch()
    const open=useSelector(state=>state.config.user_dropdown_header_menu_show)
    const handleClick=()=>{
        dispatch(changeUserDropdownMenuState(open?false:true))
    }
    return (
        <Tooltip title="Account settings">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
        </Tooltip>
    );
}
