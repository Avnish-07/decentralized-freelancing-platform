// SPDX-License-Identifier:MIT
pragma solidity ^0.8.28;
contract freelancingLockMoney{
    struct Project{
        address freelancer;
        address client;
        bool freelancerCompleted;
        bool clientCompleted;
        uint projectTotalAmount;
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
        projects[_projectId]= Project(_freelancer, _client, false, false, _amount);
        emit ProjectCreated(_projectId, _freelancer, _client, _amount);
    }

    function clientMarked(bytes32 _projectId) external{
        Project storage project=projects[_projectId];
        require(project.client!= address(0) && project.freelancer!= address(0) , "Invalid Project");
        require(msg.sender== project.client,"You are not the client");
        project.clientCompleted=true;
        emit ClientMarked(_projectId, project.client);
    }

        function freelancerMarked(bytes32 _projectId) external{
            Project storage project=projects[_projectId];
        require(project.client!= address(0) && project.freelancer!= address(0) , "Invalid Project");
        require(msg.sender== project.freelancer,"You are not the freelancer");
        project.freelancerCompleted=true;
        emit FreelancerMarked(_projectId, project.freelancer);
    }

    function releaseMoney(bytes32 _projectId) external{
        Project storage project=projects[_projectId];
        require(project.client!= address(0) && project.freelancer!= address(0) , "Invalid Project");
        require(msg.sender== project.client,"You are not the client");
        require(address(this).balance>=project.projectTotalAmount, "Not sufficient amount");
        require(project.freelancerCompleted==true,"Freelancer didn't mark completed");
        require(project.clientCompleted==true,"Client didn't mark completed");
        (bool success,)= payable(project.freelancer).call{value:project.projectTotalAmount}("");
        require(success, "Money not released");
        emit MoneyReleased(_projectId, project.freelancer, project.projectTotalAmount);
    }
}