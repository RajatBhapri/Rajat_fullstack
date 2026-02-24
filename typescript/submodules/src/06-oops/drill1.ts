class counter {
  #value : number;

  constructor(initial=0){
    this.#value = initial; 
  }

  inc() : this{
    this.#value++
    return this
  }

  dec() : this{
    this.#value--
    return this
  }

  value() :number {
    return this.#value
  }

}