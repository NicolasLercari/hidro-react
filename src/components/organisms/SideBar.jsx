import React from 'react';
import PropTypes from 'prop-types';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './_style.scss';

const MyNavItem = ({ id, path, icon }) => (
  <NavItem onSelect={console.log} eventKey={path || id} className="MenuButton">
    <NavIcon>
      {/*       <a href={undefined}>
        <img src="/images/home.svg" style={{ opacity: '0.5' }} alt={id} />
      </a> */}
      <i className="pepe fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
    </NavIcon>
    <NavText>
      <a href={path || `/${id}`}>
        <p className="MenuLabel">Principal</p>
      </a>
    </NavText>
  </NavItem>
);

MyNavItem.defaultProps = {
  path: undefined,
  icon: undefined
};

MyNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string,
  icon: PropTypes.string
};

const SideBar = () => (
  <SideNav className="SideMenu">
    <SideNav.Toggle />
    <SideNav.Nav>
      <MyNavItem id="home" path="/" />
    </SideNav.Nav>
  </SideNav>
);

export default SideBar;
