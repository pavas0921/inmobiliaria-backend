import Cosigner from "../models/cosigner.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201
const HTTP_OK = 200
const HTTP_NO_CONTENT = 204

// Obtener todos los owner
export const getAllCosigners = async (req, res) => {
  try {
    const cosigner = await Cosigner.find();
    if (cosigner.length > 0) {
      return res.json({ status: HTTP_OK, cosigner });  
    } else {
      return res.json({ status: HTTP_NO_CONTENT, cosigner });   
    }
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ status: HTTP_INTERNAL_SERVER_ERROR, error: "Hubo un error al obtener los codeudores" });
  }
};

// Crear un nuevo propietario
export const createCosigner = async (req, res) => {
  const { first_name, last_name, cedula, email, address, phone } = req.body;
  try {
    const cosigner = await Cosigner.create({
      first_name,
      last_name,
      cedula,
      email,
      address,
      phone,
    });
    res.status(HTTP_CREATED).json({ httpStatus: HTTP_CREATED, error: "", status: "success", message: "Codeudor registrado con éxito!", content: cosigner });
  } catch (error) {
    if(error.code === 11000){
      if(error.keyPattern.email){
        res.status(HTTP_BAD_REQUEST).json({error: true, status: "error", message: "Ya existe un codeudor con el correo electrónico proporcionado."})
      }
      if(error.keyPattern.cedula){
        res.status(HTTP_BAD_REQUEST).json({error: true, status: "error", message: "Ya existe un codeudor con el documento de ideentidad proporcionado."})
      }
    }else{
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ status: true, message: "Hubo un error al obtener el codeudor" });
    }
  }
};

// Obtener un propietario por su cedula
export const getCosignerByCedula = async (req, res) => {
  const { cedula } = req.params;
  try {
    const cosigner = await Cosigner.find({cedula}).exec();
    if (cosigner.length > 0) {
      return res.json({ status: HTTP_OK, cosigner });  
    }else{
      return res.json({ status: HTTP_NO_CONTENT, cosigner });  
    }
   
  } catch (error) {
    console.log(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ status: HTTP_INTERNAL_SERVER_ERROR, error: "Hubo un error al obtener el codeudor" });
  }
};

// Actualizar un usuario por su cedula
export const updateCosigner = async (req, res) => {
  const { cedula } = req.params;
  const { first_name, last_name, email, address, phone } = req.body;
  try {
    const cosigner = await Cosigner.findOneAndUpdate(
      { cedula: cedula },
      { first_name, last_name, email, address, phone },
      { new: true }
    );
    if (!cosigner) {
      return res
        .status(404)
        .json({ error: "Codeudor no encontrado no encontrado" });
    }
    res.json(cosigner);
  } catch (error) {
    if(error.code === 11000){
      if(error.keyPattern.email){
        res.status(HTTP_BAD_REQUEST).json({error: true, status: "error", message: "Ya existe un codeudor con el correo electrónico proporcionado."})
      }
      if(error.keyPattern.cedula){
        res.status(HTTP_BAD_REQUEST).json({error: true, status: "error", message: "Ya existe un codeudor con el documento de ideentidad proporcionado."})
      }
    }else{
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ status: true, message: "Hubo un error al obtener el codeudor" });
    }
  }
};

// Eliminar un propietario por su cedula
export const deleteCosigner = async (req, res) => {
  const { cedula } = req.params;
  try {
    const cosigner = await Cosigner.findOneAndDelete({ cedula: cedula });
    if (!cosigner) {
      return res.status(404).json({ error: "Codeudor no encontrado" });
    }
    res.json({ message: "Codeudor eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Codeudor" });
  }
};
