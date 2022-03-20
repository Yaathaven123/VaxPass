App = {

  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    // App.pushRecords() // SHOWS a ERROR here as well
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }

    // For modern Dapp browsers
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */ })
      } catch (error) {
        // User denied account access...
      }
    }

    // For legacy Dapp browsers
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */ })
    }
    // Non-dapp browsers
    else {
      console.log('Non-Ethereum browser detected. Please try again.')
    }
  },

  // Set the current blockchain account
  loadAccount: async () => {
    App.account = web3.eth.accounts[0]
  },

  // Load the Smart contract
  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const vaxPass = await $.getJSON('VaxPass.json')
    App.contracts.VaxPass = TruffleContract(vaxPass)
    App.contracts.VaxPass.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.vaxPass = await App.contracts.VaxPass.deployed()
  },

  // Render the App
  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render account details
    $('#account').html(App.account)

    // Render Tasks
    await App.renderRecords()

    // Update loading state
    App.setLoading(false)
  },

  renderRecords: async () => {
    // Load the total record count from the blockchain
    const recordCount = await App.vaxPass.recordCount()
    const $recordTemplate = $('.recordTemplate')

    // Render out each record with a new record template
    for (var i = 1; i <= recordCount; i++) {
      // Fetch the record data from the blockchain
      const record = await App.vaxPass.records(i)
      const recordId = record[0].toNumber()
      const recordNIC = record[1]

      // Create the html for the records
      const $newRecordTemplate = $recordTemplate.clone()
      $newRecordTemplate.find('.content').html(recordNIC)

      // Display the records 
      try {
        $('#recordList').append($newRecordTemplate)
      } catch (error) {
        console.log('Something went wrong!')
      }

      // Show the task
      $newRecordTemplate.show()
    }
  },

  // Push records to the MySQL server     -- THIS PART IS NOT WORKING
  pushRecords: async () => {
    App.setLoading(false)
    const dbService = require('./dbService');
    const db = dbService.getDbServiceInstance();

    const result = db.pushData();

    connection.query('INSERT INTO records VALUES (231763796);', (err, rows) => {
      if (err) throw err;
    });

  },

  // Calling create record function from the smart contract
  createRecord: async () => {
    App.setLoading(true)
    const content = $('#newRecord').val()
    await App.vaxPass.createRecord(content)
    window.location.reload()
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  },

  // ON submit get the checked values of the list and use pushRecords to send to DB
  onPress: async() =>{

  }
  
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})