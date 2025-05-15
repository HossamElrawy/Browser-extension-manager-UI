// Fetch extension data from JSON file
const response = await fetch('./data.json');
const data = await response.json();

// Add event listeners to filter radio buttons
document.querySelectorAll('input[name="button-group"]').forEach(radio => {
    let activeData = data;
    let inActiveData = data;
    
    radio.addEventListener('change', () => {
        // Filter extensions based on selected radio button
        if (radio.id === "btn1") {
            // Show all extensions
            renderPageGrid(data);
        } else if (radio.id === "btn2") {
            // Show only active extensions
            activeData = data.filter((element) => {
                return element.isActive === true;
            });
            renderPageGrid(activeData);
        } else if (radio.id === "btn3") { 
            // Show only inactive extensions
            inActiveData = data.filter((element) => {
                return element.isActive === false;
            });
            renderPageGrid(inActiveData);
        }
    });
});

/**
 * Renders the extension cards grid based on provided data
 * @param {Array} mydata - Array of extension objects to render
 */
function renderPageGrid(mydata) {
    let pageHTML = "";
    
    // Check current theme to render appropriate HTML
    if (document.querySelector(".js-mode-button").classList.contains("light-mode-on")) {
        // Light theme HTML
        mydata.forEach(element => {
            pageHTML +=   
                    `<div class="main-con js-main-con light-mode-on">
                        <div class="logo-title-div">
                            <img src="${element.logo}" alt="${element.name} logo">
                            <div class="exp-div">
                                <p class="head-para js-head-para">
                                    ${element.name}
                                </p>
                                <p class="exp-para js-exp-para">
                                    ${element.description}
                                </p>
                            </div>
                        </div>
                        <div class="remove-div">
                            <button class="remove-button js-remove-button">
                                Remove
                            </button>
                            <label class="toggle-button">
                                <input type="checkbox" class="js-checkbox" hidden ${element.isActive ? "Checked" : ""}>
                                <span class="slider" tabindex="0"></span>
                            </label>
                        </div>
                    </div>`;
        });
    } else {
        // Dark theme HTML
        mydata.forEach(element => {
            pageHTML +=   
                    `<div class="main-con js-main-con dark-main-con">
                        <div class="logo-title-div">
                            <img src="${element.logo}" alt="${element.name} logo">
                            <div class="exp-div">
                                <p class="head-para js-head-para dark-head-para">
                                    ${element.name}
                                </p>
                                <p class="exp-para js-exp-para dark-exp-para">
                                    ${element.description}
                                </p>
                            </div>
                        </div>
                        <div class="remove-div">
                            <button class="remove-button js-remove-button dark-remove-button">
                                Remove
                            </button>
                            <label class="toggle-button">
                                <input type="checkbox" class="js-checkbox dark-input" hidden ${element.isActive ? "Checked" : ""}>
                                <span class="slider" tabindex="0"></span>
                            </label>
                        </div>
                    </div>`;
        });
    }
    
    // Insert generated HTML into the grid container
    document.querySelector(".js-main-grid").innerHTML = pageHTML;
}

// Add click event listener to theme toggle button
document.querySelector(".js-mode-button").addEventListener("click", () => {
    switchModes();
});

/**
 * Toggles between light and dark themes
 */
function switchModes() {
    if (document.querySelector(".js-mode-button").classList.contains("light-mode-on")) {
        // Switch to dark mode
        document.querySelector(".js-mode-button").classList.remove("light-mode-on");
        document.querySelector("body").classList.add("dark-body");
        document.querySelector(".js-header-div").classList.add("dark-header-div");
        document.querySelector(".my-path-1").classList.add("my-dark-path-1");
        document.querySelector(".my-path-2").classList.add("my-dark-path-2");
        document.querySelector(".js-moon-logo").classList.add("sun-logo");
        document.querySelector(".js-sun-logo").classList.add("not-hidden");
        document.querySelector(".js-mode-button").classList.add("dark-mode-button");
        document.querySelector(".js-name-para").classList.add("dark-name-para");
        document.querySelector(".js-button-group").classList.add("dark-button-group");
        
        // Update all extension cards to dark theme
        document.querySelectorAll(".js-main-grid .js-main-con").forEach(div => {
            div.classList.add("dark-main-con");
        });
        document.querySelectorAll(".js-main-grid .js-head-para").forEach(div => {
            div.classList.add("dark-head-para");
        });
        document.querySelectorAll(".js-main-grid .js-exp-para").forEach(div => {
            div.classList.add("dark-exp-para");
        });
        document.querySelectorAll(".js-main-grid .js-remove-button").forEach(div => {
            div.classList.add("dark-remove-button");
        });
        document.querySelectorAll(".js-main-grid .js-checkbox").forEach(div => {
            div.classList.add("dark-input");
        });
    } else {
        // Switch to light mode
        document.querySelector(".js-mode-button").classList.add("light-mode-on");
        document.querySelector("body").classList.remove("dark-body");
        document.querySelector(".js-header-div").classList.remove("dark-header-div");
        document.querySelector(".my-path-1").classList.remove("my-dark-path-1");
        document.querySelector(".my-path-2").classList.remove("my-dark-path-2");
        document.querySelector(".js-moon-logo").classList.remove("sun-logo");
        document.querySelector(".js-sun-logo").classList.remove("not-hidden");
        document.querySelector(".js-mode-button").classList.remove("dark-mode-button");
        document.querySelector(".js-name-para").classList.remove("dark-name-para");
        document.querySelector(".js-button-group").classList.remove("dark-button-group");
        
        // Update all extension cards to light theme
        document.querySelectorAll(".js-main-grid .js-main-con").forEach(div => {
            div.classList.remove("dark-main-con");
        });
        document.querySelectorAll(".js-main-grid .js-head-para").forEach(div => {
            div.classList.remove("dark-head-para");
        });
        document.querySelectorAll(".js-main-grid .js-exp-para").forEach(div => {
            div.classList.remove("dark-exp-para");
        });
        document.querySelectorAll(".js-main-grid .js-remove-button").forEach(div => {
            div.classList.remove("dark-remove-button");
        });
        document.querySelectorAll(".js-main-grid .js-checkbox").forEach(div => {
            div.classList.remove("dark-input");
        });
    }
} 

// Initial render of the page with all extensions
renderPageGrid(data);