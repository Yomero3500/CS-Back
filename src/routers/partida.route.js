const router = require('express').Router()
const Match = require('../models/Partida.model')

const clients = [];
const notifyClients = (data) => {
  clients.forEach((res, index) => {
    if (!res.finished) {
      res.json(data);
    } else {
      clients.splice(index, 1);
    }
  });
};

router.get('/' , async (req , res)=>{
    try {
        const match = await Match.findAll();
        res.send(match);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Ha ocurrido un error"})
    }
});

router.get('/unirse/:id_partida' , async (req , res)=>{
    const {id_partida} = req.params;
    try {
        await Match.sync();
        const match = await Match.findOne({where:{id_partida: id_partida}});   
        res.send(match)     
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Ha ocurrido un error"});
    }
});

router.get('/unirse/longpolling/:id_partida', async (req, res) => {
    const { id_partida } = req.params;
    try {
      req.socket.setTimeout(0);
      req.on('close', () => {
        console.log("Conexión cerrada por el cliente:", id_partida);
        const index = clients.indexOf(res);
        if (index !== -1) {
          clients.splice(index, 1);
        }
      });

      const match = await Match.findOne({ where: { id_partida: id_partida } });
      
      if (match.estado === "Finalizado") {
        notifyClients({ success: true, message: "Partida finalizada" });
        res.send({ success: true, estado: match.estado });
      } else {
        console.log("No hay cambios en la partida:", id_partida);
      }
    } catch (error) {
      console.log("Error en el long polling:", error);
      res.status(500).json({ error: "Ha ocurrido un error" });
    }
  });
  

router.post('/add' , async (req, res)=>{
    const {palabra, id_participante1, id_participante2, id_participante3} = req.body;
    try {
        await Match.sync();
        const match = await Match.create({
            palabra: palabra,
            estado: "En partida",
            letras_encontradas:"",
            intentos_restantes:3,
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

router.put('/letraIncorrecta', async (req, res)=>{
    const {id_partida} = req.body;
    try {
        const match = await Match.findOne({where:{id_partida}})
        if (!match) {
            return res.status(400).json({error:"No se ha encontrado la partida"});
        }else{
            match.intentos_restantes= (match.intentos_restantes-1);
            await match.save()
            .then(()=>{res.status(200).json(match.intentos_restantes)})
            .catch((e)=>console.log(e));
            return; 
        }
    } catch (error) {
        
    }
})

router.put('/letra', async (req, res)=>{
    const{id_partida, letra}=req.body;
    try {
        const match=await Match.findOne({where:{id_partida}});
        if(!match){
            return res.status(400).json({error:"No se ha encontrado la partida"});
        }
        const conteoLetraEnPalabra = match.palabra.split(letra).length-1;
        const conteoLetraEnLetra = match.letras_encontradas.split(letra).length-1;
        if(conteoLetraEnLetra>conteoLetraEnPalabra || !match.palabra.includes(letra)){
            return res.status(409).json({error:'La letra ya existe en la palabra'}); 
        }else{
            for (let index = 0; index < (conteoLetraEnPalabra- conteoLetraEnLetra); index++) {
                match.letras_encontradas+=(letra);
            }
            await match.save()
            .then(()=>{res.status(200).json(match.letras_encontradas)})
            .catch((e)=>console.log(e));
            return; 
        }
        
    } catch (error) {
        console.log("Error al buscar la partida");
        console.log(error);
        res.status(500).json({error:"Error interno del servidor"})
    }
});

router.put('/partida', async (req, res)=>{
    const{id_partida, estado}=req.body;
    
    try {
        const match=await Match.findOne({where:{id_partida}});
        const final = await match.update({estado: estado})
        if(!final){
            return res.status(400).json({error:"No se ha encontrado la partida"});
        }else{
            res.status(200).send('Partida finalizada');
        }
        
    } catch (error) {
        console.log("Error al buscar la partida");
        console.log(error);
        res.status(500).json({error:"Error interno del servidor"})
    }
});

module.exports  = router