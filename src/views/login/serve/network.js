

export function fomatNetwork(foo,...argues){
    if(typeof foo != 'function'){
        throw new Error('请传入一个函数');
    }
    return new Promise(() => {
        foo(...argues).then(res => {
            if(res.code === 1){
                resolve(res)
            }else{
                this.$message(res.msg);
            }
        }).catch(err => {
            this.$message('网络错误');
        })
    })

}