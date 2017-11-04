angular.module('Dapp.controllers', []).
controller('dappController', function($scope) {
    
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(web3.currentProvider);
    } else {
      console.log('Injected web3 Not Found!!!')
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

      var provider = document.getElementById('provider_url').value;
      window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
      console.log(web3);
    }

    if (web3 && web3.isConnected()) {
        // Gets the version data and populates the result UI
        setWeb3Version();
    } 
    $scope.defaultAccount = web3.eth.defaultAccount;
    $scope.contractAddress = "";
    $scope.message = "";

    function setWeb3Version() {
      var versionJson = {};
      var nodeType;
      // Asynchronous version
      web3.version.getNode(function(error, result){
          if(!error){
              
              if(result.toLowerCase().includes('metamask')){
                  nodeType = 'metamask';
              } else if(result.toLowerCase().includes('testrpc')){
                  nodeType = 'testrpc';
              } else {
                  nodeType = 'geth';
              }
          }
      });
    }


});