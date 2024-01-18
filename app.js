const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
    console.log(req.params)
});

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };

    usuarios.push(nuevoUsuario);
    res.redirect('/usuarios');
});

app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    console.log(req.params)
    const usuario = usuarios.find(u => u.nombre === nombre);

    if (!usuario) {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } else {
        res.json(usuario);
    }
});

app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuarioIndex = usuarios.findIndex(u => u.nombre === nombre);

    if (usuarioIndex === -1) {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } else {
        usuarios[usuarioIndex].edad = req.body.edad;
        usuarios[usuarioIndex].lugarProcedencia = req.body.lugarProcedencia;
        res.json(usuarios[usuarioIndex]);
    }
});

app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    usuarios = usuarios.filter(u => u.nombre !== nombre);
    res.json({ mensaje: 'Usuario eliminado correctamente' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
