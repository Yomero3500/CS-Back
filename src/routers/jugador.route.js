const router = require('express').Router();
const Jugador = require('../models/Jugador.model');

router.get('/' , async (req , res)=>{
   try {
    const player = await Jugador.findAll();
    res.send(player)
   } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ha ocurrido un error"});
   }
})


router.post('/add' , async (req , res)=>{
    const {nombre, password} = req.body;
    try {
        await Jugador.sync();
        const player = await Jugador.create({
            nombre: nombre,
            password: password,

        });
        res.json({player, message: "Usuario creado"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Ha ha ocurrido un error"});
    }
})

router.put('/actualizarPuntuacion' , async (req , res)=>{
    const {id_usuario, totalVictorias} = req.body;
    try {
        await Jugador.sync();
        const player = await Jugador.update({
            totalVictorias: totalVictorias
        }, {where: {id_usuario: id_usuario}});
        res.json(player)
    } catch (error) {
        res.status(500).json({ error: "Ha ha ocurrido un error"});
    }
});

router.get('/buscarUsuario' , async (req , res)=>{
    const {nombre, password} = req.query;
    try {
        const player = await Jugador.findOne({
            where:{nombre: nombre, password: password}})
        res.json({player, message: "Usuario encontrado"})
    } catch (error) {
        console.log(error);
        res.status(500);
    }
})

module.exports  = router;