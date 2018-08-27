# Design Pattern Decisions

## Fail early and fail loud

I used the require statement pretty often in my code (see below) to check that the necessary conditions were met. If not, it would throw an exception and prevent and further code from being executed.
    - deleteOwner: checking to make sure the owner exists. Also checking for integer underflow
    - addProduct: checking to make sure both price and quantity are greater than 0
    - buyProduct: checking to make sure msg.value is equal to the price of the product * the quantity the customer is buying. Also checking for integer underflow (see below).
    - withdrawFunds: checking to make sure the store has funds to withdraw
    - all the modifier functions

## Restricting Access

I use modifier functions to restrict access for admins only, store owners only, as well as for the circuit breaker function in case the contract owner wants to disable payments and withdrawals temporarily.
    - checkAdmin
    - checkOwner
    - emergencyStop

## Pull Payments

When a customer buys a product, the funds are stored in the storefront first. In order for store owners to receive funds from their stores, they need to manually withdraw it themselves. By utilizing the pull method instead of push method, it protects against re-entrancy and denial of service attacks.

## Circuit Breaker

I implemented a circuit breaker function (isEmergency) that only the admin has access to. This way if a bug has been detected, the admin can freeze the contract, thereby reducing harm before a fix can be implemented.

## Others

There were a few other design patterns that I would have liked to implement if I had the time. 
    - Speed Bumps: Implement a speed bump when withdrawing funds, in case the contract was hacked.
    - State Machine: Implement a auction for individual products using state machine, where customers can bid on the product in a certain window of time.