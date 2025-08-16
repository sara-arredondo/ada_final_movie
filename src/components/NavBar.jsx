import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import logoUrl from "../assets/logo.svg";

const pages = [
  { label: 'Home', path: '/' },
  { label: 'Últimos Lanzamientos', path: '/UltimosLanzamientos' },
  { label: 'Populares', path: '/PopularMovies' },
  { label: 'Favoritos', path: '/favoritos' },
  { label: 'Buscar Película', path: '/buscador' },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: "#272727" }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 60, md: 90 },
            alignItems: "center" }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              mr: 2,
              textDecoration: "none",
              color: "inherit",
              flexShrink: 0
            }}
          >
            <Box
              component="img"
              src={logoUrl}
              alt="PICK"
              sx={{
                width: { xs: 28, md: 48 },
                height: { xs: 28, md: 48 } }} />

            <Typography
              component="span"
              sx={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: { xs: 20, md: 48 },
                fontWeight: 700,
                color: "#f35a5d",
                lineHeight: 1,
                letterSpacing: ".04em",
                display: "flex",
                alignItems: "center",
              }}
            >
              PICK
            </Typography>
          </Box>

          {/* alinear el icono a la derecha en mobile */}
          <Box sx={{ flexGrow: 1 }} />

          {/* --- menu hamburguesae--- */}
          <Box sx={{
            display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#98c7f3' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              PaperProps={{
                sx: {
                  backgroundColor: "#272727", // ← Fondo oscuro
                  color: "#fff",              // ← Texto blanco
                },
  }}
            >
              {pages.map((p) => {
                const isActive = location.pathname === p.path;
                return (
                  <MenuItem
                    key={p.path}
                    component={Link}
                    to={p.path}
                    onClick={handleCloseNavMenu}
                    selected={isActive}
                    sx={{
                      "&.Mui-selected": { bgcolor: "#f35a5d", color: "#272727" },
                      "&.Mui-selected:hover": { bgcolor: "#d94b50" }
                    }}
                  >
                    <Typography textAlign="center">{p.label}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          {/* --- menu escritorio */}
          <Box
          sx={{
            flexGrow: 0,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-end'
            }}>

            {pages.map((p) => {
              const isActive = location.pathname === p.path;
              return (
                <Button
                  key={p.path}
                  component={Link}
                  to={p.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: isActive ? '#f35a5d' : '#98c7f3',
                    border: `1px solid ${isActive ? '#f35a5d' : '#98c7f3'}`,
                    display: 'block',
                    textTransform: 'none',
                    fontWeight: 300,
                    borderRadius: '20px',
                    px: 2,
                    mx: 0.5,
                    '&:hover': {
                      color: '#f35a5d',
                      borderColor: '#f35a5d',
                    },
                  }}
                >
                  {p.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;