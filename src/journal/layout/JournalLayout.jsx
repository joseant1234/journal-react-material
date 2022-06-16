import { Box } from "@mui/system"
import { NavBar } from "../components/NavBar";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
        <NavBar drawerWidth={drawerWidth} />

        {/* Sidebar */}

        {/* component='main' es como si fuera <main></main> */}
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
        >
            {/* Toolbar */}
            { children }
        </Box>
    </Box>
  )
}
