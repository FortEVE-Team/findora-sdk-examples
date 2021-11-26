const axios = require("axios");
const BigNumber = require("bignumber.js");

const data = JSON.stringify({
  jsonrpc: "2.0",
  method: "eth_getBalance",
  params: ["0xff6246f1011C1F7aD15877fb1232BEda1536b3bC", "latest"],
  id: 1,
});

const config = {
  method: "post",
  url: "http://localhost:8545",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};

const calDecimalPrecision = (val, num) => {
  const x = new BigNumber(val);
  const y = new BigNumber(10 ** num);
  const newAmount = x.dividedBy(y).toFormat();
  return newAmount;
};

axios(config)
  .then(function (response) {
    console.log(response.data);

    const { result } = response.data;

    const yourNumber = parseInt(result, 16);

    console.log(
      "balance 2 is ",
      calDecimalPrecision(yourNumber, 18).toString()
    );
  })
  .catch(function (error) {
    console.log("error!", error);
  });
