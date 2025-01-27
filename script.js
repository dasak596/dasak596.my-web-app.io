// Global variable to store the user's manual selection
let selectedSection = "";

// Dictionary of cities for each section
const citiesBySection = {
    "tourist-concentrators": ["New York", "Kuala Lumpur", "Barcelona", "Miami", "La Meca", "Hong Kong", "Pekin", "Los Angeles", "Tokyo", "Sydney"],
    "cultural-tourism": ["Germany", "Cyprus", "Holland", "Morocco", "Turkey", "Austria", "Czech Republic", "Baltic states", "Croatia", "Greece", "Italy"],
    "third-world": ["Rwanda", "Cambodja", "Mexico", "Tunisia", "Argentina", "Indonesia", "Brasil", "Birmania", "Kenya", "South Africa"],
    "trip-suppliers": ["China", "Peru", "Vietnam", "Switzerland", "Malaysia", "Thailand", "Nepal", "Japan", "Canada", "Tanzania", "Zimbabwe"]
};

// Predefined angles for each city
const cityAngles = {
    "tourist-concentrators": {
        "New York": 20,
        "Kuala Lumpur": 45,
        "Barcelona": 125,
        "Miami": 150,
        "La Meca": 180,
        "Hong Kong": 215,
        "Pekin": 260,
        "Los Angeles": 315,
        "Tokyo": 340,
        "Sydney": 0
    },
    "cultural-tourism": {
        "Germany": 350,
        "Cyprus": 30,
        "Holland": 100,
        "Morocco": 125,
        "Turkey": 160,
        "Austria": 190,
        "Czech Republic": 220,
        "Baltic states": 260,
        "Croatia": 285,
        "Greece": 300,
        "Italy": 325
    },
    "third-world": {
        "Rwanda": 350,
        "Cambodja": 30,
        "Mexico": 100,
        "Tunisia": 125,
        "Argentina": 170,
        "Indonesia": 220,
        "Brasil": 260,
        "Birmania": 285,
        "Kenya": 300,
        "South Africa": 325
    },
    "trip-suppliers": {
        "China": 0,
        "Peru": 20,
        "Vietnam": 110,
        "Switzerland": 135,
        "Malaysia": 170,
        "Thailand": 200,
        "Nepal": 230,
        "Japan": 270,
        "Canada": 295,
        "Tanzania": 312,
        "Zimbabwe": 335
    }
};

// Function to handle the first selection (manual selection)
function showArrow(sectionId) {
    selectedSection = sectionId; // Store the selected section

    // Hide the main image and show the spinning arrow section
    document.getElementById("main-image").classList.add("hidden");
    document.getElementById("arrow-container").classList.remove("hidden");

    // Set the background image dynamically
    const arrowContainer = document.getElementById("arrow-container");
    switch (selectedSection) {
        case "tourist-concentrators":
            arrowContainer.style.backgroundImage = 'url(background_concentrators.jpg)';
            break;
        case "trip-suppliers":
            arrowContainer.style.backgroundImage = 'url(background_suppliers.jpg)';
            break;
        case "cultural-tourism":
            arrowContainer.style.backgroundImage = 'url(background_cultural.jpg)';
            break;
        case "third-world":
            arrowContainer.style.backgroundImage = 'url(background_third.jpg)';
            break;
        default:
            console.error("Invalid section selected for background image.");
            return;
    }

    // Debug log to confirm selection
    console.log(`Manual selection: ${selectedSection}`);

    // Prepare the spinning arrow
    adjustCanvasSize();
    drawArrow(0); // Draw the arrow at the initial position
}

// Function to adjust the canvas size based on the background size
function adjustCanvasSize() {
    const backgroundImage = document.getElementById("arrow-background");

    // Adjust the canvas size to match the background size
    const canvas = document.getElementById("arrow-canvas");
    canvas.width = backgroundImage.clientWidth; // Use background's width
    canvas.height = backgroundImage.clientHeight; // Use background's height

    console.log(`Canvas size adjusted to: ${canvas.width}x${canvas.height}`);
}

// Function to draw the arrow image with rotation
function drawArrow(rotationAngle) {
    const canvas = document.getElementById("arrow-canvas");
    const ctx = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Load the appropriate arrow image based on the selected section
    const arrowImage = new Image();
    switch (selectedSection) {
        case "tourist-concentrators":
            arrowImage.src = 'formamide.png';
            break;
        case "trip-suppliers":
            arrowImage.src = 'ethanol.png';
            break;
        case "cultural-tourism":
            arrowImage.src = 'acetaldehyde.png';
            break;
        case "third-world":
            arrowImage.src = 'methanol.png';
            break;
        default:
            console.error("Invalid section selected.");
            return;
    }

    // Ensure the image is fully loaded before drawing
    arrowImage.onload = function () {
        // Define the scaling factor if needed
        const scaleFactor = 1.5; // Adjust this value as needed
        const scaledWidth = arrowImage.width * scaleFactor;
        const scaledHeight = arrowImage.height * scaleFactor;

        // Set canvas size to be large enough to hold the image during rotation
        const imageDiameter = Math.max(scaledWidth, scaledHeight);
        canvas.width = imageDiameter * 1.0; // Make the canvas 1.5 times the image size
        canvas.height = imageDiameter * 1.0; // Adjust canvas size based on image size

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing

        ctx.save(); // Save the current canvas state
        ctx.translate(centerX, centerY); // Move the origin to the center of the canvas
        ctx.rotate(rotationAngle * Math.PI / 180); // Rotate the canvas by the given angle
        ctx.drawImage(
            arrowImage,
            -scaledWidth / 2, // Draw the image centered horizontally
            -scaledHeight / 2, // Draw the image centered vertically
            scaledWidth,      // Width of the scaled image
            scaledHeight      // Height of the scaled image
        );
        ctx.restore(); // Restore the canvas state
    };

    // Handle image loading errors
    arrowImage.onerror = function () {
        console.error("Failed to load the arrow image.");
    };
}

// Function to spin the arrow and select a random city
function spinArrow() {
    if (!selectedSection) {
        alert("No section selected! Please select a section first.");
        return;
    }

    // Get the list of cities for the selected section
    const cities = citiesBySection[selectedSection];
    if (!cities || cities.length === 0) {
        alert("No cities available for the selected section.");
        return;
    }

    // Select a random city from the list
    const randomIndex = Math.floor(Math.random() * cities.length);
    const randomCity = cities[randomIndex];

    // Retrieve the predefined angle for the selected city
    const targetAngle = cityAngles[selectedSection][randomCity];

    // Perform the spinning animation
    const rotations = 5; // Number of full rotations before stopping
    const totalRotation = rotations * 360 + targetAngle;

    const spinTime = 4000; // Total spin time in milliseconds
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;

        if (elapsed < spinTime) {
            const currentAngle = (totalRotation * (elapsed / spinTime)) % 360;
            drawArrow(currentAngle);
            requestAnimationFrame(animate);
        } else {
            drawArrow(targetAngle);
            setTimeout(() => {
                console.log(`Randomly selected city: ${randomCity}`);
                alert(`Congratulations! The arrow selected: ${randomCity}`);
            }, 200);
        }
    }

    animate();
}
