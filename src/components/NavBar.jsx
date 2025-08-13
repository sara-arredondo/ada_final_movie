import * as React from 'react';
import { Link } from 'react-router-dom';
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

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{backgroundColor: "#272727"}}>
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: 50, md: 75 }, alignItems: "center" }}
        >
                
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
          }}
        >
          <Box
            component="img"
            src={logoUrl}
            alt="PICK"
            sx={{ width: { xs: 28, md: 48 }, height: { xs: 28, md: 48 } }}
          />
          <Typography
            component="span"
            sx={{
              fontFamily: '"Bebas Neue", sans-serif', // ← corregido
              fontSize: { xs: 20, md: 48 },           // ← más grande y responsivo
              fontWeight: 700,
              color: "#f35a5d",
              lineHeight: 1,                           // ← centra con el logo
              letterSpacing: ".04em",
              display: "flex",
              alignItems: "center",
            }}
          >
            PICK
          </Typography>
        </Box>

          {/* Menú móvil (hamburger) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((p) => (
                <MenuItem
                  key={p.path}
                  component={Link}
                  to={p.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{p.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo móvil -> a Home */}
          <Box component={Link} to="/" sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <Box component="img" src={logoUrl} alt="PICK" sx={{ width: 24, height: 24 }} />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },   // SOLO MÓVIL
              flexGrow: 1,
              fontFamily: '"Bebas Neue", sans-serif', // ← corregido
              fontWeight: 400,
              color: '#f35a5d',
              textDecoration: 'none',
            }}
          >
            PICK
          </Typography>


          {/* Menú desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', }}>
            {pages.map((p) => (
              <Button
                key={p.path}
                component={Link}
                to={p.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2,
                  color: '#f35a5d',
                  display: 'block', 
                  textTransform: 'none',
                  fontWeight: 300,
                  border: "1px solid #f35a5d",
                  borderRadius: '20px',        // 🔹 redondeado (puedes ajustar)
                  px: 2,                        // padding horizontal extra
                  mx: 0.5,                      // separación entre botones
                }}
              >
                {p.label}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;