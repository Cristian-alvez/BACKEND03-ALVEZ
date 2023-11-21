import express from 'express'
import ProductManager from 'ProductManager.js'
               
const app = express();

app.get('/products', (req,res) =>{
    const limit = req.query.limit;

    const PM = new ProductManager('/productos.txt');
    PM.cargarArchivo();

    const products = JSON.parse(PM.getProducts());
    
    if(limit){

        res.send(products);
    }
    else{
        let contador = 0;

        for (let product in products){
            if(contador===limit){
                break;
            }
            res.send({product});
        }
    }

})


app.get('/products/:pid',(req,res)=> {
    const pid = req.params.pid;
    
    const PM = new ProductManager('../productos.txt');
    
    const productById = PM.getProductById(pid)

    res.send({productById});


})

app.listen(8080, ()=>console.log("El servidor esta arriba"));

