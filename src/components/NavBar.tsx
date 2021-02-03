import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

// MUI Import
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import PeopleIcon from '@material-ui/icons/People'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

// Components
import NavProfil from './NavProfil'

// Types
import { IUser } from '../types/data'

const drawerWidth = 240

interface IProps {
  open: boolean
  handleDrawerClose: () => void
  user: IUser
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
      backgroundColor: theme.palette.primary.main
    },
    nested: {
      paddingLeft: theme.spacing(9)
    }
  })
)

const NavBar = ({ open, handleDrawerClose, user }: IProps): JSX.Element => {
  const classes = useStyles()
  const [openClasse, setOpenClasse] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index)
  }
  const handleClickClasse = () => {
    setOpenClasse(!openClasse)
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={clsx(classes.drawerHeader)}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon color="secondary" />
        </IconButton>
      </div>
      <NavProfil user={user} />
      <List>
        {!user.isStudent && (
          <>
            <ListItem
              button
              component={Link}
              to="/classe"
              selected={selectedIndex === 1}
              onClick={(event: any) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Classe" />
              {openClasse ? (
                <ExpandLess onClick={handleClickClasse} />
              ) : (
                <ExpandMore onClick={handleClickClasse} />
              )}
            </ListItem>
            <Collapse in={openClasse} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/classe/suivi-des-humeurs"
                  selected={selectedIndex === 4}
                  onClick={(event: any) => handleListItemClick(event, 4)}
                >
                  <ListItemText primary="Suivi des humeurs" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/classe/suivi-des-quiz"
                  className={classes.nested}
                  selected={selectedIndex === 5}
                  onClick={(event: any) => handleListItemClick(event, 5)}
                >
                  <ListItemText primary="Suivi des quiz" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}
        {user.isStudent && (
          <>
            <ListItem
              button
              component={Link}
              to="/profil"
              selected={selectedIndex === 1}
              onClick={(event: any) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Mon profil" />
              {openClasse ? (
                <ExpandLess onClick={handleClickClasse} />
              ) : (
                <ExpandMore onClick={handleClickClasse} />
              )}
            </ListItem>
            <Collapse in={openClasse} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/profil/mes-stats"
                  selected={selectedIndex === 4}
                  onClick={(event: any) => handleListItemClick(event, 4)}
                >
                  <ListItemText primary="Mes stats" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}
        <ListItem
          button
          component={Link}
          to="/quiz"
          selected={selectedIndex === 2}
          onClick={(event: any) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <ViewQuiltIcon />
          </ListItemIcon>
          <ListItemText primary="Quiz" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/ressources"
          selected={selectedIndex === 3}
          onClick={(event: any) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Ressources" />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default NavBar
