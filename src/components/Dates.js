
export function getminDate(){
    const today = new Date();
    const dzien = today.getDate().toString().padStart(2, '0');
    const miesiac = (today.getMonth() + 1).toString().padStart(2, '0'); 
    const rok = today.getFullYear();
    const todayDate = `${rok}-${miesiac}-${dzien}`;
    return todayDate;
}

export function getmaxDate(){
    const today = new Date();
    const rok = today.getFullYear() + 1;
    const todayDate = `${rok}-01-01`;
    return todayDate;
}
