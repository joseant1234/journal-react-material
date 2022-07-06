import { TurnedInNot } from "@mui/icons-material"
import { Drawer, Box, Toolbar, Typography, Divider, ListItem, ListItemIcon, ListItemButton, Grid, ListItemText, List } from "@mui/material"
import { useSelector } from "react-redux";

export const SideBar = ({ drawerWidth = 240 }) => {

  const { displayName } = useSelector(state => state.auth);

  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent' // temporary
            open // open={true}
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    ['demo', 'test', 'prueba', 'ejemplos'].map(text => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={text} />
                                    <ListItemText secondary={'Veniam proident voluptate.'} />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

        </Drawer>
    </Box>
  )
}
