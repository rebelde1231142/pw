import express from 'express';

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    const resposta = {"Result:":"API em execução"
    }
    return res.status(200).json(Resposta);
});

app.get('/soma',(req,res)=>{
    const {valores} = req.body;
    let Result = valores.reduce((total,valor)=>total+valor, 0)
    return res.status(200).json({"result":result})
})

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`aplicação esta em execução\nhttp://localhost:${PORT}`);
});