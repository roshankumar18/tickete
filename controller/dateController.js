const { Op } = require("sequelize");
const Slot = require("../model/Inventory");


exports.dates=  async(req,res)=>{
    const id  = req.params.id
    try{
    const dates = await Slot.findAll({where:{
        productId:id,
        startDate:{
            [Op.gte]: new Date()
        }
    }})
  }catch(err){
    
    res.status(500).json({message:err.message})
  }
    const datesMapping = dates.map((item) => ({
        date: item.startDate,
        price: {
          discount: item.paxAvailability[0].price.discount,
          finalPrice: item.paxAvailability[0].price.finalPrice,
          currencyCode: item.paxAvailability[0].price.currencyCode,
          originalPrice: item.paxAvailability[0].price.originalPrice,
        },
      }));
    res.status(200).json({dates:datesMapping})
}
