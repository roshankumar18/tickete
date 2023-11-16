const { default: axios } = require("axios");
const Inventory = require('../assign/src/database/model/Inventory');
require('dotenv').config()
async function seeder() {

    try {
      
      await fetchAndStoreInventory(14, [1, 2, 3]);
      await fetchAndStoreInventory(15, [0]);
      
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }

  async function fetchAndStoreInventory(productId, weekdays) {

    const currentDate = new Date();
    const id  =productId
    const nextTwoMonthsDates = calculateNextTwoMonthsDates(currentDate, weekdays);
    
    for (const date of nextTwoMonthsDates) {

      
      const formattedDate = formatDate(date);
      try{
      const response = await axios.get(`https://leap-api.tickete.co/api/v1/inventory/${id}?date=${formattedDate}`,{headers:{
        "x-api-key":process.env.API_KEY
        }
      });

      if (response.status===429) {
        
        console.error('Rate limit exceeded. Waiting for reset time...');
        await new Promise(resolve => setTimeout(resolve, response.data.rateLimitState.reset - Date.now()));
        
        continue;
    }
  
     for(const data of response.data) { 
      const {  startDate,startTime,
        endTime,
        providerSlotId,
        remaining,
        currencyCode,
        variantId,
        paxAvailability } = data;
        
        
      await Inventory.create({
        productId:id,
        startDate,
        startTime,
        endTime,
        providerSlotId,
        remaining,
        currencyCode,
        variantId,
        paxAvailability
      });}
    }catch(err){
      if(err.response.status===429){
        
        console.error('Rate limit exceeded. Waiting for reset time...');
        await new Promise(resolve => setTimeout(resolve, err.response.data.rateLimitState.reset - Date.now()));
       
       
        continue;
      }else{
        console.log(err)
      }
    }
    }
  }
  
  function calculateNextTwoMonthsDates(startDate, weekdays) {
    
    const nextTwoMonthsDates = [];
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 2);
    
    while (startDate < endDate) {
      if (weekdays.includes(startDate.getDay())) {
        nextTwoMonthsDates.push(new Date(startDate));
      }
      startDate.setDate(startDate.getDate() + 1);
    }
  
    return nextTwoMonthsDates;
  }
  
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  seeder().then(()=>{

    console.error('sucessfully seeded');
  }).catch((err)=>{
    console.log(err)
  })