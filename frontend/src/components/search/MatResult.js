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
import Grid from '@mui/material/Grid';
import { CRow } from '@coreui/react';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import { Card, CardContent, CardHeader, Divider, List, ListItem, Typography } from '@mui/material';

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

export default function DraggableSearchResult(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <CRow>
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="#000000" >
                                    Employees ({props.result?.projects?.length})
                                </Typography>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {props.result?.employees?.length > 0 && Array.from(props.result.employees).map((item, idx) => (
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={item.first_name+' '+item.last_name} secondary="Jan 9, 2014" />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </CRow>
                    <Divider orientation='vertical' flexItem />
                    <CRow className="mt-2">
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="#000000" >
                                    Projects ({props.result?.projects?.length})
                                </Typography>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {props.result?.projects?.length > 0 && Array.from(props.result.projects).map((item, idx) => (
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={item.sub_task} secondary="Jan 9, 2014" />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </CRow>
                    {/* <CRow className="mt-2">
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 14, fontWeight:'bold' }} color="#000000" >
                                    Employees
                                </Typography>
                            </CardContent>
                        </Card>
                    </CRow> */}
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
