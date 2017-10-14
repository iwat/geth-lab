lab.contract = {
  abis: {},

  load: function(name, addr) {
    loadScript("contracts/" + name + ".js") // define lab.contract.abis["etherdelta"]
    this[name] = web3.eth.contract(this.abis[name]).at(addr)
    delete this.abis[name]
  }
}
