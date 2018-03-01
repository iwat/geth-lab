this.lab.myBalances = function() {
  for (var name in this.accounts) {
    this.dumpBalances(this.accounts[name], name)
  }
}

this.lab.dumpBalances = function(account, name) {
  var tokens = {}
  tokens.check = function() {
    for (var token in lab.token) {
      if (typeof lab.token[token] == "function") { continue }
      if (this[token] == undefined) { return }
      if (this["ed_" + token] == undefined) { return }
      if (this.ether == undefined) { return }
      if (this.ed_ether == undefined) { return }
    }

    var line = ""
    if (typeof(name) != "undefined") {
      line = name.padEnd(10) + " has "
    }
    console.log(line + web3.fromWei(this.ether).toFixed(18) + " "
      + "+ " + web3.fromWei(this.ed_ether).toFixed(18) + " "
      + "ETH"
    )

    for (var token in lab.token) {
      if (typeof lab.token[token] == "function") { continue }
      line = ""
      if (typeof(name) != "undefined") {
        line = "           has "
      }
      console.log(line + web3.fromWei(this[token]).toFixed(18) + " "
        + "+ " + web3.fromWei(this["ed_" + token]).toFixed(18) + " "
        + lab.token[token].symbol()
      )
    }
  }

  eth.getBalance(account, function(error, balance) {
    tokens["ether"] = balance
    tokens.check()
  })

  lab.contract.etherdelta.balanceOf("0", account, function(error, balance) {
    tokens["ed_ether"] = balance
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

this.lab.signTransaction = function(params) {
  var tx = eth.signTransaction(params)
  inspect(tx)
  this.etherScanLink(tx)
}

this.lab.transferAll = function(from, to, more) {
  var balance = 0
  if (more != undefined && more.balance != undefined) {
    balance = more.balance
  } else {
    balance = eth.getBalance(from)
  }
  var gasPrice = web3.toWei(4, "gwei")
  var gasLimit = 21000

  params = {
    from:     from,
    to:       to,
    value:    balance - gasPrice*gasLimit,
    gas:      gasLimit,
    gasPrice: gasPrice,
  }
  if (more != undefined) {
    params = Object.assign(params, more)
  }
  this.signTransaction(params)
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
