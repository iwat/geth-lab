this.lab.myBalances = function() {
  for (var name in this.accounts) {
    var account = this.accounts[name]
    var balance = eth.getBalance(account)
    console.log(name.padEnd(10) + " has " + web3.fromWei(balance) + " ETH")

    for (var token in lab.token) {
      if (token == "load") {
        continue
      }
      var balance = lab.token[token].balanceOf(account)
      if (balance == 0) {
        continue
      }
      console.log("           has " + web3.fromWei(balance) + " " + lab.token[token].symbol())
    }
  }
}
