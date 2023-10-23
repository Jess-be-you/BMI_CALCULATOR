const bmiForm = document.getElementById("bmiForm");
        const heightUnitSelect = document.getElementById("heightUnit");
        const heightBlock = document.getElementById("heightBlock");
        const weightInput = document.getElementById("weight");
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

        function clearResults() {
            bmiResult.textContent = "";
            bmiClassification.textContent = "";
            validation.textContent = "";
        }

        function updateHeightInput() {
            const selectedUnit = heightUnitSelect.value;
            if (selectedUnit === "meters") {
                heightBlock.innerHTML = '<input type="text" id="heightMeters" name="height" placeholder="Height in meters">';
            } else if (selectedUnit === "feet") {
                heightBlock.innerHTML = 
                    '<input type="number" id="heightFeet" name="heightFeet" placeholder="Feet" min="0">' +
                    '<input type="number" id="heightInches" name="heightInches" placeholder="Inches" min="0" max="12">';
            } else if (selectedUnit === "inches") {
                heightBlock.innerHTML = '<input type="text" id="heightInch" name="heightInch" placeholder="Height in inches">';
            }
        }

        function validateInputs() {
            const selectedUnit = heightUnitSelect.value;
            let heightValue;
            
            if (selectedUnit === "meters") {
                heightValue = parseFloat(document.getElementById("heightMeters").value);
            } else if (selectedUnit === "feet") {
                const feetValue = parseFloat(document.getElementById("heightFeet").value);
                const inchesValue = parseFloat(document.getElementById("heightInches").value);
                heightValue = feetValue * 0.3048 + inchesValue * 0.0254;
            } else if (selectedUnit === "inches") {
                heightValue = parseFloat(document.getElementById("heightInch").value) * 0.0254;
            }

            const weightValue = parseFloat(weightInput.value);

            if (isNaN(heightValue) || heightValue <= 0) {
                validation.textContent = "Invalid height value. Please enter a valid height.";
                return false;
            }

            if (isNaN(weightValue) || weightValue <= 0) {
                validation.textContent = "Invalid weight value. Please enter a valid weight in kilograms.";
                return false;
            }

            return true;
        }

        function calculateBMI() {
            const selectedUnit = heightUnitSelect.value;
            let heightMeters;
            
            if (selectedUnit === "meters") {
                heightMeters = parseFloat(document.getElementById("heightMeters").value);
            } else if (selectedUnit === "feet") {
                const feetValue = parseFloat(document.getElementById("heightFeet").value);
                const inchesValue = parseFloat(document.getElementById("heightInches").value);
                heightMeters = feetValue * 0.3048 + inchesValue * 0.0254;
            } else if (selectedUnit === "inches") {
                heightMeters = parseFloat(document.getElementById("heightInch").value) * 0.0254;
            }

            const weight = parseFloat(weightInput.value);
            let bmi = weight / (heightMeters * heightMeters);

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