const { Router } = require('express');
const { check } = require('express-validator');
const { userGET, userPOST, userPUT, userDELETE } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { rolExiste, correoExiste, usuarioExistePorId } = require('../helpers/db-validators.helpers');

const router = Router();

router.get('/', userGET);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de tener al menos 6 caracteres.').isLength({ min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correoExiste),
    check('rol').custom(rolExiste),
    validarCampos
] ,userPOST);
router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    check('rol').custom(rolExiste),
    validarCampos
], userPUT);
router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    validarCampos
], userDELETE);

module.exports = router;