document.addEventListener("DOMContentLoaded", () => {
  const profileText = document.querySelector(".profile-text");
  const profilePic = document.getElementById("profilePic");
  const fileInput = document.getElementById("fileInput");
  const form = document.querySelector(".create-container");
  const overviewPlansList = document.querySelector(".overview-plans-list");

  // 🔹 Load and show profile image from localStorage
  const savedImage = localStorage.getItem("profilePic");
  if (savedImage && profilePic) {
    profilePic.src = savedImage;
  }

  // 🔹 Load and show username from localStorage
  const savedUsername = localStorage.getItem("username");
  if (profileText) {
    profileText.innerText = savedUsername ? `Welcome, ${savedUsername}!` : "Welcome!";
  }

  // 🔹 Save image to localStorage on upload
  if (fileInput && profilePic) {
    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imageData = e.target.result;
          profilePic.src = imageData;
          localStorage.setItem("profilePic", imageData);
        };
        reader.readAsDataURL(file);
      }
      const uploadbtn = document.querySelector('.upload-btn');
      uploadbtn.style.display = 'none';
    });
  }

  // 🔹 Notification (optional)
  const notificationBtn = document.querySelector('.notification');
  const notificationNote = document.querySelector('.notification-note');

  if (notificationBtn && notificationNote) {
    notificationBtn.addEventListener('click', () => {
      notificationNote.style.display = 'block';
      setTimeout(() => {
        notificationNote.style.display = 'none';
      }, 4500);
    });
  }


  

  function isValidEmail(emailStr) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(emailStr);
  }

  // ✅ These were missing before, added them back safely
  const username = form?.querySelector('input[placeholder="Username"]');
  const email = form?.querySelector('input[placeholder="Email"]');
  const password = form?.querySelector('input[placeholder="Create Password"]');
  const confirmPassword = form?.querySelector('input[placeholder="Confirm Password"]');
  const errorAlert = form?.querySelector(".alert.error");
  const successAlert = form?.querySelector(".alert.success");

  let profileImageData = ""; // Used in form submission

  // ✅ Form submission handler
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      errorAlert.style.display = "none";
      successAlert.style.display = "none";

      const usernameVal = username.value.trim();
      const emailVal = email.value.trim();
      const passVal = password.value;
      const confirmPassVal = confirmPassword.value;

      if (!usernameVal || !emailVal || !passVal || !confirmPassVal) {
        errorAlert.textContent = "All fields are required!";
        errorAlert.style.display = "block";
        return;
      }

      if (!isValidEmail(emailVal)) {
        errorAlert.textContent = "Please enter a valid email address!";
        errorAlert.style.display = "block";
        return;
      }

      if (passVal !== confirmPassVal) {
        errorAlert.textContent = "Passwords do not match!";
        errorAlert.style.display = "block";
        return;
      }

      // Save name and image
      localStorage.setItem("username", usernameVal);
      localStorage.setItem("profilePic", profilePic); 

      successAlert.textContent = "Account created successfully!";
      successAlert.style.display = "block";

      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);

      form.reset();
    });
  }

  if (profileText) {
    const storedName = localStorage.getItem("username");
    profileText.innerText = storedName ? storedName : "Welcome!";
  }

  if (profilePic) {
    const storedImage = localStorage.getItem("profilePic");
    profilePic.src = storedImage || "";
  }

  if (profileText && profilePic) {
    const savedUsername = localStorage.getItem("username");
    const savedImage = localStorage.getItem("profilePic");

    profileText.innerText = savedUsername ? `Welcome, ${savedUsername}!` : "Welcome!";
    profilePic.src = savedImage || "";
  }


 
  document.querySelectorAll("ul li.navigation").forEach(item => {
    item.addEventListener("click", function () {

      
      document.querySelectorAll("ul li.navigation").forEach(nav => {
        nav.classList.remove("active");
        nav.querySelector('.links')?.classList.remove("active");
        nav.querySelector('.icon')?.classList.remove("active");
      });

      this.classList.add("active");
      this.querySelector('.links')?.classList.add("active");
      this.querySelector('.icon')?.classList.add("active");
    });
  });

  

  const totalIncome = document.querySelector(".total-income");
  const addIncome = document.querySelector(".add-income");

  if (totalIncome && addIncome) {
    const savedIncome = localStorage.getItem("income");
    if (savedIncome !== null) {
      totalIncome.innerHTML = `₦${savedIncome}`;
    }

    addIncome.addEventListener("click", () => {
      const incomeAmount = prompt("Input your income for the day");
      if (incomeAmount && !isNaN(incomeAmount)) {
        localStorage.setItem("income", incomeAmount);
        totalIncome.innerHTML = `₦${incomeAmount}`;
      } else {
        alert("Please enter a valid number.");
      }
    });
  }

  const saveButton = document.querySelector(".plan-btn");
  const planNameInput = document.querySelector("#planName");
  const amountInput = document.querySelector("#amount");

  if (saveButton && planNameInput && amountInput) {
    saveButton.addEventListener("click", (e) => {
      e.preventDefault();

      const name = planNameInput.value.trim();
      const amount = amountInput.value.trim();

      if (!name || !amount) {
        alert("Please fill in both Plan name and Amount");
        return;
      }

      const plan = { name, amount };
      const existingPlans = JSON.parse(localStorage.getItem("plans")) || [];

      existingPlans.push(plan);
      localStorage.setItem("plans", JSON.stringify(existingPlans));

      window.location.href = "home.html";
    });
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', savedTheme === 'dark');

  // If theme select exists (only in settings page)
  const themeSelect = document.getElementById('theme-selector');
  if (themeSelect) {
    themeSelect.value = savedTheme; // Show current theme in select
    themeSelect.addEventListener('change', (e) => {
      const theme = e.target.value;
      if (theme === 'dark') {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    });
  }

  

  const incomeDisplay = document.querySelector(".overview-total-income");
  const spendingDisplay = document.querySelector(".overview-total-spending");
  const remainingDisplay = document.querySelector(".overview-remaining");
  const plansList = document.querySelector(".overview-plans-item");

  // Fetch income from localStorage
  const savedIncome = localStorage.getItem("income");
  const income = savedIncome ? parseFloat(savedIncome) : 0;
  incomeDisplay.textContent = `₦${income.toLocaleString()}`;

  // Fetch plans from localStorage
  const savedPlans = JSON.parse(localStorage.getItem("plans")) || [];

  // Calculate total spending
  let totalSpending = 0;
  savedPlans.forEach(plan => {
    totalSpending += parseFloat(plan.amount || 0);

    // Create each plan item and add to the list
    const li = document.createElement("li");
    li.textContent = `${plan.name} - ₦${parseFloat(plan.amount).toLocaleString()}`;
    plansList.appendChild(li);
  });

  // Show total spending and remaining balance
  spendingDisplay.textContent = `₦${totalSpending.toLocaleString()}`;
  const remaining = income - totalSpending;
  remainingDisplay.textContent = `₦${remaining.toLocaleString()}`;

  if (remaining < 0) {
  const alertMsg = document.createElement("div");
  alertMsg.className = "alert-msg";
  alertMsg.innerHTML = `
    <h1>You're Over Budget!</h1>
    <p>Your spending has exceeded your income. Consider reviewing your plans.</p>
  `;

  document.body.appendChild(alertMsg); 
}

});

