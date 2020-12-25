import "core-js/stable"
import "regenerator-runtime/runtime"
function promiseFunc(){
  //  es6 promise类型
  return Promise.resolve(1)
}

const lambdaFunc =async  ()=>{
  //  es6语法
  const a = '我是箭头函数'
  console.log(a)

  const arr = [1,2,3,4]
  for (const item of arr) {
    console.log(item)
  }

  //  ES2017 await
  await promiseFunc()

  //  es6-API
  arr.map(s=>console.log(s))
  console.log(arr.includes(1))
  console.log(arr.filter(s=>true))
}

lambdaFunc().then()



