class drill2 {
  public pub = "public";
  private pri = "private";
  protected pro = "protected";
  #secret = "truly private";

  public showSecret() {
    return this.#secret;
  }
}


const demo = new drill2();

console.log(demo.pub);
console.log(demo.pri);
console.log(demo.pro);
console.log(demo.#secret);    // #private gets executes even in runtime others gets execute in compile time only