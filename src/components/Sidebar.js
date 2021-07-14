import React from 'react'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    sidebarList:{
      marginBottom:theme.spacing(10)
    }
  }));
export function Sidebar() {
    const classes = useStyles();
    return (
        <div>
          <List >
              <Link to = "/videos">
                <ListItem className={classes.sidebarLists} >
                  <ListItemText
                    primary="Home"
                  />
                </ListItem>
              </Link>
               <Link to = "/watchlater">  
                 <ListItem  className={classes.sidebarLists} >
                 <ListItemText
                    primary="Watch Later"
                  />
                 </ListItem>
                </Link>
                 <ListItem className={classes.sidebarLists}>
                 <ListItemText
                    primary="Liked Videos"
                  />
                 </ListItem>
                 <ListItem className={classes.sidebarLists} >
                 <ListItemText
                    primary=" Your PlayLists"
                  />
                 </ListItem>
             </List>      
        </div>
    )
}
