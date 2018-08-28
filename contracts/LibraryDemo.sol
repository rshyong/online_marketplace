pragma solidity ^0.4.24;
import './SafeMath.sol';

/**
 * @title Library Demo
 * @dev Using SafeMath as a library
 */
 contract LibraryDemo {
     using SafeMath for uint256;

    /**@dev result of multiplication */
     uint256 public mulResult;
    
    /**@dev result of division */
     uint256 public divResult;
    
    /**@dev result of addition */
     uint256 public addResult;
    
    /**@dev result of subtraction */
     uint256 public subResult;
    
    /**@dev result of modulo */
     uint256 public modResult;

    /** Multiply two integers using SafeMath
    *@param a Integer to be multiplied
    *@param b Integer to be multiplied
    */
     function multiply(uint a, uint b) public {
        mulResult = a.mul(b);
     }

    /** Divide two integers using SafeMath
    *@param a Integer to be divided
    *@param b Integer to be divided
    */
     function divide(uint a, uint b) public {
        divResult = a.div(b);
     }

    /** Add two integers using SafeMath
    *@param a Integer to be added
    *@param b Integer to be added
    */
     function add(uint a, uint b) public {
        addResult = a.add(b);
     }

    /** Subtract two integers using SafeMath
    *@param a Integer to be subtracted
    *@param b Integer to be subtracted
    */
     function subtract(uint a, uint b) public {
        subResult = a.sub(b);
     }

    /** Find the modulo of two integers using SafeMath
    *@param a Integer
    *@param b Integer
    */
     function modulo(uint a, uint b) public {
        modResult = a.mod(b);
     }
 }