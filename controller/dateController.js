const { Op } = require("sequelize");
const Slot = require("../model/Inventory").default;


exports.dates=  async(req,res)=>{
    const id  = req.params.id

    const dates = await Slot.findAll({where:{
        productId:id,
        startDate:{
            [Op.gte]: new Date()
        }
    }})

    const datesMapping = dates.map((item) => ({
        date: item.startDate,
        price: {
          discount: item.paxAvailability[0].price.discount,
          finalPrice: item.paxAvailability[0].price.finalPrice,
          currencyCode: item.paxAvailability[0].price.currencyCode,
          originalPrice: item.paxAvailability[0].price.originalPrice,
        },
      }));
    res.json({dates:datesMapping})
}
