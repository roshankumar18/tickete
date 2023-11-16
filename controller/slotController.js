const { parseISO, format, isValid } = require("date-fns")
const Slot = require("../model/Inventory").default



exports.slot =  async (req,res)=>{
    const id = req.params.id
    const date = req.query.date
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required.' });
    }
    const parseDate = parseISO(date)
    if(!isValid(parseDate)){
        
        return res.status(400).json({error:'Invalid date format. Use yyyy-mm-dd.'})
    }

    const formttedDate = format(parseDate,'yyyy-MM-dd')
    
    const slots = await Slot.findAll({
        where:{
            productId:id,
            startDate:formttedDate
        }
    })
    const result = {
        paxContent: {},
        productGroup: {},
        priceProfiles: {},
        availableSlots: []
      };
    result.availableSlots = slots.map(slot=>{
        return {
            startTime: slot.startTime,
            startDate: slot.startDate,
            endtDate: slot.endDate,
            remaining: slot.remaining,
            isClosed:slot.isClosed,
            providerSlotId:slot.providerSlotId,
            variantId:slot.variantId,
            paxAvailability: slot.paxAvailability.map((pax) => ({
              isPrimary:pax.isPrimary,
              max: pax.max,
              min: pax.min,
              type: pax.type,     
            }))
        }
 
    })
    
    for(const slot of slots){
        for(const pax of slot.paxAvailability){
            const {type,name,description} = pax
            result.paxContent[name] = {name,description,type}
        }
    }
    
    

    res.json(result)
}




