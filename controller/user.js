const express = require('express');
const bcrypt = require('bcrypt')

const register = (req,res,next)=>{
const {username,password} =req.body;
const hashedPassword = bcrypt.hash(password,10);

const user = {
    username:username,
    password : hashedPassword
}



}

const login = (req,res,next)=>{

}

module.exports ={register,login}
