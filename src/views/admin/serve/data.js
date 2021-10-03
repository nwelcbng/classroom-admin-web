export function convertDate(data) {
    data.forEach(item => {
        let date = new Date(item.date);
        item.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    })
}
export function convertDateItem(date) {
    let date1 = new Date(date);
    return date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
}
export function deleteItem(data, key, value) {
    //删除数组中的key值为value的项
    let result = [];
    if (data === null || data === undefined || data.length === 0) {
        return;
    }
    data.forEach(item => {
        if (item && item[key] && item[key] == value) {

        } else {
            result.push(item)
        }
    })
    return result;
}
