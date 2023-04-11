const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.set('view engine','ejs');

var db;
MongoClient.connect('mongodb+srv://flsgp0317:fls0810@cluster0.kpfz9gw.mongodb.net/todoapp?retryWrites=true&w=majority',{ useUnifiedTopology: true },(err,client)=>{
    console.log('db connected successfully');
    if(err) return console.log(err);

    db = client.db('todoapp');
    app.listen(8080,()=>{
        console.log('server open');
    });
});


app.use(express.json());
app.use(express.urlencoded({ extended: false })); //form으로 전달된 객체 인코딩

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.get('/write',(req,res)=>{
    res.sendFile(__dirname+'/write.html');
});

app.get('/list',(req,res)=>{
    
    db.collection('post').find().toArray((err,result)=>{
        console.log(result);
        res.render('list.ejs',{posts: result});
    }); //다 찾아주라

});

app.post('/add',(req,res)=>{
    const {title,date} = req.body
    db.collection('post').insertOne({title,date});
    res.send('전송완료');
});

