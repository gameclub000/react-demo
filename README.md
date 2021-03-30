# ArcBlock React Demo

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), it's a simple demo purpose [Blocklet](https://www.arcblock.io/en/blocklets) that show Block Infomation and Transactions.

## Preview

1. Install and set up ABT Wallet
Install [ABT Wallet](https://abtwallet.io/) for iOS or Android at ABT Wallet. Then, open up the app and follow the directions in the app to set up your wallet.

2. Open [Demo](http://45.77.171.187:8089/blocklets) Link and follow the directions in the Website.

<img width="1245" alt="Screen Shot" src="https://user-images.githubusercontent.com/53006892/112926199-ad3a9280-9145-11eb-8960-031f7518384d.png">


## Run and debug in the cloud with Gitpod

Click the "Open in Gitpod" button, Gitpod will start ABT Node and the blocklet.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/gamecloub000/react-demo)

## Install to your ABT Node

If you have not installed ABT Node locally, you can do it using the following:

```shell
yarn global add @abtnode/cli
```

You can get more details from [Get started with ABT Node](https://www.arcblock.io/en/get-started) page or if you need help installing ABT Node.

Clone the repo and start development using a debug mode ABT Node instance inside this project:

```shell
git clone git@github.com:gameclub000/react-demo.git
cd react-demo
yarn
abtnode init
abtnode start
npm run deploy
```

## Test

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```shell
npm run test
```

## Learn more about ABT Node and Blocklet

-   [ABT Node Overview](https://docs.arcblock.io/en/abtnode/introduction/abtnode-overview)
-   [Get started with ABT Node](https://www.arcblock.io/en/get-started)
-   [ABT Node CLI](https://docs.arcblock.io/en/abtnode/developer/abtnode-cli)
-   [Blocklet Development Documents](https://docs.arcblock.io/en/abtnode/developer/blocklet-spec)

## License

The code is licensed under the MIT license found in the
[LICENSE](LICENSE) file.
