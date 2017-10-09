function loadContract(name, addr) {
  loadScript("contracts/" + name + ".js") // define this["etherdelta_abi"]
  this[name] = web3.eth.contract(this[name+"_abi"]).at(addr)
  delete this[name+"_abi"]
}

loadContract("etherdelta", "0x8d12a197cb00d4747a1fe03395095ce2a5cc6819")
