const storageKey = 'theme-preference'
var toggleTheme = document.getElementById('container-theme-toggle');
var toggleNumberTheme;

const onClick = () => {
    var toggleContainerAbout = document.getElementById('toggle-container-about-toggle');

    var toggleContainerTheme = document.getElementById('toggle-container-theme-toggle');
	toggleNumberTheme = !toggleNumberTheme;

    // flip current value
    theme.value = theme.value === 'light'
        ? 'dark'
        : 'light'

    setPreference()

	if (toggleNumberTheme) {
		toggleContainerTheme.style.clipPath = 'inset(0 0 0 50%)';
        toggleContainerTheme.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        if (toggleContainerAbout) {
            toggleContainerAbout.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        }
	} else {
		toggleContainerTheme.style.clipPath = 'inset(0 50% 0 0)';
        toggleContainerTheme.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        if (toggleContainerAbout) {
            toggleContainerAbout.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        }
	}
}

const getColorPreference = () => {
    if (localStorage.getItem(storageKey))
        return localStorage.getItem(storageKey)
    else
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
}

const setPreference = () => {
    localStorage.setItem(storageKey, theme.value)
    reflectPreference()
}

const reflectPreference = () => {
    document.firstElementChild
        .setAttribute('data-theme', theme.value)

    document
        .querySelector('#theme-toggle')
        ?.setAttribute('aria-label', theme.value)
}

const theme = {
    value: getColorPreference(),
}

// set early so no page flashes / CSS is made aware
reflectPreference()

window.onload = () => {
    // set on load so screen readers can see latest value on the button
    reflectPreference()

    // now this script can find and listen for clicks on the control
    document
        .querySelector('#container-theme-toggle')
        .addEventListener('click', onClick)

    const path = window.location.pathname;
    const activeItem = document.querySelector(`.nav-item[href="${path}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }

    var toggle = document.getElementById('toggle-container-theme-toggle');
    if (theme.value === 'dark') {
        toggle.style.clipPath = 'inset(0 0 0 50%)';
        toggle.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        toggleNumberTheme = true;
    } else {
        toggle.style.clipPath = 'inset(0 50% 0 0)';
        toggle.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        toggleNumberTheme = false;
    }
}

// sync with system changes
window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({matches:isDark}) => {
        theme.value = isDark ? 'dark' : 'light'
        setPreference()
    })

function changePreview(toChange) {
    const previewItems = document.querySelectorAll('.preview-item');
    previewItems.forEach((item) => {
        item.classList.remove('active');
    });

    const previewItem = document.getElementById(toChange);
    previewItem.classList.add('active');

    const previewIcons = document.querySelectorAll('.preview-icon');
    previewIcons.forEach((icon) => {
        icon.classList.remove('active');
    });

    const previewIcon = document.querySelectorAll('.preview-icon.' + toChange);
    previewIcon.forEach((icon) => {
        icon.classList.add('active');
    });
}

function downloadCV() {
    const link = document.createElement('a');
    link.href = '/assets/cv.pdf';
    link.download = 'cv.pdf';
    link.click();
}
