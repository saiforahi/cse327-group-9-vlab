import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import SearchIcon from '@mui/icons-material/Search';
// import MatResult from './MatResult.js'
// import MatFullScreenSearchResult from './MatFullScreenSearchResult.js'
import { API } from '../../Config.js';
import { process_params } from 'express/lib/router';
// import DraggableSearchResultTab from './MatResultTab.js';

const CustomSearch = (props) => {
    const [searchText, setSearchText] = useState('')
    const [showSearchInput,setShowSearchInput]=useState(false)
    const [open,setOpen]=useState(false)
    const [result,setResult]=useState([])
    const search = (text) => {
        if(String(text).length>0){
            props.search(text)
        }
    }
    const handleKeyPress=(event)=>{
        // setShowSearchInput(event.target.value)
        if(event.key === 'Enter' && String(event.target.value).length>0){
            search(event.target.value)
        }
    }
    return (
        <>
            {showSearchInput==false?<IconButton type="button" sx={{ p: '10px', color:'rgb(0 82 204)', float:'right' }} aria-label="search" onClick={()=>{setShowSearchInput(true)}}><SearchIcon/></IconButton>:
            <Paper
                component="form" variant='outlined' rounded="true" 
                sx={{ p: '0px 0px',height:'36px',marginRight:1, display: 'flex', alignItems: 'center', width: 250,float:'right' }}
            >
                {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search in assigned projects"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onBlur={()=>{setShowSearchInput(false)}}
                />
                {String(searchText).length==0?
                <IconButton type="button" sx={{ p: '10px', color:'rgb(0 82 204)' }} aria-label="search" onClick={search}>
                    <SearchIcon fontSize='small'/>
                </IconButton>:<IconButton type="button" sx={{ p: '10px', color:'rgb(0 82 204)' }} aria-label="search" onClick={()=>setSearchText('')}>
                    <CloseSharpIcon/>
                </IconButton>}
                {/* <MatResult open={open} handleClose={()=>setOpen(false)} searchText={searchText} result={result}/> */}
                {/* <DraggableSearchResultTab open={open} handleClose={()=>setOpen(false)} searchText={searchText} result={result}/> */}
                {/* <MatFullScreenSearchResult open={open} handleClose={()=>setOpen(false)}/> */}
                {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
                {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <DirectionsIcon />
                </IconButton> */}
            </Paper>}
        </>
    )
}

export default CustomSearch