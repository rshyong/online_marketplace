# Avoiding Common Attacks

## Re-entrancy Attacks

My contract does not make external function calls so I did not worry about this.

## Integer Underflow/ Overflow

When buying a product, I check to make sure that the quantity of the product does not go below 0 through a modifier (checkIntegerUnderflow). This prevents the contract from updating the quantity to be the max integer (2^256 - 1) should the quantity fall below 0. I did not worry about integer overflow as much since it was not relevant to my webapp.

## Poison Data

I use require statements to check user inputs to prevent unwanted inputs. For example, for the addProduct function, I check to make sure that both price and quantity provided are greater than 0.

## Denial of Service

By using a withdrawal pattern for sending funds to owners, it prevents malicious actors from performing a DOS attack on my webapp.