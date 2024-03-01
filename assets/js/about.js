var toggle = document.getElementById('container-about-toggle');
var toggleContainer = document.getElementById('toggle-container-about-toggle');
var toggleNumber;

var aboutContainer = document.getElementById('about-selection');
var cvContainer = document.getElementById('cv-selection');

toggle.addEventListener('click', function() {
	toggleNumber = !toggleNumber;
	if (toggleNumber) {
		toggleContainer.style.clipPath = 'inset(0 0 0 50%)';
        toggleContainer.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');

        aboutContainer.classList.remove('active');
        cvContainer.classList.add('active');
	} else {
		toggleContainer.style.clipPath = 'inset(0 50% 0 0)';
        toggleContainer.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        
        aboutContainer.classList.add('active');
        cvContainer.classList.remove('active');
	}
});

toggle.addEventListener('theme-changed', function() {
    toggleContainer.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    document.getElementById('toggle-container-theme-toggle').style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
});
