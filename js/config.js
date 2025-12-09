// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://192.168.1.74:8080/api', // Your actual API URL
    ENDPOINTS: {
        DOCTOR_PROFILE: '/doctor/profile',
        WORKPLACE_INFO: '/doctor/workplaces',
        AVAILABLE_SLOTS: '/user/available-slots', // Updated endpoint
        BOOK_APPOINTMENT: '/user/{userId}/appointments/book' // Updated endpoint
    }
};

// App Download Links (Update these with actual links)
const APP_DOWNLOAD_LINKS = {
    DEFAULT: 'https://yourdomain.com/download', // Update with actual link
    ANDROID: 'https://play.google.com/store/apps/details?id=com.quickbooking',
    IOS: 'https://apps.apple.com/app/quickbooking/id123456789'
};

// Date formatting options
const DATE_FORMAT_OPTIONS = {
    SHORT: { year: 'numeric', month: 'short', day: 'numeric' },
    LONG: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    MEDIUM: { month: 'short', day: 'numeric', year: 'numeric' }
};

// Validation patterns
const VALIDATION = {
    PHONE_PATTERN: /^[0-9]{10}$/,
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    NAME_MIN_LENGTH: 2,
    AGE_MIN: 1,
    AGE_MAX: 120
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, APP_DOWNLOAD_LINKS, DATE_FORMAT_OPTIONS, VALIDATION };
}
