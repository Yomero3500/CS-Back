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
    const {id_usuario, nombre, password, totalVictorias} = req.body;
    try {
        await Jugador.sync();
        const player = await Jugador.create({
            id_usuario: id_usuario,
            nombre: nombre,
            password: password,
            totalVictorias: totalVictorias
        });
        res.json(player)
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

module.exports  = router;