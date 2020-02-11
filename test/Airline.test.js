
const Airline = artifacts.require('Airline');

let instance;

beforeEach(async () => {
   instance  = await Airline.new()
});

contract('Airline', accounts => {
    
    it('Should have available flights', async() => {
        let total = await instance.totalflights(); 
        assert(total >0);
    });

    it('Should allow customer to buy a flight providing its value', async() => {
         let flight = await instance.flights(0);
         let flightName = flight[0],price = flight[1];
         await instance.buyFlight(0, {from: accounts[0], value: price});
         let customerFlight = await instance.customerFlights(accounts[0], 0);
         let customerTotalFlight = await instance.customerTotalFlights(accounts[0]);
         assert(customerFlight[0], flightName);
         assert(customerFlight[1], price);
         assert(customerFlight, 1);
    });

    it('no tienes varo para comprar cursos wey', async ()=>{
         let flight = await instance.flights(0);
         let price = flight[1] -5000;
         try{
             await instance.buyFlight(0, {from: accounts[0], value: price});
         }
         catch(e){return;}
         assert.fail();
    });
    it('nc ve en el tutorial pero ta bien ', async()=> {
        let flight = await instance.flights(0);
        let price = flight[1];

        let flight2 = await instance.flights(1);
        let price2 = flight2[1];

        await instance.buyFlight(0, {from: accounts[0], value: price});
        await instance.buyFlight(1, {from: accounts[0], value: price2});

        let newAirlineBalance = await instance.getAirlineBalance();

        assert.equal(newAirlineBalance.toNumber(), price.toNumber()+ price2.toNumber());
    });

    it('should allow customer to redem loyaty poins pa los puntos' , async() => {
         let flight = await instance.flights(1);
         let price = flight[1];
          await instance.buyFlight(1, {from: accounts[0], value: price});
          let balance = await web3.eth.getBalance(accounts[0]);
          await instance.redeenLoyaltPoints({from: accounts[0]});
          let finalBalance = await web3.eth.getBalance(accounts[0]);
          let customer = await instance.customer(accounts[0]);
          let loyaltyPoints = customer[0];
          assert(loyaltyPoints, 0);
          assert(finalBalance > balance);
    });
});