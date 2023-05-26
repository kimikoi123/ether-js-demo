import { ethers } from "ethers"

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID

export const signMessage = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  try {
    signer.signMessage("Hello World").then((result) => {
      console.log(result)
    })
  } catch (error) {
    // handle error
    console.log(error)
  }
}

export const readBalance = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_ID}`
  )
  const address = "0xe688b84b23f322a994A53dbF8E15FA82CDB71127"
  const balance = await provider.getBalance(address)
  return ethers.utils.formatEther(balance)
}

export const readSmartContract = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_ID}`
  )
  // const ERC20_ABI = [
  //   "function name() view returns (string)",
  //   "function symbol() view returns (string)",
  //   "function totalSupply() view returns (uint256)",
  //   "function balanceOf(address) view returns (uint)",
  // ]
  const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
  ]

  const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  const contract = new ethers.Contract(address, ERC20_ABI, provider)
  const name = await contract.name()
  const symbol = await contract.symbol()
  const totalSupply = ethers.utils.formatEther(await contract.totalSupply())
  const userAddress = "0x97e7d56A0408570bA1a7852De36350f7713906ec"
  const balance = ethers.utils.formatEther(
    await contract.balanceOf(userAddress)
  )
  return { name, symbol, totalSupply, balance }
}

export const sendSignedTransaction = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_ID}`
  )
}

export const writeContract = async () => {}

export const contractEventStream = async () => {}

export const inspectingBlocks = async () => {}

