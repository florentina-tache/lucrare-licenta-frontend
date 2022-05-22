import React, {useState, useContext, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@mui/material/IconButton';

import { AppProviderContext } from "../../integration/context/appProviderContext";
import { server } from '../../helpers/utils/constants';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Input = styled('input')({
  display: 'none',
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const UsersList = () => {
  const classes = useStyles();

  const [users, setUsers] = useState(null);
  const { actions } = useContext(AppProviderContext);

  const fetchUsers = async () => {
    const fetchedUsers = await actions.fetchUsers();
    setUsers(fetchedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Avatar</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>See favourites</TableCell>
            <TableCell>Edit added places</TableCell>
            <TableCell>Delete user</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.name}>
              <TableCell component='th' scope='row'>
                {user.firstName}
              </TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>
                <Avatar alt='Remy Sharp' src={server + 'uploads/userDefault.png'} />
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <label htmlFor='icon-button-file'>
                  <Input accept='image/*' id='icon-button-file' type='button' />
                  <IconButton
                    color='error'
                    aria-label='upload picture'
                    component='span'
                  >
                    <VisibilityIcon />
                  </IconButton>
                </label>
              </TableCell>
              <TableCell>
                <label htmlFor='icon-button-file'>
                  <Input accept='image/*' id='icon-button-file' type='button' />
                  <IconButton
                    color='error'
                    aria-label='upload picture'
                    component='span'
                  >
                    <CreateIcon />
                  </IconButton>
                </label>
              </TableCell>
              <TableCell>
                <label htmlFor='icon-button-file'>
                  <Input accept='image/*' id='icon-button-file' type='button' />
                  <IconButton
                    color='error'
                    aria-label='upload picture'
                    component='span'
                  >
                    <DeleteIcon />
                  </IconButton>
                </label>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
