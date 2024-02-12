import React, { useEffect, useState } from 'react';
import { getAdminById } from '../api-helpers/api-helper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Fragment } from 'react';

function AdminProfile() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => {
        console.log(err);
        // Handle error gracefully, e.g., setAdmin(null) or display an error message.
      });
  }, []);

  return (
    <Box width="100%" display="flex">
      <Fragment>
        {admin && (
          <Box
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="30%"
          >
            <AccountCircleIcon sx={{ fontSize: '10rem', textAlign: 'center', ml: 3 ,justifyContent:'center', }} />

            <Typography mt={1} padding={1} width={'auto'} textAlign={'center'} border={'3px solid #ccc'} borderRadius={6}>
              Email: {admin.email}
            </Typography>
          </Box>
        )}
        <Box width="70%" display="flex" flexDirection={'column'}>
          <Typography variant="h3" fontFamily="verdana" textAlign="center" padding={2}>
            Added Movies
          </Typography>
          {admin && admin.addedMovies && admin.addedMovies.length > 0 ? (
            <Box margin="auto" width="80%">
              <List>
                {admin.addedMovies.map((movie, index) => (
                  <ListItem key={index} sx={{ bgcolor: '#00386', color: 'white', textAlign: 'center', margin: 1 }}>
                    <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }}>
                      Movie: {movie.title}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            <Typography variant="body1" textAlign="center">
              No added movies found.
            </Typography>
          )}
        </Box>
      </Fragment>
    </Box>
  );
}

export default AdminProfile;
