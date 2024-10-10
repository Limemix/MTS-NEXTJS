"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/icons-material/Menu';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import WebIcon from '@mui/icons-material/Web';
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter()
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const navigateTo = (route) => {
    router.push(route);
    setOpen(false);
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateTo('/admin/edit')}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={'Редактор сторінки'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateTo('/admin/programs')}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary={'Освітні програми'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateTo('/admin/news')}>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary={'Новини'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateTo('/admin/partners')}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={'Партнери'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateTo('/')}>
            <ListItemIcon>
              <WebIcon />
            </ListItemIcon>
            <ListItemText primary={'Повернутися на сайт'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button style={{color: "white"}} onClick={toggleDrawer(true)}><Menu sx={{ fontSize: 40 }} /></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}