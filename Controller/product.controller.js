const Product = require("../Model/Product.model");
const Cart = require("../Model/cart.model");
const Razorpay=require("razorpay")

const get=async(req,res)=>{
    try {
        let data = await Product.find();
        res.send(data);
      } catch (error) {
        res.status(404).send({ error: error.message });
      }
}

const create=async(req,res)=>{
    req.body.createdBy=req.user.id
    let data =await Product.create(req.body);
    res.send(data);
}
//admin

const adminproduct=async(req,res)=>{
    let data = await Product.find({createdBy: req.user.id})
    res.send(data);
}

const getcreate=async(req,res)=>{
    res.render("product")
}

const getusers=async(req,res)=>{
    res.render("user")
}

//cart

const cart=async(req,res)=>{
    let userId=req.user.id;
    req.body.userId=userId;
    
    let data=await Cart.create(req.body)
    console.log(data);
    res.send(data)
}


const cartdata = async (req, res) => {
    try {
        const data = await Cart.find({ userId: req.user.id }).populate('productId');
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
const getcart=async(req,res)=>{
    res.render("cart")
}

const updatecart = async (req,res)=>{
    let {qty}=req.body;
    let {id}=req.params;
    let data=await Cart.findById(id)
    data.qty=data.qty+qty;
    await data.save();
    if(data.qty==0)
    {
        await Cart.findByIdAndDelete(id)
    }
    res.send({update:data});
}

//payment 
let razorpay=new Razorpay({
    key_id:"rzp_test_7Grqtls4UrZJlU",
    key_secret:"UvsWz2UDN7jcSM58yluYTxIz"
})
const payment=async(req,res)=>{
    console.log(req.body);
    let option={amount:req.body.amount*100,
    currency:"INR"}
    razorpay.orders.create(option,(err,order)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(order)
        }
    })
}
module.exports={payment,updatecart,getusers,getcreate,adminproduct,create,get,cart,cartdata,getcart}