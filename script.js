
const bmiForm = document.getElementById("bmiForm");
const heightUnitSelect = document.getElementById("heightUnit");
const inchesMessage = document.getElementById("inchesMessage");
const weightUnitSelect = document.getElementById("weightUnit");
const heightBlock = document.getElementById("heightBlock");
const weightBlock = document.getElementById("weightBlock");
const bmiResult = document.getElementById("bmiResult");
const bmiClassification = document.getElementById("bmiClassification");
const validation = document.getElementById("validation");

bmiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validation.textContent = "";
    clearResults();
    if (validateInputs()) {
        calculateBMI();
    }
});

heightUnitSelect.addEventListener("change", () => {
    updateHeightInput();
    clearResults();
});
weightUnitSelect.addEventListener("change", () => {
    updateWeightInput();
    clearResults();
});

function clearResults() {
    bmiResult.textContent = "";
    bmiClassification.textContent = "";
    validation.textContent = "";
}

function updateHeightInput() {
    const selectedHeightUnit = heightUnitSelect.value;
    if (selectedHeightUnit === "meters") {
        heightBlock.innerHTML = '<input type="text" id="heightMeters" name="height" placeholder="Height in meters">';
    } else if (selectedHeightUnit === "centimeters") {
        heightBlock.innerHTML = '<input type="text" id="heightcm" name="height" placeholder="Height in centimeters">';
    } else if (selectedHeightUnit === "feet") {
        heightBlock.innerHTML =
            '<input type="number" id="heightFeet" name="heightFeet" placeholder="Feet" min="0">' +
            '<input type="number" id="heightInches" name="heightInches" placeholder="Inches" min="0" max="12">';   
            const inchesInput = document.getElementById("heightInches");
            heightInches.oninput = function ()  {
            const inchesValue = parseInt(inchesInput.value);
            if (inchesValue > 12) {
                inchesMessage.textContent = "Inches cannot go beyond 12";
            } else {
                inchesMessage.textContent = "";
            }
        };

    } else if (selectedHeightUnit === "inches") {
        heightBlock.innerHTML = '<input type="text" id="heightInch" name="heightInch" placeholder="Height in inches">';
    }
}

function updateWeightInput() {
    const selectedWeightUnit = weightUnitSelect.value;
    if (selectedWeightUnit === "kg") {
        weightBlock.innerHTML = '<input type="text" id="weightKgs" name="weight" placeholder="Weight in kilograms">';
    } else if (selectedWeightUnit === "pounds")
        weightBlock.innerHTML = '<input type="text" id="weightPounds" name="weight" placeholder="Weight in pounds">';

}

function validateInputs() {
    const selectedHeightUnit = heightUnitSelect.value;
    const selectedWeightUnit = weightUnitSelect.value;
    let heightValue;
    let weightValue;

    if (selectedHeightUnit === "meters") {
        heightValue = parseFloat(document.getElementById("heightMeters").value);
    } else if (selectedHeightUnit === "feet") {
        const feetValue = parseFloat(document.getElementById("heightFeet").value);
        const inchesValue = parseFloat(document.getElementById("heightInches").value);
        heightValue = feetValue * 0.3048 + inchesValue * 0.0254;



    } else if (selectedHeightUnit === "inches") {
        heightValue = parseFloat(document.getElementById("heightInch").value) * 0.0254;
    } else if (selectedHeightUnit === "centimeters") {
        heightValue = parseFloat(document.getElementById("heightcm").value) / 100;
    }

    if (selectedWeightUnit === "kg") {
        weightValue = parseFloat(document.getElementById("weightKgs").value);
    } else if (selectedWeightUnit === "pounds") {
        weightValue = parseFloat(document.getElementById("weightPounds").value * 0.454);
    }

    if (isNaN(heightValue) || heightValue <= 0) {
        validation.textContent = "Invalid height value. Please enter a valid height.";
        return false;
    }

    if (isNaN(weightValue) || weightValue <= 0) {
        validation.textContent = "Invalid weight value. Please enter a valid weight";
        return false;
    }

    return true;
}

function calculateBMI() {
    const selectedHeightUnit = heightUnitSelect.value;
    const selectedWeightUnit = weightUnitSelect.value;
    let heightMeters;
    let weightKiloGrams;

    if (selectedHeightUnit === "meters") {
        heightMeters = parseFloat(document.getElementById("heightMeters").value);
    } else if (selectedHeightUnit === "feet") {
        const feetValue = parseFloat(document.getElementById("heightFeet").value);
        const inchesValue = parseFloat(document.getElementById("heightInches").value);
        heightMeters = feetValue * 0.3048 + inchesValue * 0.0254;
    } else if (selectedHeightUnit === "inches") {
        heightMeters = parseFloat(document.getElementById("heightInch").value) * 0.0254;
    } else if (selectedHeightUnit === "centimeters") {
        heightMeters = parseFloat(document.getElementById("heightcm").value) / 100;
    }

    if (selectedWeightUnit === "kg") {
        weightKiloGrams = parseFloat(document.getElementById("weightKgs").value);
    } else if (selectedWeightUnit === "pounds") {
        weightKiloGrams = parseFloat(document.getElementById("weightPounds").value * 0.454);
    }

    let bmi = weightKiloGrams / (heightMeters * heightMeters);

    bmiResult.textContent = `Your BMI: ${bmi.toFixed(2)}`;

  


    if (bmi < 18.5) {
        bmiClassification.textContent = 'UNDERWEIGHT';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiClassification.textContent = 'HEALTHY WEIGHT';
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiClassification.textContent = 'OVERWEIGHT';
    } else {
        bmiClassification.textContent = 'OBESITY';
    }
}

updateHeightInput();
updateWeightInput();
clearResults();