# QuickBooking - QR Code Appointment Booking

A mobile-responsive web application for booking doctor appointments via QR code scanning. No registration required - users can book appointments by simply filling in basic details.

## 🌟 Features

- **QR Code Based Booking**: Scan clinic QR code to start booking process
- **No Registration Required**: Book appointments without creating an account
- **Guest Booking**: Just provide basic details (name, phone, age, gender, city)
- **Mobile-First Design**: Fully responsive across all device sizes
- **Real-time Slot Availability**: View and select available appointment slots
- **Date Selection**: Choose specific dates or view next 3 days
- **Instant Confirmation**: Get immediate booking confirmation
- **App Download Promotion**: Encourage users to download the full app for management features

## 🚀 Live Demo

**GitHub Pages URL**: `https://[your-username].github.io/QuickBooking/`

(Update this with your actual GitHub Pages URL after deployment)

## 📋 How It Works

1. **Scan QR Code**: Clinic provides QR code with doctor and workplace information
2. **Enter Details**: Fill in basic information (name, phone, age, gender, city)
3. **View Clinic Info**: See doctor and clinic details
4. **Select Date**: Choose appointment date or use default next 3 days
5. **Pick Slot**: Select from available time slots
6. **Confirm Booking**: Review and confirm appointment
7. **Success**: Get confirmation with option to download full app

## 🛠️ Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Design**: Mobile-first responsive design
- **Deployment**: GitHub Pages
- **API Integration**: RESTful API calls

## 📱 QR Code Format

The QR code should contain a URL with the following format:

```
https://[your-domain]/QuickBooking/?doctorId=123&workplaceId=456
```

Parameters:
- `doctorId`: The unique identifier of the doctor
- `workplaceId`: The unique identifier of the clinic/workplace

## ⚙️ Configuration

### API Endpoints

Update the API base URL in `js/config.js`:

```javascript
const API_CONFIG = {
    BASE_URL: 'https://your-api-domain.com/api', // Update this
    // ... rest of config
};
```

### App Download Links

Update app download links in `js/config.js`:

```javascript
const APP_DOWNLOAD_LINKS = {
    DEFAULT: 'https://yourdomain.com/download',
    ANDROID: 'https://play.google.com/store/apps/details?id=com.quickbooking',
    IOS: 'https://apps.apple.com/app/quickbooking/id123456789'
};
```

## 📦 Project Structure

```
QuickBooking/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Responsive styles
├── js/
│   ├── config.js          # Configuration (API URLs, etc.)
│   ├── apiService.js      # API service layer
│   └── app.js             # Main application logic
└── README.md              # This file
```

## 🚀 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository named `QuickBooking`
2. Don't initialize with README (we already have one)

### Step 2: Push Code to GitHub

```bash
# Navigate to your project folder
cd c:\Users\DELL\QuickBooking

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - QuickBooking web app"

# Add remote repository (replace with your GitHub username)
git remote add origin https://github.com/[YOUR-USERNAME]/QuickBooking.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait a few minutes for deployment
7. Your site will be available at: `https://[YOUR-USERNAME].github.io/QuickBooking/`

## 🔧 Local Development

### Running Locally

Since this is a static website with API calls, you need to run a local server to avoid CORS issues:

**Option 1: Python HTTP Server**
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

**Option 2: Node.js HTTP Server**
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server

# Then visit: http://localhost:8080
```

**Option 3: VS Code Live Server Extension**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Testing QR Code Flow

To test locally with QR parameters:
```
http://localhost:8000/?doctorId=1&workplaceId=1
```

## 📱 API Requirements

The application expects the following API endpoints:

### 1. Get Doctor Profile
```
GET /api/doctor/profile/{doctorId}
```

### 2. Get Workplace Information
```
GET /api/doctor/workplaces/{workplaceId}?doctorId={doctorId}
```

### 3. Get Available Slots
```
GET /api/slots/available?doctorId={doctorId}&workplaceId={workplaceId}&date={YYYY-MM-DD}
```

### 4. Book Guest Appointment
```
POST /api/user/appointments/guest
Body: {
    guestName, guestPhone, guestEmail, guestCity, guestAge, guestGender,
    doctorId, workplaceId, requestedTime, slot, notes
}
```

## 🎨 Customization

### Colors

Update CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #3498db;      /* Main brand color */
    --secondary-color: #27ae60;    /* Success/confirm color */
    --danger-color: #e74c3c;       /* Error color */
    /* ... more colors */
}
```

### Branding

1. Update app title in `index.html`:
   ```html
   <h1 class="app-title">🏥 Your Clinic Name</h1>
   ```

2. Update page title:
   ```html
   <title>Your Clinic - Book Appointment</title>
   ```

## 🔒 Security Considerations

- ✅ Form validation on client-side
- ✅ Phone number format validation
- ✅ Age range validation
- ⚠️ API should implement server-side validation
- ⚠️ Implement rate limiting on API endpoints
- ⚠️ Sanitize user inputs on backend

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 🐛 Troubleshooting

### QR Code Not Working
- Verify QR code contains correct URL format
- Check that `doctorId` and `workplaceId` parameters are present
- Ensure values are valid integers

### API Errors
- Update `BASE_URL` in `js/config.js`
- Check browser console for detailed error messages
- Verify CORS headers are set on your API server

### Slots Not Loading
- Verify API endpoint returns data in expected format
- Check network tab in browser dev tools
- Ensure date format is correct (YYYY-MM-DD)

## 📄 License

This project is licensed for use by [Your Organization Name].

## 👥 Support

For issues or questions:
- 📧 Email: support@yourdomain.com
- 🌐 Website: https://yourdomain.com
- 📱 Phone: +XX-XXXXXXXXXX

## 🔄 Updates

### Version 1.0.0 (December 2025)
- Initial release
- Guest booking functionality
- Mobile-responsive design
- QR code integration
- Date and slot selection
- App download promotion

---

**Note**: Remember to update all placeholder URLs, email addresses, and configuration values before deploying to production!
