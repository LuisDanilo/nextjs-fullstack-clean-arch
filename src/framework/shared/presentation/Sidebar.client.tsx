'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { navItems } from '@/framework/shared/presentation/navItems'

const DRAWER_WIDTH = 256

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const close = () => setOpen(false)

  const navContent = (
    <List sx={{ px: 1 }}>
      {navItems.map(({ label, href, icon: Icon }) => {
        const active = pathname === href
        return (
          <ListItemButton
            key={href}
            component={Link}
            href={href}
            onClick={close}
            selected={active}
            sx={{ borderRadius: 1, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Icon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary={label} slotProps={{ primary: { variant: 'body2', sx: { fontWeight: active ? 600 : 400 } } }} />
          </ListItemButton>
        )
      })}
    </List>
  )

  return (
    <>
      <Box
        component='header'
        sx={{
          display: { xs: 'flex', lg: 'none' },
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>Clean Task</Typography>
          <IconButton aria-label='Abrir menú' aria-expanded={open} aria-controls='app-sidebar' onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Box>

      <Drawer
        open={open}
        onClose={close}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>Clean Task</Typography>
          <IconButton aria-label='Cerrar menú' onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
        {navContent}
      </Drawer>

      <Box
        component='aside'
        id='app-sidebar'
        sx={{
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          width: DRAWER_WIDTH,
          flexShrink: 0,
          borderRight: 1,
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        <Toolbar>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>Clean Task</Typography>
        </Toolbar>
        {navContent}
      </Box>
    </>
  )
}
