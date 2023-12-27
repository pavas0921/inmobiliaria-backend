import Tenant from "../models/tenant.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_CREATED = 201
const HTTP_OK = 200
const HTTP_NO_CONTENT = 204

// Obtener todos los inquilinos
export const getAllTenants = async (req, res) => {
  try {
    const tenant = await Tenant.find();
    if (tenant.length > 0) {
      return res.json({ status: HTTP_OK, tenant });  
    } else {
      return res.json({ status: HTTP_NO_CONTENT, tenant });   
    }
  } catch (error) {
    console.log(error)
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ status: HTTP_INTERNAL_SERVER_ERROR, error: "Hubo un error al obtener los inquilinos." });
  }
};

// Crear un nuevo inquilino
export const createTenant = async (req, res) => {
  const { first_name, last_name, cedula, email, address, phone } = req.body;
  try {
    const tenant = await Tenant.create({
      first_name,
      last_name,
      cedula,
      email,
      address,
      phone,
    });
    res.status(HTTP_CREATED).json({  httpStatus: HTTP_CREATED, error: "", status: "success", message: "¡Inquilino registrado con éxito!", content: tenant});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Obtener un propietario por su cedula
export const getTenantByCedula = async (req, res) => {
  const { cedula } = req.params;
  try {
    const tenant = await Tenant.find({cedula}).exec();
    if (tenant.length > 0) {
      return res.json({ status: HTTP_OK, tenant });  
    }else{
      return res.json({ status: HTTP_NO_CONTENT, tenant });  
    }
   
  } catch (error) {
    console.log(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ status: HTTP_INTERNAL_SERVER_ERROR, error: "Hubo un error al obtener el inquilino" });
  }
};

// Actualizar un inquilino por su cedula
export const updateTenant = async (req, res) => {
  const { cedula } = req.params;
  const { first_name, last_name, email, address, phone } = req.body;
  try {
    const tenant = await Tenant.findOneAndUpdate(
      { cedula: cedula },
      { first_name, last_name, email, address, phone },
      { new: true }
    );
    if (!tenant) {
      return res
        .status(404)
        .json({ error: "El inquilino no ha sido encontrado" });
    }
    res.json(owner);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Eliminar un propietario por su cedula
export const deleteTenant = async (req, res) => {
  const { cedula } = req.params;
  try {
    const tenant = await Tenant.findOneAndDelete({ cedula: cedula });
    if (!tenant) {
      return res.status(404).json({ error: "Inquilino no encontrado" });
    }
    res.json({ message: "Inquilino eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Inquilino" });
  }
};
