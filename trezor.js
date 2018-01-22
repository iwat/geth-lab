this.trezor = {}
this.trezor.open = function() {
  var w = null
  var ws = personal.listWallets
  for (var i = 0; i < ws.length; i++) {
    if (ws[i].url.startsWith("trezor:")) {
      w = ws[i]
      break
    }
  }
  if (w == null) {
    throw "No TREZOR found"
  }
  this.selected = w
  personal.openWallet(w.url)
  return w
}
this.trezor.derive = function(i) {
  return personal.deriveAccount(this.selected.url, "m/44'/60'/0'/0/" + i, true)
}
