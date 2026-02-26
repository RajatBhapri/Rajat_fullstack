function timeout<T>(p: Promise<T>, ms: number): Promise<T>{
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(()=>{
      reject("time exceeded")
    },ms)

    p.then((value) =>{
      clearTimeout(timer)
      resolve(value)
      console.log("just checking");
  },
    (error)=>{
      clearTimeout(timer)
      reject("promice failed")
    }
  )


  })
}


function slow(){
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(34)
    },5000)
  })
}

timeout(slow(),7000)