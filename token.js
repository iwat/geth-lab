lab.token = {
  load: function(name, addr) {
    lab.contract.load("erc20", addr)
    this[name] = lab.contract["erc20"]
    delete lab.contract["erc20"]
  }
}
