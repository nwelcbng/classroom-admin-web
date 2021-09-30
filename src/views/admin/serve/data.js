export function convertDate(data) {
    data.forEach(item => {
        let date = new Date(item.date);
        item.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    })
}
export function deleteItem(data, key, value) {
    //删除数组中的key值为value的项
    let result = [];
    data.forEach(item => {
        if (item && item[key] && item[key] == value) {
            
        } else {
            result.push(item)
        }
    })
    return result;
}
