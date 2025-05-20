// SPDX-License-Identifier:MIT
pragma solidity ^0.8.28;
contract freelancingLockMoney{
    struct Project{
        address freelancer;
        address client;
        bool freelancerCompleted;
        bool clientCompleted;
        uint projectTotalAmount;
        bool isReleased;
    }


    mapping (bytes32=>Project) public projects;

    event ProjectCreated(bytes32 indexed _projectId, address _freelancer, address _client, uint _amount);
    event FreelancerMarked(bytes32 indexed _projectId, address _freelancer);
    event ClientMarked(bytes32 indexed _projectId, address _client);
    event MoneyReleased(bytes32 indexed _projectId, address _to, uint _amount);

    function lockMoney(bytes32 _projectId, address _freelancer, address _client, uint _amount) public payable{
        require(msg.value>0,"Value should be greater than 0");
        require(msg.value==_amount,"Insufficient Amount sent");
        require(_freelancer!= address(0) && _client!= address(0),"Invalid address of freelancer or client");
        projects[_projectId]= Project(_freelancer, _client, false, false, _amount, false);
        emit ProjectCreated(_projectId, _freelancer, _client, _amount);
    }

    function clientMarked(bytes32 _projectId) external{
        Project storage project=projects[_projectId];
        require(project.client!= address(0) && project.freelancer!= address(0) , "Invalid Project");
        require(msg.sender== project.client,"You are not the client");
        require(!project.clientCompleted,"Already marked true");
        project.clientCompleted=true;
        emit ClientMarked(_projectId, project.client);
        releaseMoney(_projectId);
    }

        function freelancerMarked(bytes32 _projectId) external{
            Project storage project=projects[_projectId];
        require(project.client!= address(0) && project.freelancer!= address(0) , "Invalid Project");
        require(msg.sender== project.freelancer,"You are not the freelancer");
        require(!project.freelancerCompleted,"Already marked true");
        project.freelancerCompleted=true;
        emit FreelancerMarked(_projectId, project.freelancer);
        releaseMoney(_projectId);
    }

    function releaseMoney(bytes32 _projectId) internal{
        Project storage project=projects[_projectId];
        if(project.clientCompleted && project.freelancerCompleted && !project.isReleased && address(this).balance>=project.projectTotalAmount){
        (bool success,)= payable(project.freelancer).call{value:project.projectTotalAmount}("");
        require(success, "Money not released");
        project.isReleased=true;
        emit MoneyReleased(_projectId, project.freelancer, project.projectTotalAmount);
        }
    }
}