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

this.lab.watchBlock = function() {
  var filter = web3.eth.filter("latest")

  filter.watch(function(error, result) {
    var block = web3.eth.getBlock(result)
    console.log("Block #" + block.number + " at " + (new Date(block.timestamp * 1000)) + " gas " + block.gasUsed + " price " + web3.fromWei(eth.gasPrice, "gwei") + " gwei")
  })
}

this.lab.transfer = function(params) {
  tx = eth.signTransaction(params)
  inspect(tx)
  this.etherScanLink(tx)
  //eth.sendRawTransaction(tx.raw)
}

this.lab.transferAll = function(from, to) {
  var balance = eth.getBalance(from)
  var gasPrice = web3.toWei(4, "gwei")
  var gasLimit = 21000

  this.transfer({
    from:     from,
    to:       to,
    value:    balance - gasPrice*gasLimit,
    gas:      gasLimit,
    gasPrice: gasPrice,
  })
}

this.lab.etherScanLink = function(tx) {
  var base = "https://api.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex="
  console.log(base + tx.raw + "&apikey=" + etherscan.apikey)
}

this.lab.relatedTransactions = function(account, endBlockNumber, numBlocks) {
  account = account.toLowerCase()
  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
  }

  if (numBlocks == null) {
    numBlocks = 100
  }

  var startBlockNumber = endBlockNumber - numBlocks;

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    var block = eth.getBlock(i, true);
    if (block == null || block.transactions == null) {
      continue
    }

    block.transactions.forEach(function(e) {
      if (account == "*" || account == e.from || account == e.to) {
        inspect(e)
      }
    })
  }
}
