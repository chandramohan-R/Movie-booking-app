import User from "../models/User";
import bcrypt from "bcryptjs";

export const getAllUsers =async(req,res,next) =>{
    let users;
    try{
        users = await User.find();


    }catch(err){
        return console.log(err);

    }

    if(!users){
        return res.status(500).json({message: "Unexpected Error Occured"});

    }
    return res.status(200).json({users})
   
}

export const signup = async(req, res, next)=>{
    const { name, email,password}= req.body;
    if(!name && name.trim()==="" && !email & email.trim()==="" && !password && password.trim ===""){
        return res.status(422).json({message: "Invalid Inputs"});

    }
    const hashedPassword =bcrypt.hashSync(password);

      let user;

      try{
        user = new User({ name, email, password:hashedPassword});
        user = await user.save();

      }catch(err){
        return console.log(err);
      }

      if(!user){
        return res.status(500).json({message: "Unexpected Error Occured"});

      }

      return res.status(201).json({ id: user._id})
      


};

export const updateUser = async (req, res, next)=>{
      const id = req.params.id;
      const { name, email,password}= req.body;
      if(!name && name.trim()==="" && !email & email.trim()==="" && !password && password.trim ===""){
          return res.status(422).json({message: "Invalid Inputs"});
  
      }
      const hashedPassword =bcrypt.hashSync(password);

      let user;

      try{
        user = await User.findByIdUpdate(id,{ name, email, password:hashedPassword});
        user = await user.save();

      }catch(err){
        return console.log(err);
      }
      if(!user){
        return res.status(500).json({message: "something wend wrong"})
      }
      res.status(200).json({message: "User updated successfully"})



};



export const deleteUser = async (req, res, next)=>{
      const id = req.params.id;
      let user;
      try{
        user = await User.findByIdRemove(id);

      }catch(err){
        return console.log(err)
      }


      if(!user){
        return res.status(500).json({message: "something wend wrong"})
      }
      res.status(200).json({message: "User deleted successfully"})

}
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email.trim() === "" || !password || password.trim() === "") {
      return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingUser;

  try {
      existingUser = await User.findOne({ email });
  } catch (err) {
      return console.log(err);
  }

  if (!existingUser) {
      return res.status(404).json({ message: "Unable to find this user ID" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
  }

  // Add this line to send a success message when login is successful
  return res.status(200).json({ message: "Login successfully", user: existingUser });
};

export const getBookingOfUser = async(req, res, next)=>{
  const id = req.params.id;
  let bookings;
  try{
    bookings = await Booking.find({ user: id })

  }catch(err){
    return console.log(err)
  }

if(!bookings){
  return res.status(500).json({ bookings})
}

}


export const getUserById =async(req,res,next) =>{
  const id =req.params.id;
  
  let user;
  try{
      users = await User.findById(id);


  }catch(err){
      return console.log(err);

  }

  if(!user){
      return res.status(500).json({message: "Unexpected Error Occured"});

  }
  return res.status(200).json({user})
 
}

