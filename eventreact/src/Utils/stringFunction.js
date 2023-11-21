/**
 * Função que inverte a data no banco de dados
 * @param {*} data 
 * @returns 
 */


export const dateFormatDbToView = (data) => {
    data = data.substr(0, 9); // retorna apenas a data {2023-09-30}
    data = data.split("-"); // retorna um array {2023, 09, 30}
    return `${data} / ${data[1]}/${data[0]}`; 
}

