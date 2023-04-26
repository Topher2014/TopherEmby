import React from "react";
import {makeStyles} from '@mui/styles';
import TopherEmby from '../Images/TopherEmbyBanner.png'

const useStyles = makeStyles({
    header: {
    //   position: 'relative',
    //   display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '15px 20px 18px 18px',
      borderRadius: '5px',
      // backgroundImage: 'url("../Images/TopherEmby.png")',
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

function Header() {
    const classes = useStyles();
  return (
  <div className={classes.header} style={{ backgroundImage: `url(${TopherEmby})` }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
    </div>
  </div>
</div>
  );
}

export default Header;