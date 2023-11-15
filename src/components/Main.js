import './../App.css'
import { getmaxDate, getminDate} from './Dates';
import { useState, useMemo} from 'react';
import cars from './../cars.json';

import { baseAmount, countDaysOfLength, countYearsOfLicense, fuelPrice, carAmount} from './CountPrices';

function Main(){

    

    const [idofchoosencar, setIdofchoosencar] = useState(useMemo(() => {
        return 0;
      }, []));

    const [obj,setObj] = useState({
        kmLength:0,
        licenceYear:0,
        dateOfStart:'',
        dateOfEnd:'',
        cityofLiving:'',
        email:''
    });    


    function counteverything() {
        let days = countDaysOfLength(obj.dateOfStart, obj.dateOfEnd);
        let yearsoflicense = countYearsOfLicense(obj.licenceYear);
        let fuelMoney = fuelPrice(obj.kmLength,cars[idofchoosencar].avgfuelcons,obj.cityofLiving);
        
        let amount = baseAmount(days,cars[idofchoosencar].baseamount,cars[idofchoosencar].category,yearsoflicense,cars[idofchoosencar].amountofmodel);
        amount = amount + fuelMoney;

        if(isNaN(days) || yearsoflicense>50 || fuelMoney ===0){
            return "-"
        }else{
            return Math.round(amount);
        }
      }

      function counteverythingwithtax(){
        let pricewithtax = counteverything() * 1.23;
        if(isNaN(pricewithtax)){
            return "-"
        }else{
            return Math.round(pricewithtax);
        }
      }

    function moneyForFuel(){
        let fuelMoney = fuelPrice(obj.kmLength,cars[idofchoosencar].avgfuelcons,obj.cityofLiving);
        if(fuelMoney ===0){
            return "-"
        } else{
            return Math.round(fuelMoney);
        }
    }
    function moneyForCar(){
        let moneyforcarrrr = carAmount(cars[idofchoosencar].baseamount,countDaysOfLength(obj.dateOfStart, obj.dateOfEnd));
        return moneyforcarrrr;
    }
      

    return(
      
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>CarRental</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <h6>Planujesz wynająć samochód, ale chcesz mieć pełny obraz kosztów związanych z Twoją podróżą? <br/> Nasz Kalkulator Wydatków na Wynajem Samochodu jest tutaj, aby Ci pomóc!<br/> Prosty w użyciu, umożliwia szybkie oszacowanie kosztów.</h6>
                </div>
            </div>
            <div className='row' id='row-inputs'>
                <div className='col'>
                    <ul>
                        <li>
                            <form>
                            </form>
                            <div className="group">      
                                <input id='1' name='kmLength' type='number' required min={0} onChange={e => setObj({...obj ,kmLength:e.target.value})} 
                                />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                <label htmlFor='1'>Ilość km</label>
                            </div>
                        </li>
                        <li>
                            <div className="group">      
                                    <input id='2' name='licenseYear' type='number'  required onChange={e => setObj({...obj ,licenceYear:e.target.value})}/>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                <label htmlFor='2'>Rok Prawajazdy</label>
                            </div>
                        </li>
                        <li>
                            <div className="group" >
                                <select
                                id="selectCity"
                                className="custom-select"
                                required
                                onChange={e => setObj({...obj ,cityofLiving:e.target.value})}
                                >
                                    <option value={""}></option>
                                    <option value="Rzeszów">Rzeszów</option>
                                    <option value="Warszawa">Warszawa</option>
                                    <option value="Kraków">Kraków</option>
                                    <option value="Lublin">Lublin</option>
                                    <option value="Szczecin">Szczecin</option>
                                </select>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label htmlFor="selectCity">Skąd jestes??</label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='col'>
                    <ul>
                        <li>
                            <div className="group">      
                                    <input id='4' name='rentDate' type='date' min={getminDate()} max={getmaxDate()}  onChange={e => setObj({...obj ,dateOfStart:e.target.value})} />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                <label htmlFor='4'>Data wynajmu</label>
                            </div>
                        </li>
                        <li>
                            <div className={`group${!obj.dateOfStart ? ' disabled' : ''}`}>      
                                    <input id='5' name='rentDateEnd' type='date' min={obj.dateOfStart} max={getmaxDate()}  onChange={e => setObj({...obj ,dateOfEnd:e.target.value})}  disabled={!obj.dateOfStart}/>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label htmlFor='5'>Data konca wynajmu</label>
                            </div>
                        </li>
                        <li>
                            <div className="group">      
                                    <input id='6' name='licenseYear' type='email'  required onChange={e => setObj({...obj ,cityofLiving:e.target.value})}/>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                <label htmlFor='6'>Email</label>
                            </div> 
                        </li>
                    </ul>
                </div>
            </div>

            <hr></hr>
            <div className='row' id='row-cars'>
                <div className='col'>
                    <div className="group" id='select-group'>
                        <select
                        id="carSelect"
                        className="custom-select"
                        onChange={(e) => setIdofchoosencar(parseInt(e.target.value))}
                        >
                            {cars.map((przedmiot, index) => (
                                <option key={index} value={index}>
                                    {przedmiot.name} {przedmiot.yearofproduction}
                                </option>
                            ))}
                        </select>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="carSelect">Wybierz Samochód</label>
                    </div>
                </div>
                 <div className='col'>
                    <div className='img-container'>
                        {cars.map((cars, index) => (
                                <img src={cars.srcc} key={index} alt={cars.name} style={{ display: index === idofchoosencar ? 'block' : 'none' }}></img>
                        ))}
                        <br/>
                    </div>
                </div>
                <div className='col'>
                        {cars.map((veh, index) => (
                            <li key={index}>
                                <p  style={{ display: index === idofchoosencar ? 'block' : 'none' }}>{cars[idofchoosencar].name} {cars[idofchoosencar].yearofproduction}</p>
                                <p  style={{ display: index === idofchoosencar ? 'block' : 'none' }}>{cars[idofchoosencar].category}</p>
                                <p  style={{ display: index === idofchoosencar ? 'block' : 'none' }}>Cena za dzień:   {cars[idofchoosencar].baseamount}zł</p>
                                <p  style={{ display: index === idofchoosencar ? 'block' : 'none' }}>{cars[idofchoosencar].localization}</p>
                                
                            </li>
                        ))}    
                </div>
            </div>

            <div className='row' id='row-kwoty'>
                <div className='col' id='col-prices'>
                    <ul>
                        <li><h5>Kwota Netto</h5></li>
                        <li><h5 id='price-show'>{counteverything()}</h5></li>
                    </ul>
                </div>
                <div className='col' id='col-prices'>
                    <ul>
                        <li><h5>Samochód</h5></li>
                        <li><h5 id='price-show'>{moneyForCar()}</h5></li>
                    </ul> 
                </div>
                <div className='col' id='col-prices'>
                    <ul>
                        <li><h5>Paliwo</h5></li>
                        <li><h5 id='price-show'>{moneyForFuel()}</h5></li>
                    </ul>
                </div>
                <div className='col' id='col-prices'>
                    <ul>
                        <li><h5>Kwota Brutto</h5></li>
                        <li><h5 id='price-show'>{counteverythingwithtax()}</h5></li>
                    </ul>
                </div>
                
            </div>
            
        </div>
        
    );
}

export default Main