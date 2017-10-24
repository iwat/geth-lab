lab = {}

loadScript("accounts.js")
loadScript("boot.local.js")
loadScript("contract.js")
loadScript("functions.js")
loadScript("ico.js")
loadScript("polyfill.js")
loadScript("token.js")

lab.contract.load("etherdelta", "0x8d12a197cb00d4747a1fe03395095ce2a5cc6819")

lab.token.load("omg", "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07")
lab.token.load("req", "0x8f8221afbb33998d8584a2b05749ba73c37a938a")
lab.token.load("zrx", "0xe41d2489571d322189246dafa5ebde1f4699f498")
lab.token.load("wan", "0x5fc6de61258e63706543bb57619b99cc0e5a5a1f")
lab.token.load("knc", "0xdd974D5C2e2928deA5F71b9825b8b646686BD200")
lab.token.load("eth", "0x2956356cD2a2bf3202F771F50D3D14A367b48070")
lab.token.load("mod", "0x957c30aB0426e0C93CD8241E2c60392d08c6aC8e")
