import { Bid } from "../models/bid.model.js";
import { Project } from "../models/project.model.js";
const bidOnProject = async (req, res) => {

    try {
        const { projectId, clientId, freelancerId, bidAmount } = req.body

        const numBidAmount = Number(bidAmount)

        if (!projectId || !clientId || !freelancerId) {
            throw new Error("projectId, clientId or freelancerId is missing")
        }

        if (isNaN(numBidAmount) || numBidAmount <= 0) {
            throw new Error("Enter valid bid amount")
        }

        const createOrUpdateBid = await Bid.findOneAndUpdate(
            { project: projectId, client: clientId, freelancer: freelancerId },
            { $set: { amount: numBidAmount } },
            { new: true, upsert: true }
        )

        return res.json(createOrUpdateBid)

    } catch (error) {
        return res.json(error.message)
    }

}

const getAllBidsOfAProject = async (req, res) => {
    try {
        const { projectId } = req.params

        if (!projectId) {
            throw new Error("ProjectId is missing")
        }

        const allBids = await Bid.find({ project: projectId }).populate("freelancer", "username");

        return res.json(allBids);
    } catch (err) {
        return res.json(err.message || "Error getting all bids of a project")
    }

}

const bidSelected = async (req, res) => {
    try {
        const { bidId } = req.params

        if (!bidId) {
            throw new Error("Bid id not found")
        }

        const chosenBid = await Bid.findById(bidId)
            .populate([
                { path: "freelancer", select: "walletAddress" },
                { path: "client", select: "walletAddress" }
            ]);

        if (!chosenBid) {
            throw new Error("Chosen bid not found");
        }

        const selectedBidForProject = await Project.findByIdAndUpdate(
            { _id: chosenBid.project },
            {
                status: "inProgress",
                selectedBid: chosenBid._id,
            },
            { new: true }
        );

        // console.log(chosenBid,selectedBidForProject.selectedBid);

        return res.json({selectedBidForProject,
            freelancerWallet: chosenBid.freelancer.walletAddress,
            clientWallet: chosenBid.client.walletAddress}
        )
    } catch (err) {
        return res.json(err.message || "error in bid selection")
    }
}



export { bidOnProject, getAllBidsOfAProject, bidSelected }
