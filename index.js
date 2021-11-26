const findoraSdk = require("@findora-network/findora-sdk.js");

const sdkEnv = {
  hostUrl: "https://prod-forge.prod.findora.org",
  cachePath: "./cache",
};

const { default: SdkInstance } = findoraSdk.Sdk;

const {
  Keypair: KeypairApi,
  Asset: AssetApi,
  Account: AccountApi,
  Transaction: TransactionApi,
} = findoraSdk.Api;

SdkInstance.init(sdkEnv);

const mnemonicString = "";

const password = "123";

const privateKey = "";

const yourMnenomic = mnemonicString.split(" ");

const getFraAssetCode = async () => {
  const assetCode = await AssetApi.getFraAssetCode();

  console.log("FRA assetCode is", assetCode);
};

const createKeypair = async () => {
  const mnemonic = await KeypairApi.getMnemonic(24);
  console.log(
    `🚀 ~ file: index.js ~ line 22 ~ createKeypair ~ "${mnemonic.join(" ")}" `
  );

  const walletInfo = await KeypairApi.restoreFromMnemonic(mnemonic, password);

  console.log(
    "🚀 ~ file: index.js ~ line 31 ~ createKeypair ~ walletInfo",
    walletInfo
  );

  // const faucetWalletInfo = await KeypairApi.restoreFromPrivateKey(
  //   walletInfo.privateStr,
  //   password
  // );

  // console.log(
  //   "🚀 ~ file: index.js ~ line 35 ~ createKeypair ~ faucetWalletInfo",
  //   faucetWalletInfo
  // );
};

const send = async () => {
  const amountToSend = "1";

  const receiverAddress =
    "fra1zkftrsp0sl247fplgr3nvqampp92jlurkn3l8gqqa59k2wft8cdq3wvaul";

  const walletInfo = await KeypairApi.restoreFromMnemonic(
    yourMnenomic,
    password
  );

  const assetCode = await AssetApi.getFraAssetCode();

  const transactionBuilder = await TransactionApi.sendToAddress(
    walletInfo,
    receiverAddress,
    amountToSend,
    assetCode
  );

  const resultHandle = await TransactionApi.submitTransaction(
    transactionBuilder
  );

  console.log(
    "🚀 ~ file: index.js ~ line 76 ~ send ~ resultHandle",
    resultHandle
  );
};

const sendToMany = async () => {
  const amountToSendOne = "0.5";

  const receiverAddressOne = "";

  const amountToSendTwo = "1.1";

  const receiverAddressTwo = "";

  const toWalletInfoOne = await KeypairApi.getAddressPublicAndKey(
    receiverAddressOne
  );

  const toWalletInfoTwo = await KeypairApi.getAddressPublicAndKey(
    receiverAddressTwo
  );

  const walletInfo = await KeypairApi.restoreFromMnemonic(
    yourMnenomic,
    password
  );

  const assetCode = await AssetApi.getFraAssetCode();

  const recieversInfo = [
    { reciverWalletInfo: toWalletInfoOne, amount: amountToSendOne },
    { reciverWalletInfo: toWalletInfoTwo, amount: amountToSendTwo },
  ];

  const transactionBuilder = await TransactionApi.sendToMany(
    walletInfo,
    recieversInfo,
    assetCode
  );

  const resultHandle = await TransactionApi.submitTransaction(
    transactionBuilder
  );

  console.log("send to multiple receipients result handle", resultHandle);
};

const getFraBalanceOne = async () => {
  const newWallet = await KeypairApi.restoreFromMnemonic(
    yourMnenomic,
    password
  );

  const balance = await AccountApi.getBalance(newWallet);

  console.log("balance from the wallet restored using mnemonic is", balance);

  console.log("\n");
};

const getFraBalanceTwo = async () => {
  const newWalletFromPrivateKey = await KeypairApi.restoreFromPrivateKey(
    privateKey,
    password
  );

  const balanceAlso = await AccountApi.getBalance(newWalletFromPrivateKey);

  console.log(
    "balance from the wallet restored using private  is",
    balanceAlso
  );

  console.log("\n");
};

// createKeypair();
getFraBalanceTwo();
// sendToMany();
