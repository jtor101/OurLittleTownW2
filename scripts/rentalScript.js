// Car Rental Cost Estimator
// by John Torres

"use strict"

// This script is calculates the estimated cost of renting a car when given the number of days, type of car, any additional options, and if the driver is over 25 or not.  The pickup and dropoff dates will both output as well.

function numOfDaysCostCalc() { // This function gets the base rental cost by multiplying the number of days by the economy price.
    let numOfDaysField = document.getElementById("numOfDaysField");
    let numOfDaysCost = numOfDaysField.value * 29.99;
    return numOfDaysCost;
}

function vehicleTypeCalc() { // This function gets the vehicle upgrade cost by multiplying the number of days by the cost difference of the selected vehicle.
    let numOfDaysField = document.getElementById("numOfDaysField");
    let vehicleTypeSelect = document.getElementById("vehicleTypeSelect");
    let vehicleTypeCost;

    switch (vehicleTypeSelect.options[vehicleTypeSelect.selectedIndex].value) {
        case "eco":
            vehicleTypeCost = 0;
            break;
        case "com":
            vehicleTypeCost = (10 * numOfDaysField.value);
            break;
        case "mds":
            vehicleTypeCost = (20 * numOfDaysField.value);
            break;
        case "lux":
            vehicleTypeCost = (30 * numOfDaysField.value);
            break;
    }
    return vehicleTypeCost;
}

function optionsCostCalc() { // This function calculates the cost of additional options based on the boxes checked in the options section.
    let tollTagCBox = document.getElementById("tollTagCBox").checked;
    let gpsCBox = document.getElementById("gpsCBox").checked;
    let roadsideCBox = document.getElementById("roadsideCBox").checked;
    let optionsCost = 0;

    if (tollTagCBox) {
        optionsCost += 3.95;
    }
    if (gpsCBox) {
        optionsCost += 2.95;
    }
    if (roadsideCBox) {
        optionsCost += 2.95;
    }
    return optionsCost;
}

function surchargeCostCalc() { // This function determines if a surcharge for a driver under 25 needs to be applied or not.
    let under25NoRB = document.getElementById("under25No");
    let under25YesRB = document.getElementById("under25Yes");
    let under25sc;

    if (under25YesRB.checked) {
        under25sc = 0.3;
    } else {
        under25sc = 0;
    }
    return under25sc;
}

function getCheckoutDate() { // This function takes the pickup date input, determines what the dropoff date will be, and outputs both.  
    let pickupDateField = document.getElementById("pickupDateField");

    let s = pickupDateField.value;
    let pickupDate = new Date();

    pickupDate.setMonth(s.substring(5, 7) - 1);
    pickupDate.setDate(s.substring(8, 10));
    pickupDate.setFullYear(s.substring(0, 4));

    let numOfDaysField = document.getElementById("numOfDaysField");
    let numOfDays = Number(numOfDaysField.value);

    let msec_per_day = 1000 * 60 * 60 * 24;

    let dropoffMsec = pickupDate.getTime() + (numOfDays * msec_per_day);

    document.getElementById("pickupDateOutput").value = pickupDate.toLocaleDateString();
    
    let temp = new Date(dropoffMsec);
    document.getElementById("dropoffDateOutput").value = temp.toLocaleDateString();
}

function totalPriceCalc() { // This function calculates the total price, and outputs all the final calculations.
    let numOfDaysFinal = numOfDaysCostCalc();
    let optionsFinal = optionsCostCalc();
    let surchargeAmt = surchargeCostCalc();
    let selectedVehCost = vehicleTypeCalc();
    getCheckoutDate();

    let surchargeFinal = numOfDaysFinal * surchargeAmt;

    document.getElementById("carRentalCostField").value = numOfDaysFinal.toFixed(2);
    document.getElementById("carTypeCostField").value = selectedVehCost.toFixed(2);

    document.getElementById("optionsCostField").value = optionsFinal.toFixed(2);
    document.getElementById("under25SurchargeField").value = surchargeFinal.toFixed(2);

    let totalCost = numOfDaysFinal + optionsFinal + surchargeFinal + selectedVehCost;

    document.getElementById("totalCostField").value = totalCost.toFixed(2);
}

window.onload = function() {
    // Button
    const totalCostBtn = document.getElementById("totalCostBtn");
    totalCostBtn.onclick = totalPriceCalc;
}