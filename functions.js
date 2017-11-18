this.lab.myBalances = function() {
  for (var name in this.accounts) {
    this.dumpBalances(name, this.accounts[name])
  }
}

this.lab.dumpBalances = function(name, account) {
  var tokens = {}
  tokens.check = function() {
    for (var token in lab.token) {
      if (typeof lab.token[token] == "function") { continue }
      if (this[token] == undefined) { return }
      if (this["ed_" + token] == undefined) { return }
      if (this.ether == undefined) { return }
    }

    console.log(name.padEnd(10) + " has " + web3.fromWei(tokens.ether) + " ETH")
    for (var token in lab.token) {
      if (typeof lab.token[token] == "function") { continue }
      console.log("           has "
        + web3.fromWei(this[token]) + " "
        + "+ " + web3.fromWei(this["ed_" + token]) + " "
        + lab.token[token].symbol()
      )
    }
  }

  eth.getBalance(account, function(error, balance) {
    tokens["ether"] = balance
    tokens.check()
  })

  for (var token in lab.token) {
    if (typeof lab.token[token] == "function") { continue }
    lab.token[token].balanceOf(account, function(error, balance) {
      tokens[token] = balance
      tokens.check()
    })

    lab.contract.etherdelta.balanceOf(lab.token[token].address, account, function(error, balance) {
      tokens["ed_" + token] = balance
      tokens.check()
    })
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
