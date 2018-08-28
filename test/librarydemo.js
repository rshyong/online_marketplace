/**
 * The tests below cover tests for multiplying, dividing, adding, subtracting, and finding the modulo of two numbers.
 * The purpose of these tests is to demonstate knowledge of using a library (SafeMath).
 * If the library was properly implemented, then certain actions will fail as part of the SafeMath library.
 */

const LibraryDemo = artifacts.require("./LibraryDemo.sol");

contract('LibraryDemo', function(accounts) {

    it('should multiply two numbers', async () => {
        let librarydemo = await LibraryDemo.deployed();
        await librarydemo.multiply(5,4);
        let result = await librarydemo.mulResult();
        assert.equal(result.toNumber(), 20);
    });

    it('should fail to multiply two very large numbers', async () => {
        let librarydemo = await LibraryDemo.deployed();
        let errorMsg = 'Should fail to multiply two very large numbers';
        try {
            await librarydemo.multiply(Math.pow(2,256),3);
            assert.fail(errorMsg);
        } catch (e) {
            assert.notEqual(e.actual, errorMsg, errorMsg);
        }
    });

    it('should divide two numbers', async () => {
        let librarydemo = await LibraryDemo.deployed();
        await librarydemo.divide(8, 4);
        let result = await librarydemo.divResult();
        assert.equal(result.toNumber(), 2);
    });

    it('should fail to divide by 0', async () => {
        let librarydemo = await LibraryDemo.deployed();
        let errorMsg = 'Should fail to divide by 0';
        try {
            await librarydemo.divide(5,0);
            assert.fail(errorMsg);
        } catch (e) {
            assert.notEqual(e.actual, errorMsg, errorMsg);
        }
    });

    it('should add two numbers', async () => {
        let librarydemo = await LibraryDemo.deployed();
        await librarydemo.add(8,4);
        let result = await librarydemo.addResult();
        assert.equal(result.toNumber(), 12);
    });

    it('should fail to add two very large numbers', async () => {
        let librarydemo = await LibraryDemo.deployed();
        let errorMsg = 'Should fail to add two very large numbers';
        try {
            await librarydemo.add(Math.pow(2,256), 2);
            assert.fail(errorMsg);
        } catch (e) {
            assert.notEqual(e.actual, errorMsg, errorMsg);
        }
    });

    it('should subtract two numbers', async () => {
        let librarydemo = await LibraryDemo.deployed();
        await librarydemo.subtract(8,4);
        let result = await librarydemo.subResult();
        assert.equal(result.toNumber(), 4);
    });

    it('should fail to subtract two numbers if second number is greater than first', async () => {
        let librarydemo = await LibraryDemo.deployed();
        let errorMsg = 'Should fail to subtract two numbers if second number is greater than first';
        try {
            await librarydemo.subtract(4,5);
            assert.fail(errorMsg);
        } catch (e) {
            assert.notEqual(e.actual, errorMsg, errorMsg);
        }
    });

    it('should find modulo of two numbers', async () => {
        let librarydemo = await LibraryDemo.deployed();
        await librarydemo.modulo(9,4);
        let result = await librarydemo.modResult();
        assert.equal(result.toNumber(), 1);
    });

    it('should fail to find modulo of two numbers if second number is 0', async () => {
        let librarydemo = await LibraryDemo.deployed();
        let errorMsg = 'Should fail to find modulo of two numbers if second number is 0';
        try {
            await librarydemo.modulo(4,0);
            assert.fail(errorMsg);
        } catch (e) {
            assert.notEqual(e.actual, errorMsg, errorMsg);
        }
    });
});