function loadContract(name, addr) {
  loadScript("contracts/" + name + ".js") // define this.lab.contracts["etherdelta_abi"]
  this.lab.contracts[name] = web3.eth.contract(this.lab.contracts[name+"_abi"]).at(addr)
  delete this.lab.contracts[name+"_abi"]
}

this.lab = {
  accounts: {},
  contracts: {},
}

loadScript("accounts.js")
loadContract("etherdelta", "0x8d12a197cb00d4747a1fe03395095ce2a5cc6819")
