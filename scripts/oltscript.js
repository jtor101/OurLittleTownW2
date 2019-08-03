// Hotel Cost Estimator
// by John Torres

"use strict"

// This script calculates the estimated total cost of stay based on the number of guests (adults and children), the customer's discount eligibility, the reservation length, the type of room, and if the guests would like to add breakfast on.



function getNumAdults() { // This function acquires the number of adults staying at the hotel from the Number of Adults dropdown.
    let adultNumSelect = document.getElementById("adultNumSelect")
    let numOfAdults = 1;

    switch (adultNumSelect.options[adultNumSelect.selectedIndex].value) {
        case "1":
            numOfAdults = 1;
            break;
        case "2":
            numOfAdults = 2;
            break;
        case "3":
            numOfAdults = 3;
            break;
        case "4":
            numOfAdults = 4;
            break;
    }
    return numOfAdults;
}


function getNumChildren() { // This function acquires the number of children staying at the hotel from the Number of Children dropdown.
    let childNumSelect = document.getElementById("childNumSelect")
    let numOfChildren = 0;

    switch (childNumSelect.options[childNumSelect.selectedIndex].value) {
        case "0":
            numOfChildren = 0;
            break;
        case "1":
            numOfChildren = 1;
            break;
        case "2":
            numOfChildren = 2;
            break;
        case "3":
            numOfChildren = 3;
            break;
        case "4":
            numOfChildren = 4;
            break;
    }
    return numOfChildren;
}


function getCheckoutDate() { //This function gets the checkout date based on the information in the Check-In Date date picker and Length of Stay field.  It then outputs the Check-In and Check-Out Dates to the Hotel Reservation Costs section.
    let checkinDateField = document.getElementById("checkinDateField");

    let s = checkinDateField.value;
    let checkinDate = new Date();

    checkinDate.setMonth(s.substring(5, 7) - 1);
    checkinDate.setDate(s.substring(8, 10));
    checkinDate.setFullYear(s.substring(0, 4));

    let stayLengthField = document.getElementById("stayLengthField");
    let stayLength = Number(stayLengthField.value);

    let msec_per_day = 1000 * 60 * 60 * 24;

    let checkoutMsec = checkinDate.getTime() + (stayLength * msec_per_day);

    document.getElementById("checkinDateOutput").value = checkinDate.toLocaleDateString();
    
    let temp = new Date(checkoutMsec);
    document.getElementById("checkoutDateOutput").value = temp.toLocaleDateString();
}


function getRoomType() { // This function gets the room type information from the Type of Room dropdown.
    let typeOfRmSelect = document.getElementById("typeOfRmSelect");
    let costOfRmType = 0;

    let prices = [
        { roomType: "queen", maxOccupency: 5, regularRates: 150 },
        { roomType: "king", maxOccupency: 2, regularRates: 150 },
        { roomType: "kingSuite", maxOccupency: 4, regularRates: 190 },
        { roomType: "twoBrSuite", maxOccupency: 6, regularRates: 210 }
    ];

    for (let i = 0; i < prices.length; i++) {
        if (typeOfRmSelect.options[typeOfRmSelect.selectedIndex].value == prices[i].roomType) {
            costOfRmType = prices[i].regularRates;
            break;
        }
    }

    return costOfRmType;
}


function checkRoomCompatibility() { // This function checks the number of occupants chosed in the adult and children dropdowns and hides incompatible rooms.
    let numOfAdults = getNumAdults();
    let numOfChildren = getNumChildren();

    let rmSelect = document.getElementById("typeOfRmSelect");

    if (numOfAdults + numOfChildren > 6) { // All are hidden
        rmSelect.options[1].style.display = "none";
        rmSelect.options[2].style.display = "none";
        rmSelect.options[3].style.display = "none";
        rmSelect.options[4].style.display = "none";
    } 
    else if (numOfAdults + numOfChildren > 5) { // King, Queen, and King Suite are hidden
        rmSelect.options[1].style.display = "none";
        rmSelect.options[2].style.display = "none";
        rmSelect.options[3].style.display = "none";
        rmSelect.options[4].style.display = "block";
    } 
    else if (numOfAdults + numOfChildren > 4) { //King and Queen are hidden
        rmSelect.options[1].style.display = "block";
        rmSelect.options[2].style.display = "none";
        rmSelect.options[3].style.display = "none";
        rmSelect.options[4].style.display = "block";
    } 
    else if (numOfAdults + numOfChildren > 2) { //King is hidden
        rmSelect.options[1].style.display = "block";
        rmSelect.options[2].style.display = "none";
        rmSelect.options[3].style.display = "block";
        rmSelect.options[4].style.display = "block";
    } 
    else { //All are shown.
        rmSelect.options[1].style.display = "block";
        rmSelect.options[2].style.display = "block";
        rmSelect.options[3].style.display = "block";
        rmSelect.options[4].style.display = "block";
    }

}


function getDiscount() { //This function returns the discount amount based on the radio button selected.
    let discNoneRb = document.getElementById("discNoneRb");
    let discAaaRb = document.getElementById("discAaaRb");
    let discSeniorRb = document.getElementById("discSeniorRb");
    let discMilitaryRb = document.getElementById("discMilitaryRb");
    let discAmt = 0;

    if (discAaaRb.checked) {
        discAmt = 0.1; //10% off, 90% of original price
    } 
    else if (discSeniorRb.checked) {
        discAmt = 0.1; //10% off, 90% of original price
    } 
    else if (discMilitaryRb.checked) {
        discAmt = 0.2; //20% off, 80% of original price
    } 
    else if (discNoneRb.checked) {
        discAmt = 0;
    }
    return discAmt;
}


function getBreakfastCost() { // This function returns the cost of breakfast based on the number of occupants, the Breakfast switch position, and the Discount radio button selected.
    let stayLengthField = document.getElementById("stayLengthField");
    let stayLength = stayLengthField.value;

    let breakfastSwitch = document.getElementById("breakfastSwitch");
    let discSeniorRb = document.getElementById("discSeniorRb");
    let breakfastCost = 0;

    let numOfAdults = getNumAdults();
    let numOfChildren = getNumChildren();

    if (discSeniorRb.checked && breakfastSwitch.checked) {
        breakfastCost = 0;
    } 
    else if (breakfastSwitch.checked) {
        breakfastCost = ((numOfAdults * 6.96) + (numOfChildren * 3.95)) * stayLength;
    } 
    else {
        breakfastCost = 0;
    }
    return breakfastCost;
}


function getBaseRoomCost() { //This function gets the base room cost based on the room selected and the length of stay.
    let stayLengthField = document.getElementById("stayLengthField");
    let stayLength = stayLengthField.value;
    let roomCost = 0;
    
    let costOfRmType = getRoomType();

    roomCost = stayLength * costOfRmType
    return roomCost;
}


function getTotal() { //This function does final calculations and places the output for tax, discount, total room, and total cost of stay. 
    getCheckoutDate();
    let baseRoomCost = getBaseRoomCost();
    let breakfastCost = getBreakfastCost();
    let roomCostOutput = baseRoomCost + breakfastCost;
    let discAmt = getDiscount();
    let discOutput = discAmt * baseRoomCost;
    let taxOnRoom = roomCostOutput * .12
    let totalCost = (baseRoomCost - discOutput + taxOnRoom) + breakfastCost;

    document.getElementById("taxOutput").value = taxOnRoom.toFixed(2);
    document.getElementById("totalRoomCostOutput").value = roomCostOutput.toFixed(2);
    document.getElementById("discOutput").value = discOutput.toFixed(2);
    document.getElementById("totalOutput").value = totalCost.toFixed(2);
}


window.onload = function() {
    const totalCostBtn = document.getElementById("calcBtn");
    totalCostBtn.onclick = getTotal;

    document.getElementById("adultNumSelect").onchange = checkRoomCompatibility;
    document.getElementById("childNumSelect").onchange = checkRoomCompatibility;
}