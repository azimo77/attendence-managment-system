// ================================
// Get HTML Elements
// ================================
const studentNameInput = document.getElementById("studentName");
const statusSelect = document.getElementById("status");
const addBtn = document.getElementById("addBtn");
const message = document.getElementById("message");
const attendanceList = document.getElementById("attendanceList");
const presentCount = document.getElementById("presentCount");
const absentCount = document.getElementById("absentCount");

// ================================
// Data Storage
// ================================
let attendanceData = [];

// ================================
// Button Event
// ================================
addBtn.addEventListener("click", function () {
    const studentName = studentNameInput.value.trim();
    const status = statusSelect.value;

    // ================================
    // Validation: Empty input
    // ================================
    if (studentName === "") {
        showMessage("Student name is required!", "error");
        return;
    }

    // ================================
    // Validation: Only letters & spaces
    // ================================
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(studentName)) {
        showMessage("Name must contain letters only!", "error");
        return;
    }

    // ================================
    // Validation: Full name (at least 3 words)
    // ================================
    const nameParts = studentName.split(" ").filter(word => word !== "");
    if (nameParts.length < 3) {
        showMessage("Please write full name (at least 3 names)!", "error");
        return;
    }

    // ================================
    // Validation: Attendance status
    // ================================
    if (status === "") {
        showMessage("Please select attendance status!", "error");
        return;
    }

    // ================================
    // Validation: Duplicate name
    // ================================
    const exists = attendanceData.some(
        student => student.name.toLowerCase() === studentName.toLowerCase()
    );

    if (exists) {
        showMessage("This student is already added!", "error");
        return;
    }

    // ================================
    // Create Student Object
    // ================================
    const student = {
        name: studentName,
        status: status
    };

    attendanceData.push(student);

    // ================================
    // Update UI
    // ================================
    updateAttendanceList();
    updateSummary();

    showMessage("Attendance added successfully!", "success");

    studentNameInput.value = "";
    statusSelect.value = "";
});

// ================================
// Functions
// ================================

// Update attendance list
function updateAttendanceList() {
    attendanceList.innerHTML = "";

    attendanceData.forEach(function (student, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            ${student.name} - ${student.status}
            <button onclick="deleteStudent(${index})">Delete</button>
        `;
        attendanceList.appendChild(li);
    });
}

// Delete student
function deleteStudent(index) {
    attendanceData.splice(index, 1);
    updateAttendanceList();
    updateSummary();
    showMessage("Attendance deleted!", "success");
}

// Update summary
function updateSummary() {
    let present = 0;
    let absent = 0;

    attendanceData.forEach(function (student) {
        if (student.status === "Present") {
            present++;
        } else {
            absent++;
        }
    });

    presentCount.textContent = present;
    absentCount.textContent = absent;
}

// Show message
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;

    setTimeout(function () {
        message.textContent = "";
        message.className = "";
    }, 3000);
}