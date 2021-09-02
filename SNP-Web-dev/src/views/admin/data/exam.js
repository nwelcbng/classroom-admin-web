export function examInfoFilter(data) {
    return data.latest_posts.filter(item => {
        return item.name === "电协机器人" && item.cooked.indexOf('@@@') != -1
    }).map(item => {
        console.log(item)
        let data = item.cooked.substring(3, item.cooked.length - 4);
        let items = data.substring(0, data.indexOf('@@@')).split('&amp;');
        return {
            id: item.topic_id,
            message: data.substring(data.indexOf('@@@') + 3),
            host: items[0],
            name: items[1],
            value: parseInt(items[2]),
            time:item.created_at
        }
        
    })
}



// export function FilterItem(data) {
//     const items = data.value.substring(0, data.value.indexOf('@@@')).split('&amp;');
//     data.message = data.value.substring(data.value.indexOf('@@@') + 3);
//     data.host = items[0];
//     data.name = items[1];
//     data.value = items[2];
// }

function deleteItem() {

}