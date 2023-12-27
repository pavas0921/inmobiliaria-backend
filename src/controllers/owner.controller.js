import Owner from "../models/owner.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201
const HTTP_OK = 200
const HTTP_NO_CONTENT = 204

// Obtener todos los owner
export const getAllOwners = async (req, res) => {
  try {
    const item = await Owner.find();
    if (item.length > 0) {
      return res.json({ status: HTTP_OK, item });  
    } else {
      return res.json({ status: HTTP_NO_CONTENT, item });   
    }
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ status: HTTP_INTERNAL_SERVER_ERROR, error: "Hubo un error al obtener los propietarios" });
  }
};

// Crear un nuevo propietario
export const createOwner = async (req, res) => {
  const { first_name, last_name, cedula, email, address, phone } = req.body;
  try {
    const owner = await Owner.create({
      first_name,
      last_name,
      cedula,
      email,
      address,
      phone,
    });
    res.status(HTTP_CREATED).json({ httpStatus: HTTP_CREATED, error: "", status: "success", message: "¡Propietario registrado con éxito!", content: owner});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Obtener un propietario por su cedula
export const getOwnerByCedula = async (req, res) => {
  const { cedula } = req.params;
  try {
    const item = await Owner.find({cedula}).exec();
    if (item.length > 0) {
      return res.json({ status: HTTP_OK, item });  
    }else{
      return res.json({ status: HTTP_NO_CONTENT, item });  
    }
   
  } catch (error) {
    console.log(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ status: HTTP_INTERNAL_SERVER_ERROR, error: "Hubo un error al obtener el propietario" });
  }
};

// Actualizar un usuario por su cedula
export const updateOwner = async (req, res) => {
  const { cedula } = req.params;
  const { first_name, last_name, email, address, phone } = req.body;
  try {
    const owner = await Owner.findOneAndUpdate(
      { cedula: cedula },
      { first_name, last_name, email, address, phone },
      { new: true }
    );
    if (!owner) {
      return res
        .status(404)
        .json({ error: "Prpietario no encontrado no encontrado" });
    }
    res.json(owner);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Eliminar un propietario por su cedula
export const deleteOwner = async (req, res) => {
  const { cedula } = req.params;
  try {
    const owner = await Owner.findOneAndDelete({ cedula: cedula });
    if (!owner) {
      return res.status(404).json({ error: "Propietario no encontrado" });
    }
    res.json({ message: "Propietario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Propietario" });
  }
};
