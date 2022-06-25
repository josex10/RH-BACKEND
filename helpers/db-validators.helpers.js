
const Rol = require('../models/rol.model');
const Usuario = require('../models/usuario.model');

const rolExiste = async (rol ='')=>{
    const existRol = await Rol.findOne({rol});
    if(!existRol) throw new Error(`El rol ${rol}, no esta registrado en la DB.`);
}

const correoExiste = async (correo ='')=>{
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo) throw new Error(`El correo ${correo}, ya esta registrado en la DB.`);
}

const usuarioExistePorId = async(id) =>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) throw new Error(`El id ${id} no existe en la DB.`);
}

module.exports = {
    rolExiste, 
    correoExiste,
    usuarioExistePorId
}