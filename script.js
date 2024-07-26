// Generate a random verification code
function generateVerificationCode() {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdeghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
  var code = "";
  for (var i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Generate a zigzag line
function generateZigzag(ctx, width, height) {
  var zigzagPoints = [];
  for (var i = 0; i < 7; i++) {
    zigzagPoints.push({ x: i * 25, y: Math.random() * height });
  }
  ctx.beginPath();
  ctx.moveTo(zigzagPoints[0].x, zigzagPoints[0].y);
  for (var i = 1; i < zigzagPoints.length; i++) {
    ctx.lineTo(zigzagPoints[i].x, zigzagPoints[i].y);
  }
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Generate a wavy line
function generateWavyLine(ctx, width, height) {
  var wavyPoints = [];
  for (var i = 0; i < 10; i++) {
    wavyPoints.push({ x: i * 20, y: Math.sin(i * 0.5) * 10 + height / 2 });
  }
  ctx.beginPath();
  ctx.moveTo(wavyPoints[0].x, wavyPoints[0].y);
  for (var i = 1; i < wavyPoints.length; i++) {
    ctx.lineTo(wavyPoints[i].x, wavyPoints[i].y);
  }
  ctx.strokeStyle = "#666";
  ctx.lineWidth = 1;
  ctx.stroke();
}

// Generate a noisy background
function generateNoise(ctx, width, height) {
  for (var i = 0; i < 100; i++) {
    ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
    ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
  }
}

// Generate an image with the verification code, zigzag line, wavy line, and noisy background
function generateImage(code) {
  var canvas = document.createElement("canvas");
  canvas.width = 250;
  canvas.height = 60;
  var ctx = canvas.getContext("2d");
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#333";
  
  // Generate a noisy background
  generateNoise(ctx, canvas.width, canvas.height);
  
  // Draw the verification code with a random font style and color
  ctx.font = `${Math.random() * 10 + 18}px Arial`;
  ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
  ctx.fillText(code, canvas.width / 2, canvas.height / 2);
  
  generateZigzag(ctx, canvas.width, canvas.height);
  generateWavyLine(ctx, canvas.width, canvas.height);
  
  var img = document.createElement("img");
  img.src = canvas.toDataURL();
  document.getElementById("captcha-image").appendChild(img);
  
  return code;
}

// Store the verification code in a variable
var verificationCode = generateImage(generateVerificationCode());
document.getElementById("captcha").setAttribute("placeholder", "Enter the code");

// Verify the captcha
function verifyCaptcha() {
  var captchaInput = document.getElementById("captcha").value.toUpperCase();
  if (captchaInput === verificationCode.toUpperCase()) {
    alert("Captcha verified successfully!");
    document.getElementById("next-btn").style.display = "block";
  } else {
    alert("Invalid captcha. Please try again.");
  }
}

// Add event listener to the form submit button
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  verifyCaptcha();
});

// Add event listener to the next button
document.getElementById("next-btn").addEventListener("click", function() {
  window.location.href = "https://youtube.com/shorts/SXHMnicI6Pg?si=yXnrxzsGDkQzW9o9"; // Replace with the desired URL
});
