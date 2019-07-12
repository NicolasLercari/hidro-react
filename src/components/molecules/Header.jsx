import React from 'react';
import './_style.scss';
import Typography from '@material-ui/core/Typography';

const Header = () => (
  <div className="HeaderContainer">
    <img className="logo" src="images/icono-helado.png" alt="hidro react" />
    <Typography variant="h6" color="textPrimary">
      Hidrocoloides
    </Typography>
  </div>
);

export default Header;
