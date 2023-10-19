
const bmiForm = document.getElementById("bmiForm");
const heightInput = document.getElementById("height");
const heightUnitSelect = document.getElementById("heightUnit");
const weightInput = document.getElementById("weight");
const bmiResult = document.getElementById("bmiResult");
const bmiClassification = document.getElementById("bmiClassification");


bmiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    calculateBMI();
});

heightUnitSelect.addEventListener("change", () => {
    updateHeightPlaceholder();
});

function updateHeightPlaceholder() {
    const selectedUnit = heightUnitSelect.value;
    if (selectedUnit === "meters") {
        heightInput.placeholder = "Height in meters";
    } else if (selectedUnit === "feet") {
        heightInput.placeholder = "Height in feet and inches (eg: 5'6)";
    } else if (selectedUnit === "inches") {
        heightInput.placeholder = "Height in inches";
    }
}

function convertFeetInchesToMeters(feetInches) {
    const [feet, inches] = feetInches.split("'").map(parseFloat);
    const heightMeters = (feet * 0.3048) + (inches * 0.0254);
    return heightMeters;
}

function calculateBMI() {
    const selectedUnit = heightUnitSelect.value;
    let heightMeters = parseFloat(heightInput.value);

    if (selectedUnit === "feet") {
        heightMeters = convertFeetInchesToMeters(heightInput.value);
    } else if (selectedUnit === "inches") {
        heightMeters = heightInput.value * 0.0254;
    }

    const weight = parseFloat(weightInput.value);

    let bmi = weight / (heightMeters * heightMeters);

    bmiResult.textContent = `Your BMI: ${bmi.toFixed(2)}`;
    if (bmi < 18.5) {
        bmiClassification.textContent = 'UNDERWEIGHT';
    } else if (18.5 < bmi < 24.9) {
        bmiClassification.textContent = 'HEALTHY WEIGHT';
    } else if (25 < bmi < 29.9) {
        bmiClassification.textContent = 'OVERWEIGHT';
    } else {
        bmiClassification.textContent = 'OBESITY';
    }
}

updateHeightPlaceholder();
