import { Box } from "@mui/system"

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
        {/* Navbar */}

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
