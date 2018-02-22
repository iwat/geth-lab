this.ico = {}
this.ico.contract = "0x01bbec6573ed7EcA0f307a10d2B4CEB669816B4a"
this.ico.gasLimit = 200000
this.ico.senders = {
  wat_trezor: { value: 1, nonce: 11 },
}
this.ico.gasPrice = 50
this.ico.signed = {}

this.ico.unlock = function() {
  for (var name in this.senders) {
    var sender = lab.accounts[name]
    console.info("Unlock account " + name)
    personal.unlockAccount(sender, null, 3600)
    console.log(web3.fromWei(eth.getBalance(sender)) + " ETH")
  }
}

this.ico.sign = function() {
  for (var name in this.senders) {
    this.signOne(name, lab.accounts[name], this.senders[name].value, this.senders[name].nonce)
  }

  for (var name in this.senders) {
    console.log(name + ":")
    console.log("  to:       " + this.signed[name].tx.to)
    console.log("  gasLimit: " + parseInt(this.signed[name].tx.gas))
    console.log("  gasPrice: " + web3.fromWei(this.signed[name].tx.gasPrice, "gwei") + " gwei")
    console.log("  value:    " + web3.fromWei(this.signed[name].tx.value) + " ETH")
    console.log("  nonce:    " + this.signed[name].tx.nonce)
  }

  for (var name in this.senders) {
    console.log("https://api.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=" + this.signed[name].raw + "&apikey=" + etherscan.apikey)
  }
}

this.ico.signOne = function(name, from, value, nonce) {
  var params = {
    from:     from,
    to:       this.contract,
    value:    web3.toWei(value),
    gas:      this.gasLimit,
    gasPrice: web3.toWei(this.gasPrice, "gwei")
  }
  if (nonce >= 0) {
    params.nonce = nonce
  }
  this.signed[name] = eth.signTransaction(params)
}

this.ico.send = function() {
  for (var name in this.signed) {
    var tx = this.signed[name]
    console.log("Sending for " + name + " " + tx.tx.hash)
    //eth.sendRawTransaction(tx.raw, function(result) { inspect(result) })
  }
}
