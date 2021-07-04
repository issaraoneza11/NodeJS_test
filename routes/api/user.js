const express = require('express');
const router = express.Router();
const data_test = require('../../data_test');
const uuid = require('uuid');
//all data
router.get('/',(req,res) => {
    res.json(data_test);
})

//get single data
router.get('/:no',(req,res) =>{
   


    let found = data_test.some(data_test => data_test.no == req.params.no);
    if(found){
       let data = data_test.filter(data_test => data_test.no == req.params.no);
       res.json(data);
       console.log(data);
        
    }else{
       let msg =  {msg: 'ไม่มี user '+req.params.no+' ในระบบ'} ;
       res.status(400).json(msg);
        console.log(msg);
   }
  
});

//add data
router.post('/',(req,res) =>{
    const newData ={
        id: uuid.v4(),
        name: req.body.name,
        lname: req.body.lname,
        age: req.body.age,
        type: req.body.type
    }
    if(!newData.name ||!newData.lname ||!newData.age ||!newData.type ){
        return res.status(400).json({ msg: 'กรุณาใส่ข้อมูลให้ครบด้วยนะ'});
    }
    data_test.push(newData);
    res.json(data_test);

})


//udate data
router.put('/:no',(req,res) =>{

    let found = data_test.some(data_t => data_t.no == req.params.no);
    if(found){
        const update_data = req.body;
        data_test.forEach(data_t =>{
            if(data_t.no === parseInt(req.params.no)){
                data_t.name = update_data ? update_data.name : data_t.name;
                data_t.lname = update_data ? update_data.lname : data_t.lname;
                data_t.age = update_data ? update_data.age : data_t.age;
                data_t.type = update_data ? update_data.type : data_t.type;

                res.json({msg: 'อัพเดตข้อมูลเรียบร้อย',data_t});
                
                }
        })
    }else{
        let msg =  {msg: 'ไม่มี user '+req.params.no+' ในระบบ จึงไม่สามารถอัพเดตได้'} ;
        res.status(400).json(msg);
         console.log(msg);
    }
})


// delete data
router.delete('/:no',(req,res) =>{
    let found = data_test.some(data_t => data_t.no == req.params.no);
    if(found){
        res.json({
                msg: 'ลบ data นี้เรียบร้อย',
                data_test: data_test.filter(data_t => data_t.no !== parseInt(req.params.no))
    })
    }else{
        res.status(400).json({msg: 'No data'});
    }
})

module.exports = router;