/**
 * 
 * @param {string} txt - the input text to be sliced 
 * @param {number} [max = 150] - the maximum length before transaction
 * @returns The sliced text , with an ellipsis (...) appended if truncated.
 */ 


export function txtSlicer(txt: string, max: number = 150){
    if(txt.length >= max) return `${txt.slice(0,max)} ...`;
    return txt;
}


export const getTodayDateString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };