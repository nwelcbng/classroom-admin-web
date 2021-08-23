var counter=0;
function test(str){
    console.log("!!"+str);
}
function plus() {
    counter=counter+1;
}
function out(){
    console.log(`counter=${counter}`);
}
module.exports={
    test:test,
    plus:plus,
    out:out
};