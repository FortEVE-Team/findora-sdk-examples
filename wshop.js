const findoraSdk = require("@findora-network/findora-sdk.js");

const sdkEnv = {
  hostUrl: "https://prod-forge.prod.findora.org",
};

const { default: SdkInstance } = findoraSdk.Sdk;

const {
  Keypair: KeypairApi,
  Asset: AssetApi,
  Account: AccountApi,
  Transaction: TransactionApi,
} = findoraSdk.Api;

SdkInstance.init(sdkEnv);

const password = "123";

const mnemonicString = "";

const mnemonicStringTwo = "";

const mnemonicStringThree = "";

const yourMnenomic = mnemonicString.split(" ");

const privateKey = "";

const getFraAssetCode = async () => {
  const assetCode = await AssetApi.getFraAssetCode();

  console.log("FRA assetCode is", assetCode);
};

const createKeypair = async () => {
  const mnemonic = await KeypairApi.getMnemonic(24);
  console.log(
    "🚀 ~ file: index.js ~ line 29 ~ createKeypair ~ mnemonic",
    mnemonic.join(" ")
  );
  const walletInfo = await KeypairApi.restoreFromMnemonic(mnemonic, password);
  console.log("🚀 ~ file: index.js ~ line 28 ~ walletInfo", walletInfo);
};

const getFraBalance = async () => {
  const newWallet = await KeypairApi.restoreFromMnemonic(
    yourMnenomic,
    password
  );

  const balance = await AccountApi.getBalance(newWallet);

  console.log(
    "🚀 ~ file: index.js ~ line 46 ~ getFraBalance ~ balance (from mnemonic)",
    balance
  );
};

const send = async () => {
  const walletInfo = await KeypairApi.restoreFromMnemonic(
    yourMnenomic,
    password
  );
  const receiverAddress = "";

  const amountToSend = "0.25";

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
    "🚀 ~ file: index.js ~ line 95 ~ send ~ resultHandle",
    resultHandle
  );
};

const sendToMany = async () => {
  const walletInfo = await KeypairApi.restoreFromMnemonic(
    yourMnenomic,
    password
  );

  const assetCode = await AssetApi.getFraAssetCode();

  const amountToSendOne = "0.5";
  const amountToSendTwo = "1.1";

  const receiverAddressOne = "";
  const receiverAddressTwo = "";

  const toWalletInfoOne = await KeypairApi.getAddressPublicAndKey(
    receiverAddressOne
  );

  const toWalletInfoTwo = await KeypairApi.getAddressPublicAndKey(
    receiverAddressTwo
  );

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

  console.log(
    "🚀 ~ file: index.js ~ line 95 ~ send ~ resultHandle",
    resultHandle
  );
};

// getFraAssetCode();
// createKeypair();
// getFraBalance();
// send();
// sendToMany();
