import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Challenger
        </Typography>
        <Button color="inherit">
          <Link href="/" passHref>
            Home
          </Link>
        </Button>
        <Button color="inherit">
          <Link href="/about" passHref>
            About
          </Link>
        </Button>
        <Button color="inherit">
          <Link href="/contact" passHref>
            Contact
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
