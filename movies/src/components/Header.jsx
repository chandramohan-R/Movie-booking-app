import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { IconButton, Tab, Tabs, TextField, Toolbar } from '@mui/material';
import { Box } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllMovies } from '../api-helpers/api-helper';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { adminActions, userActions } from '../store';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state)=> state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state)=> state.user.isLoggedIn);
    const [value, setValue] = useState(0);
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies || [])) // Set an empty array if data.movies is undefined
            .catch((err) => console.log(err));
    }, []);

    const logout =(isAdmin) =>{
        dispatch(isAdmin?adminActions.logout():userActions.logout())

    }
    const handleChange = (e, val) => {
        const movie = movies.find((m) => m.title === val);
         console.log(movie)
        if (isUserLoggedIn && movie) {
          navigate(`/booking/${movie._id}`);
        }
      };

    return (
        <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
            <Toolbar>
                <Box width={'30%'}>
                    <IconButton LinkComponent={Link} to="/">
                    <MovieIcon />
                    </IconButton>
                  
                </Box>
                <Box width={'30%'} margin={"auto"}>
                    <Autocomplete
                    onChange={handleChange}
                        freeSolo
                        options={movies.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField
                                sx={{ input: { bgcolor: "white" } }}
                                variant="standard"
                                {...params}
                                placeholder="Search Across Multiple Movies"
                            />
                        )}
                    />
                </Box>
                <Box display={"flex"}>
                    <Tabs
                        textColor="inherit"
                        indicatorColor="secondary"
                        value={value}
                        onChange={(e, val) => setValue(val)}
                    >
                        <Tab LinkComponent={Link} to="/movies" label="Movies" />
                        {!isAdminLoggedIn && !isUserLoggedIn && 
                        <div>
                            <Tab LinkComponent={Link} to="/admin" label="Admin" />
                            <Tab LinkComponent={Link} to="/auth" label="Auth" />
                        
                        </div>}

                        {!isUserLoggedIn && (
                        <div>
                            <Tab label="profile" LinkComponent={Link} to="/user" />
                            <Tab onClick={()=> logout(false)}
                             label="Logout" 
                             LinkComponent={Link} 
                             to="/" 
                              />
                        
                        </div>)}

                        {isAdminLoggedIn && (
                        <div>
                            <Tab label="Add Movie" LinkComponent={Link} to="/add" />
                            <Tab label="profile" LinkComponent={Link} to="/user-admin" />
                            <Tab 
                            onClick={()=> logout(true)} 
                            label="Logout" 
                            LinkComponent={Link}
                             to="/" 
                              />
                        
                        </div>)}
                       
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
