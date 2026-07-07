import User from "../models/User.js";
import { loginUser, refreshAccessToken, registerUser } from "../services/authService.js";
import { generateAccessToken, generateRefreshToken } from "../services/TokenService.js";

const accessTokenCookieOptions = {
  httpOnly: true,       
  secure: process.env.NODE_ENV === "production",         
  sameSite: "lax",   
  maxAge: 15 * 60 * 1000
}
const refreshTokenCookieOptions = {
  httpOnly: true,       
  secure: process.env.NODE_ENV === "production",         
  sameSite: "lax",   
  maxAge: 7 * 24 * 60 * 60 * 1000 
  }

export const register = async (req, res) => {
  try{
    const {user, accessToken, refreshToken} = await registerUser(req.body);

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
     
  } catch (error){
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  
}

export const login = async (req, res) => {
  try {
    const {user, accessToken, refreshToken} = await loginUser(req.body);
    
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    res.status(201).json({
      success: true,
      message: "User Logged-In Successfully",
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const {accessToken} = await refreshAccessToken(refreshToken);

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    res.status(201).json({
      success: true,
      message: "New access token generated successfully",
    });
    
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }

}

export const logout = async (req, res) => {
  res.clearCookie("accessToken", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});

res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getMe = (req, res) => {
  res.status(200).json({user : req.user});
}