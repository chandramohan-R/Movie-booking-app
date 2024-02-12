import React, { useEffect, useState } from 'react';
import { deleteBooking, getUserBooking, getUserDetails } from '../api-helpers/api-helper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Fragment } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function UserProfile() {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    getUserBooking()
      .then(res => setBookings(res.bookings))
      .catch(err => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch(err => console.log(err));
  }, []);

  console.log(bookings);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <Box width="100%" display="flex">
      {bookings && bookings.length > 0 && (
        <Fragment>
          {" "}
          {user && (
            <Box
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="30%"
            >
              <AccountCircleIcon sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }} />
              <Typography padding={1} width={"auto"} textAlign={"center"} border={"3px solid #ccc"} borderRadius={6} >
                Name: {user.name}
              </Typography>
              <Typography mt={1} padding={1} width={"auto"} textAlign={"center"} border={"3px solid #ccc"} borderRadius={6} >
                Email: {user.email}
              </Typography>
            </Box>
          )}
          <Box width="70%" display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily="verdana"
              textAlign="center"
              padding={2}
            >
              Bookings
            </Typography>
            {bookings && (bookings.length > 0) && (
              <Box
                margin="auto"
                display="flex"
                flexDirection={["column"]}
                width="80%"
              >
                <List>
                  {bookings.map((booking, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        bgcolor: "#00386",
                        color: "white",
                        textAlign: "center",
                        margin: 1
                      }}
                    >
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left" }}  >

                        Movie: {booking.movie.title}
                      </ListItemText>
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left" }} >
                        seat: {booking.seatNumber}
                      </ListItemText>
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left" }} >
                        Date: {new Date(booking.date).toDateString()}
                      </ListItemText>
                      <IconButton onClick={() => handleDelete(booking._id)} color="error">
                        <DeleteForeverIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        </Fragment>
      )}
    </Box>
  );
}

export default UserProfile;
