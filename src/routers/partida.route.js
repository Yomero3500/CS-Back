const router = require('express').Router()
const Match = require('../models/Partida.model')

router.get('/' , async (req , res)=>{
    try {
        const match = await Match.findAll();
        res.send(match);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Ha ocurrido un error"})
    }
});

router.get('/partida/actualizaciones' , async (req , res)=>{
    try {
        const match = await Match.findAll();        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Ha ocurrido un error"});
    }
});

router.post('/add' , async (req, res)=>{
    const {id_partida, palabra,estado, id_participante1, id_participante2, id_participante3} = req.body;
    try {
        await Match.sync();
        const match = await Match.create({
            id_partida: id_partida,
            palabra: palabra,
            estado: estado,
            id_participante1: id_participante1,
            id_participante2: id_participante2,
            id_participante3: id_participante3
        });
        res.json(match)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Ha ocurrido un error"})
    }
});

module.exports  = router