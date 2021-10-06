import React,{useState,useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom'
import {useData} from '../Contexts/dataContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '5rem',
    position:'sticky',
    zIndex:'100'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
 inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export function Nav() {
  const classes = useStyles();
  const {setToggleSidebar,width} = useData();
  return (
    <div className={classes.root}>
      <AppBar style={{backgroundColor:"#0D0D0F"}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="secondary"
            aria-label="open drawer"
          >
          <Link to = "/videos">  <HomeIcon color="secondary" /> </Link>
          </IconButton>
          
          <Typography className={classes.title} variant="h6" noWrap color="secondary">
            SWIFTFLIX
          </Typography>
         
          <Link to="/login"><AccountCircleIcon color="secondary" style={{cursor: "pointer"}}/></Link>
          <MenuIcon onClick={()=>setToggleSidebar(prev=>!prev)} color="secondary" style={{padding:"0rem 2rem",display:`${width>640?'none':'inline'}`}}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

