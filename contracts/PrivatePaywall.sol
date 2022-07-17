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

  function buyPermission(uint articleId) payable public {
    require(msg.value >= 1 ether, "gimme more");
    permissions[msg.sender].push(articleId);
  }

  function usersPermissions() public view returns(uint[] memory){
    return permissions[msg.sender];
  }
}
