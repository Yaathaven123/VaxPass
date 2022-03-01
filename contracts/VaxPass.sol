pragma solidity ^0.5.0;

contract VaxPass{
    uint public recordCount = 0;

    struct Record{
        uint id;
        string nic;
    }

    mapping(uint => Record) public records;

//  Displsys sample record
    // constructor() public{
    //     createRecord("record 1");
    // }

    function createRecord(string memory _content) public{
        recordCount++;
        records[recordCount] = Record(recordCount, _content);
    }


}