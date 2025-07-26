document.getElementById("demoForm").addEventListener("submit", function (e) {
  e.preventDefault(); 
  const form = e.target;
  let isValid = true; 

  form.querySelectorAll(".error-message").forEach(err => err.textContent = ""); 
  form.querySelectorAll("input, select, textarea").forEach(field => {
    field.classList.remove("invalid"); 
  });

  const sourceCheckboxesDiv = form.querySelector('.form-group .checkboxes'); 
  if (sourceCheckboxesDiv) {
      sourceCheckboxesDiv.classList.remove("invalid-radio-group");
  }

  const emailField = document.getElementById("email");
  
  if (!emailField.value.trim()) {
    emailField.classList.add("invalid"); 
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
    emailField.classList.add("invalid"); 
    isValid = false;
  }

  const dateDay = document.getElementById("date-day");
  const dateMonth = document.getElementById("date-month");
  const dateYear = document.getElementById("date-year");

  const selectedDay = dateDay.value;
  const selectedMonthAbbr = dateMonth.value; 
  const selectedYear = dateYear.value;
  
  const monthMap = {
      "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
      "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
  };
  const selectedMonthIndex = monthMap[selectedMonthAbbr]; 

  if (!selectedDay || selectedMonthAbbr === "" || !selectedYear) {
    dateDay.classList.add("invalid");
    dateMonth.classList.add("invalid");
    dateYear.classList.add("invalid");
    isValid = false;
  } else {

    const selectedDate = new Date(selectedYear, selectedMonthIndex, selectedDay);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (isNaN(selectedDate.getTime()) ||
        selectedDate.getMonth() !== selectedMonthIndex ||
        selectedDate.getDate() !== parseInt(selectedDay, 10)) { 
        dateDay.classList.add("invalid");
        dateMonth.classList.add("invalid");
        dateYear.classList.add("invalid");
        isValid = false;
    } else if (selectedDate < today) { 
        dateDay.classList.add("invalid");
        dateMonth.classList.add("invalid");
        dateYear.classList.add("invalid");
        isValid = false;
    }
  }
 
  const departmentField = document.getElementById("department");
  if (departmentField.value === "") { 
    departmentField.classList.add("invalid");
    isValid = false;
  }

  const productDemoField = document.getElementById("product-demo");
  if (!productDemoField.value.trim()) {
    productDemoField.classList.add("invalid");
    isValid = false;
  }
  const sourceRadios = form.querySelectorAll('input[name="source"]');
  let sourceSelected = false;
  for (const radio of sourceRadios) {
    if (radio.checked) {
      sourceSelected = true;
      break;
    }
  }
  if (!sourceSelected) {
    if (sourceCheckboxesDiv) {
        sourceCheckboxesDiv.classList.add("invalid-radio-group");
    }
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully!");
    form.reset(); 
    form.querySelectorAll("input, select, textarea").forEach(field => {
      field.classList.remove("invalid");
    });
  
    if (sourceCheckboxesDiv) {
        sourceCheckboxesDiv.classList.remove("invalid-radio-group");
    }
  }
});