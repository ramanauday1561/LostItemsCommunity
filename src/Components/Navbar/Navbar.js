import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    {
        label: 'Report Item',
        submenu: [
            { label: 'Report a Lost Item', routerLink: '/login-needed' },
            { label: 'Report Found Item', routerLink: '/login-needed' },
        ],
    },
    {
        label: 'Search Items',
        submenu: [
            { label: 'Search Lost Items', routerLink: '/login-needed' },
            { label: 'Search Found Items', routerLink: '/login-needed' },
        ],
    },
    { label: 'Community Forum', routerLink: '/login-needed' },
    { label: 'About Us', routerLink: '/about-us' },
    { label: 'Contact Us', routerLink: '/login-needed' },
];

const Navbar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [submenu, setSubmenu] = React.useState([]);
    const [userMenuAnchor, setUserMenuAnchor] = React.useState(null);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleMenuOpen = (event, submenuItems) => {
        setAnchorEl(event.currentTarget);
        setSubmenu(submenuItems);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSubmenu([]);
    };

    const handleUserMenuOpen = (event) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    const handleLogout = () => {
        logout();
        handleUserMenuClose();
        navigate('/');
    };

    // New: handle navigation for any item
    const handleNavigate = (routerLink) => {
        navigate(routerLink);
        setDrawerOpen(false); // close drawer if open (mobile)
        handleMenuClose(); // close menu if open (desktop)
    };

    const drawer = (
        <Box sx={{ background: 'red' }} className="navbar-drawer-box" role="presentation" onClick={handleDrawerToggle}>
            <List>
                {navItems.map((item, idx) =>
                    item.submenu ? (
                        <React.Fragment key={item.label}>
                            <ListItem>
                                <ListItemText primary={item.label} />
                            </ListItem>
                            {item.submenu.map((sub, subIdx) => (
                                <ListItemButton key={sub.label} className="navbar-drawer-subitem" onClick={() => handleNavigate(sub.routerLink)}>
                                    <ListItemText primary={sub.label} />
                                </ListItemButton>
                            ))}
                            <Divider />
                        </React.Fragment>
                    ) : (
                        <ListItemButton key={item.label} onClick={() => handleNavigate(item.routerLink)}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    )
                )}
            </List>
            <Divider />
            <Box className="navbar-drawer-actions">
                {currentUser ? (
                    <>
                        <Typography variant="body2" sx={{ px: 1, pb: 1, color: 'rgba(255,255,255,0.7)' }}>
                            Signed in as <strong>{currentUser.displayName}</strong>
                        </Typography>
                        <Button variant="text" className="navbar-login-btn" onClick={() => { handleNavigate('/dashboard'); }}>Dashboard</Button>
                        <Button variant="contained" color="error" className="navbar-signup-btn" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button variant="text" className="navbar-login-btn" onClick={() => handleNavigate('/login')}>Login</Button>
                        <Button variant="contained" color="warning" className="navbar-signup-btn" onClick={() => handleNavigate('/signup')}>Signup</Button>
                    </>
                )}
            </Box>
        </Box>
    );

    return (
        <AppBar position="static" color="default" elevation={1} className="navbar-appbar">
            <Toolbar className="navbar-toolbar">
                <Box className="navbar-logo-box" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <img
                        src="images/logo.png"
                        alt="Logo"
                        className="navbar-logo-img"
                    />
                    <Typography variant="h6" noWrap className="navbar-title">
                        Lost<span className="navbar-title-highlight">Items</span>Community
                    </Typography>
                </Box>
                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={handleDrawerToggle}
                            aria-label="menu"
                            className="navbar-menu-btn"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                            {drawer}
                        </Drawer>
                    </>
                ) : (
                    <Box className="navbar-links-box">
                        <Box className="navbar-links">
                            {navItems.map((item) =>
                                item.submenu ? (
                                    <Box key={item.label} className="navbar-link-dropdown">
                                        <Button
                                            color="inherit"
                                            onClick={(e) => handleMenuOpen(e, item.submenu)}
                                            endIcon={<MenuIcon fontSize="small" />}
                                            className="navbar-link-btn"
                                        >
                                            {item.label}
                                        </Button>
                                        <Menu
                                            className="navbar-submenu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl) && submenu === item.submenu}
                                            onClose={handleMenuClose}
                                        >
                                            {item.submenu.map((sub) => (
                                                <MenuItem
                                                    sx={{ fontSize: '14px' }}
                                                    key={sub.label}
                                                    onClick={() => handleNavigate(sub.routerLink)}
                                                >
                                                    {sub.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                ) : (
                                    <Button color="inherit" key={item.label} className="navbar-link-btn" onClick={() => handleNavigate(item.routerLink)}>{item.label}</Button>
                                )
                            )}
                        </Box>
                        <Box className="navbar-actions">
                            {currentUser ? (
                                <>
                                    <Tooltip title={currentUser.displayName}>
                                        <IconButton onClick={handleUserMenuOpen} size="small" sx={{ ml: 1 }}>
                                            <Avatar
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                    bgcolor: 'primary.main',
                                                    fontSize: '1rem',
                                                    border: '2px solid rgba(56,223,255,0.5)',
                                                }}
                                            >
                                                {currentUser.displayName?.[0]?.toUpperCase() || 'U'}
                                            </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={userMenuAnchor}
                                        open={Boolean(userMenuAnchor)}
                                        onClose={handleUserMenuClose}
                                        PaperProps={{
                                            sx: { bgcolor: '#020014', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', minWidth: 180 },
                                        }}
                                    >
                                        <MenuItem disabled sx={{ fontSize: 13, opacity: 0.7 }}>
                                            {currentUser.displayName}
                                        </MenuItem>
                                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                                        <MenuItem sx={{ fontSize: 14 }} onClick={() => { handleUserMenuClose(); navigate('/dashboard'); }}>
                                            Dashboard
                                        </MenuItem>
                                        <MenuItem sx={{ fontSize: 14, color: '#f44336' }} onClick={handleLogout}>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" className="navbar-login-btn" onClick={() => navigate("/login")}>Login</Button>
                                    <Button variant="contained" color="warning" className="navbar-signup-btn" onClick={() => navigate("/signup")}>Signup</Button>
                                </>
                            )}
                        </Box>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;