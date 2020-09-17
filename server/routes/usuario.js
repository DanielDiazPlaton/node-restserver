const express = require('express');

// encripta contraseñas
const bcrypt = require('bcrypt');

// quita los valores que no queremos mostrar en el PUT
const _ = require('underscore');

const Usuario = require('../models/usuario'); // creo la constante para crear la instancia


const app = express();

/**
 * Se utilizo el metodo GET para traer el listado de todos los usuarios, manejando
 * el error.
 * 
 */
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            })


        })

});

app.post('/usuario', function(req, res) {

    let body = req.body;

    /* Esto crea una nueva instancia de usuarioSchema con todas las propedades 
        que traes ese Schema, ademas que puedo pasarle todos los parametros que
        requiera esa nueva instancia*/
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    // el (save) es para guardar en la base de datos
    usuario.save((err, usuarioDB) => {

        /**
         * En caso de que ocurra un error retorna una peticion 400 e indica el 
         * error que hubo, y le pongo return para que ahi se deje de ejecutar
         */
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        /**
         * Si no hubo el error
         */

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});


/**
 * Actualizo a los usuarios a traves del metodo PUT con el id
 * 
 */
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    /**
     * EN caso de querer eliminar opciones para actualizar datos que no
     * deben modificarse desde el metodo PUT
     */

    //  delete body.password; // En caso de que sean pocas opciones
    //  delete body.google;



    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        /**
         * En caso de que haya un error salgo de la funcion retornando el callback err
         */
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        /**
         * En caso de que todo salga bien
         */
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {


        /**
         * En caso de que haya un error salgo de la funcion retornando el callback err
         */
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        // si todo va bien
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    })


});

module.exports = app;