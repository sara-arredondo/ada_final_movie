import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function Footer() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#272727"}}>
      <AppBar position="static" sx={{ backgroundColor: "#272727", height:'100px', alignItems: 'center' }}>
        <Toolbar sx={{
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center',    
            height: '100%'
          }}>
          <Typography variant="body2" component="div" sx={{
              fontWeight: 'normal', 
              fontSize: '1rem',
              textAlign: 'center',
              color: '#98c7f3',
            }}>
            Hecho por Sara Arredondo para ADA | 2025
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Footer