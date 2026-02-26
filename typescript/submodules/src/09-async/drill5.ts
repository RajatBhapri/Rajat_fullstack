function sleep(ms: number){
  return new Promise((resolve, reject) =>{
    setTimeout(()=>{
      resolve
    },ms)
  })
}

function retry<T>(op: () => Promise<T>, attempts = 2, backoffMs = 250){
  
}