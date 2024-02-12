import axios from 'axios';

export const getAllMovies = async () => {
  try {
    const response = await axios.get("/movie");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch movies. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in getAllMovies:", error);
    throw new Error("Unexpected error occurred");
  }
};

export const senduserAuthRequest = async (data, signup) => {
  try {
    const response = await axios.post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Failed to authenticate user. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in senduserAuthRequest:", error);
    throw new Error("Unexpected error occurred");
  }
};

export const sendAdminAuthRequest = async (data) => {
  try {
    const response = await axios.post("/admin/login", {
      email: data.email,
      password: data.password,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Failed to authenticate admin. Status: ${response.status}`);
      console.error(response.data);  // Log the response data for more details
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error("Error in sendAdminAuthRequest:", error);
    throw new Error("Unexpected error occurred");
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}`);
    if (response.status !== 200) {
      console.log("Unexpected Error");
      return null;
    }
    const resData = response.data;
    return resData;
  } catch (error) {
    console.error("Error in getMovieDetails:", error);
    throw new Error("Unexpected error occurred");
  }
};


export const newBooking = async (data) => {
  try {
    const response = await axios.post('/booking', data);

    if (response.status === 201) {
      const resData = response.data;
      return resData;
    } else {
      console.error('Unexpected Status Code:', response.status);
      throw new Error(`Failed to add booking. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in newBooking:', error);
    throw error;
  }
};
   

export const getUserBooking = async () => {
  try {
    const id = localStorage.getItem("userId");
    const response = await axios.get(`/user/bookings/${id}`);

    if (response.status !== 200) {
      console.log("Unexpected Error");
      return null;
    }

    const resData = response.data;
    return resData;
  } catch (error) {
    console.error("Error in getUserBooking:", error);
    return null;
  }
};

export const deleteBooking = async (id) => {
  try {
    const response = await axios.delete(`/booking/${id}`);

    if (response.status === 200) {
      const resData = response.data;
      return resData;
    } else {
      console.log("Unexpected Error");
      return null;
    }
  } catch (error) {
    console.log("Error in deleteBooking:", error);
    return null;
  }
};

export const getUserDetails = async () => {
  try {
    const id = localStorage.getItem("userId");
    const response = await axios.get(`/user/${id}`);
    
    if (response.status !== 200) {
      console.log("Unexpected Error");
      return null;
    }

    const resData = response.data;
    return resData;
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    return null;
  }
};

export const addMovie = async (data) => {
  try {
    const response = await axios.post("/movie", {
      title: data.title,
      description: data.description,
      releaseDate: data.releaseDate,
      posterUrl: data.posterUrl,
      featured: data.featured,
      actors: data.actors,
      admin: localStorage.getItem("adminId"),
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 201) {
      const resData = response.data;
      return resData;
    } else {
      console.error("Unexpected Status Code:", response.status);
      throw new Error(`Failed to add movie. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in addMovie:", error);
    throw error;
  }
};


export const getAdminById = async () => {
  try {
    const adminId = localStorage.getItem("adminId");
    const response = await axios.get(`/admin/${adminId}`);
    
    if (response.status !== 200) {
      console.log("Unexpected Error Occurred");
      return null;
    }

    const resData = response.data;
    return resData;
  } catch (error) {
    console.error("Error in getAdminById:", error);
    throw error;
  }
};

