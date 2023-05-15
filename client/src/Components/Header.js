import React from "react";
import {makeStyles} from '@mui/styles';
import TopherEmby from '../Images/TopherEmbyBanner.png'

const useStyles = makeStyles({
    header: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '15px 20px 18px 18px',
      borderRadius: '5px',
      backgroundImage: `url(${TopherEmby})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: ' center',
      backgroundSize: '70%',
      width: 'calc(70% - 10px)', 
      height: '300px',
      margin: '0 auto',
      zIndex: 1,
    },
  });

function Header({theme}) {
    const classes = useStyles();
  return (
  <div className={classes.header} style={{ backgroundImage: `url(${TopherEmby})` }}/>
  );
}

export default Header;