import bcrypt from "bcrypt";
import User from "../models/user.js";


// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    const { name, lastname, id, email, password } = req.body;
        const hash = bcrypt.hashSync(password, 12);
    try {
      const user = await User.create({
        name, lastname, id, email, password: hash
      });
      res.status(201).json({ status: 201, user });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  };

  //Login
  export const login = async (req, res, next) => {
    console.log("hola")
    const { email, password } = req.body;
    console.log("email***", email)
    try {
      const user = await User.findOne({ email });
      if(user && bcrypt.compareSync(password, user.password)){
        req.body.user = user;
        console.log(req.body.user)
        next();
      }
      else{
        return res.status(HTTP_NOT_FOUND).json({ status: HTTP_NOT_FOUND, error: true, message: "Credenciales incorrectas" });
      }  
    } catch (error) {
      console.log(error);
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: true });
    }
  };

  // Obtener todos los user
export const getUsers = async (req, res) => {
  try {
    const item = await User.find().populate("idStore").populate("idRol").exec();
    if (item.length) return res.json({ status: 201, item });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al obtener los user" });
  }
};

export const getUserById = async (req, res) => {
  const {_id} = req.params
  try {
    const item = await User.find({_id}).populate("idStore").populate("idRol").exec();
    if (item.length) return res.json({ status: 201, item });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al obtener los user" });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  const _id = req.params
  const { id, name, lastname, email, idRol, idStore } = req.body;
  const newUser = req.body 
  
  try {
  const user = await User.findOneAndUpdate({ _id }, { name, lastname, id, email, idRol, idStore });
  if (user) {
  res.status(200).json({ status: 200, user });
  } else {
  res.status(404).json({ status: 404, message: "No se encontró el usuario" });
  }
  } catch (error) {
  console.log(error);
  res.status(500).json({ error: "Error al actualizar el usuario" });
  }
  };


  