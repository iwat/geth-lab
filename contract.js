lab.contract = {
  abis: {},

  load: function(name, addr) {
    loadScript("contracts/" + name + ".js") // define lab.contract.abis["etherdelta"]
    this[name] = web3.eth.contract(this.abis[name]).at(addr)
    delete this.abis[name]

    for (f in this[name]) {
      if (typeof this[name][f] == "function") {
        this[name][f].signTransaction = function() {
          var params = arguments[arguments.length-1]
          params.data = this.getData.apply(null, Array.prototype.slice.call(arguments, 0, arguments.length))
          if (params.nonce == null) {
            params.nonce = eth.getTransactionCount(params.from)
          }
          var tx = eth.signTransaction(params)
          inspect(tx)
          lab.etherScanLink(tx)
        }
      }
    }
  }
}
