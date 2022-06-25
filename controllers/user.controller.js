const { response, request } = require('express');
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');


const userGET = async (req = request, res = response)=>{
    const { limite = 5, desde = 0 } = req.query;
    const query = {estado:true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({total, usuarios});
}

const userPOST = async (req, res = response)=>{

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
   
    //ENCRIPTAR LA CONTRASENA
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //GUARDAR EN DB
    await usuario.save();

    res.json({usuario});
}

const userPUT = async (req = request, res = response)=>{

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO: VALIDAR VS DB

    if(password){
        //ENCRIPTAR LA CONTRASENA
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        usuario
    });
}

const userDELETE = async (req, res = response)=>{

    const { id } = req.params;

    //BORRAR FISICAMENTE
    // const usuario = await Usuario.findByIdAndDelete( id );

    //BORRAR CON INTEGRACION
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false});


    res.json({
        usuario
    });
}


module.exports = {
    userGET, userPOST, userPUT, userDELETE
}