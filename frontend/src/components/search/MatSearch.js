import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import SearchIcon from '@mui/icons-material/Search';
import MatResult from './MatResult.js'
import MatFullScreenSearchResult from './MatFullScreenSearchResult.js'
import { API } from '../../Config.js';
import DraggableSearchResultTab from './MatResultTab.js';

const MatSearch = () => {
    const [searchText, setSearchText] = useState('')
    const [open,setOpen]=useState(false)
    const [result,setResult]=useState([])
    const search = () => {
        if(String(searchText).length>0){
            API.get('search?key='+searchText).then(res=>{
                console.log(res.data.data)
                setResult(res.data.data)
                setOpen(true)
            })
            
        }
    }
    const handleKeyPress=(event)=>{
        
        if(event.key === 'Enter'){
            search()
          }
    }
    return (
        <>
            <Paper
                component="form" variant='outlined' rounded="true" 
                sx={{ p: '2px 4px',margin:1, display: 'flex', alignItems: 'center', width: 400 }}
            >
                {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                {String(searchText).length==0?
                <IconButton type="button" sx={{ p: '10px', color:'rgb(0 82 204)' }} aria-label="search" onClick={search}>
                    <SearchIcon/>
                </IconButton>:<IconButton type="button" sx={{ p: '10px', color:'rgb(0 82 204)' }} aria-label="search" onClick={()=>setSearchText('')}>
                    <CloseSharpIcon/>
                </IconButton>}
                {/* <MatResult open={open} handleClose={()=>setOpen(false)} searchText={searchText} result={result}/> */}
                <DraggableSearchResultTab open={open} handleClose={()=>setOpen(false)} searchText={searchText} result={result}/>
                {/* <MatFullScreenSearchResult open={open} handleClose={()=>setOpen(false)}/> */}
                {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
                {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <DirectionsIcon />
                </IconButton> */}
            </Paper>
        </>
    )
}

export default MatSearch