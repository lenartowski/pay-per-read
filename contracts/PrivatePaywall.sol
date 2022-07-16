// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract PrivatePaywall {
  mapping (address => uint[]) permissions;



  function hasPermission(address userId, uint articleId) public view returns (bool) {
    // check if user has permission for article
    if (permissions[userId].length > 0) {
      for (uint i = 0; i < permissions[userId].length; i++) {
        if (permissions[userId][i] == articleId) return true;
      }
    }
    return false;
  }

  function addPermission(address userId, uint articleId) external {
    // add permission for user to article
    permissions[userId].push(articleId);
  }

  function buyPermission(uint articleId) payable public {
    if (msg.value > 1) {
      this.addPermission(msg.sender, articleId);
    } else {
      revert();
    }
  }

  function usersPermissions() public view returns(uint[] memory){
    return permissions[msg.sender];
  }
}
