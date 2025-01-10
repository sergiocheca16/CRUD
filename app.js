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

app.get('/', (req, res) => {
    res.send(`
        <h1>Lista de usuarios</h1>
        <ul>
        ${usuarios.map((usuario) => `<li>ID: <b>${usuario.id}</b> | <b>Nombre:</b> ${usuario.nombre} | <b>Edad:</b> ${usuario.edad} | <b>LugarProcedencia:</b> ${usuario.lugarProcedencia}</li>`).join('')}
        </ul>
        <form action="/usuarios" method="post">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            <label for="edad">Edad:</label>
            <input type="number" id="edad" name="edad" required>
            <label for="lugarProcedencia">Lugar de Procedencia:</label>
            <input type="text" id="lugarProcedencia" name="lugarProcedencia" required>
            <button type="submit">Agregar usuario</button>
        </form>
        <form action="/usuarios" method="get">
            <label for="nombre">Buscar usuario por nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            <button type="submit">Buscar usuario</button>
        </form>
        <a href="/usuarios">Usuario json</a>
        `)
});


//Obtener usuario por nombre
app.get('/usuarios', (req, res) => {
    if (req.query.nombre) {
        const nombre = req.query.nombre.toLowerCase();
        const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }
        return res.send(`
            <h1>Lista de usuarios</h1>
            <ul>
                <li>ID: <b>${usuario.id}</b> | <b>Nombre:</b> ${usuario.nombre} | <b>Edad:</b> ${usuario.edad} | <b>LugarProcedencia:</b> ${usuario.lugarProcedencia}</li>
            </ul>
            <a href="/">Página principal</a>
        `);
    }
    res.json(usuarios);
});

//Introducir un nuevo usuario
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: req.body.nombre,
      edad: req.body.edad,
      lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/');
});

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`Express esta escuchando en http://localhost:${PORT}`);
});