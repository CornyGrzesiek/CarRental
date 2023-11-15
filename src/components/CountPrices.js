


export function baseAmount(daysOfLend, baseAmount, category, yearsOfLicense, amountofmodel){
    let price = daysOfLend * baseAmount;

    switch (category) {
        case "Basic":
          price = price * 1;
          break;
        case "Standard":
          price = price * 1.3;
          break;
        case "Medium":
          price = price * 1.6;
          break;
        case "Premium":
          price = price * 2;
          break;
        default:
            return price;
      };

    if(yearsOfLicense < 5){
        price = price * 1.2;
    } else if(amountofmodel < 3){
        price = price * 1.15;
    }

    return price;

}

export function countDaysOfLength(dayofStart, dayOfEnd){
    const firstdate = new Date(dayofStart)
    const seconddate = new Date(dayOfEnd)

    const timeDifference = Math.abs(seconddate.getTime() - firstdate.getTime());
    const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

        return differenceInDays+1;
    

}

export function countYearsOfLicense(inputYear){
    const today = new Date();
    const rok = today.getFullYear();
    let thisYear = rok;

    if(thisYear === inputYear){
        return 1;
    } else{
       return thisYear - inputYear;
    }
}

export function fuelPrice(distance,avgfuelcons,cityofLiving){
    const fuelPricePerL = 6.5;
    let price = 0

    if(distance >=0){
        switch(cityofLiving){
            case"Rzeszów":
                price = fuelPricePerL * (distance/100)*avgfuelcons;
                break;
            case"Warszawa":
                price = fuelPricePerL * (distance/100)*avgfuelcons + fuelPricePerL * 5 * avgfuelcons;
                break;
            case"Kraków":
                price = fuelPricePerL * (distance/100)*avgfuelcons + fuelPricePerL * 2 * avgfuelcons;
                break;
            case"Lublin":
                price = fuelPricePerL * (distance/100)*avgfuelcons + fuelPricePerL * 1.5 * avgfuelcons;
                break;
            case"Szczecin":
                price = fuelPricePerL * (distance/100)*avgfuelcons + fuelPricePerL * 7 * avgfuelcons;
                break;
                default:
                return price;
        }
        return price;
    }else{
        return "-";
    }
}

export function carAmount(baseAmount,lengthofdays){
    if(baseAmount < 0 || isNaN(lengthofdays)){
        return '-'
    }else{
        return Math.round(baseAmount * lengthofdays);
    }
}

