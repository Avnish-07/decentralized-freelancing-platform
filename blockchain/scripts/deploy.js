const {ethers}= require("hardhat")

async function main() {
    try{

        const signers= await ethers.getSigners()
        const deployer= signers[0]
        const lockMoney= await ethers.getContractFactory("freelancingLockMoney")
        const lockMoneyContract= await lockMoney.deploy()
        console.log(lockMoneyContract.target)
    }catch(err){
        console.log(err.message || "Error in deployment")
    }
}
main();