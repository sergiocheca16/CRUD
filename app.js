const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Lista de usuarios
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//Introducir un nuevo usuario
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

//Obtener usuario por nombre
app.get('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    const usuario = usuarios.find((user) => {user.nombre.toLowerCase() === nombre.toLowerCase()});
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no existe' });
    }

    res.json(usuario);
});

//Actualizar información usuario por nombre
app.put('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    const { edad, lugarProcedencia } = req.body;
    const index = usuarios.findIndex(user => user.nombre.toLowerCase() === nombre.toLowerCase());
    if (index === -1) {
        return res.status(404).json({ error: 'Usuario no existe' });
    }

    if (edad) {
        usuarios[index].edad = edad;
    }

    if (lugarProcedencia) {
        usuarios[index].lugarProcedencia = lugarProcedencia;
    }

    res.json(usuarios[index]);
})

//Eliminar usuario por nombre
app.delete('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    const usuarioExiste = usuarios.some((user) => {user.nombre.toLowerCase() === nombre.toLowerCase()});
    if (!usuarioExiste) {
        return res.status(404).json({ error: 'Usuario no existe' });
    }

    usuarios = usuarios.filter(user => user.nombre.toLowerCase() !== nombre.toLowerCase())
    res.json({ mensaje: `Usuario ${nombre} eliminado` });
});

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`Express esta escuchando en http://localhost:${PORT}`);
});