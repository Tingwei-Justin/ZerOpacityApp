import albedo from "@albedo-link/intent";

const StellarSdk = require("stellar-sdk");
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const HOST = "https://horizon-testnet.stellar.org";

export async function getPubicKey() {
  console.log("getPubicKey");
  return albedo
    .publicKey()
    .then((res) => {
      console.log(res);
      return res.pubkey;
    })
    .catch((e) => {
      console.error(e);
      return e;
    }); // handle errors or user's rejection
}

export async function getAccountBalance(pubkey) {
  return server
    .loadAccount(pubkey)
    .then(function (res) {
      // console.log(res.balances);
      return res.balances;
    })
    .catch(function (err) {
      console.error(err);
      return err;
    });
}

export async function getAllPayments(pubkey) {
  return server
    .payments()
    .forAccount(pubkey)
    .order("desc")
    .call()
    .then(function (resp) {
      return resp;
    })
    .catch(function (err) {
      console.error(err);
      return err;
    });
}

export async function getAllRecievePayments(pubkey) {
  return server
    .payments()
    .forAccount(pubkey)
    .call()
    .then(function (resp) {
      let total = 0;
      resp.records.forEach(function (record) {
        if (
          record.type === "payment" &&
          record.transaction_successful &&
          pubkey === record.to
        ) {
          total += Number(record.amount);
        }
      });
      return total;
    })
    .catch(function (err) {
      console.error(err);
      return err;
    });
}

export async function pay({ amount, destination, memo = "" }) {
  console.log({
    amount: amount,
    destination: destination,
    memo: memo,
    network: "testnet",
    submit: true,
  });
  return albedo
    .pay({
      amount: amount,
      destination: destination,
      memo: memo,
      network: "testnet",
      submit: true,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch(function (err) {
      console.error(err);
      return err;
    });
}

// export async function getAllRecievePayments(pubkey) {
//   return server
//     .payments()
//     .forAccount(pubkey)
//     .call()
//     .then(function (resp) {
//       return resp;
//     })
//     .catch(function (err) {
//       console.error(err);
//       return err;
//     });
// }
