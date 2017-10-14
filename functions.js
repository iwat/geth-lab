this.lab.myBalances = function() {
  for (var name in this.accounts) {
    balance = eth.getBalance(this.accounts[name])
    console.log(name + " has " + web3.fromWei(balance) + " ETH")
  }
}
