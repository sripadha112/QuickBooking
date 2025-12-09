/**
 * API Service Layer
 * Handles all API communications
 */

class APIService {
    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
    }

    /**
     * Generic fetch wrapper with error handling
     */
    async fetchAPI(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors', // Enable CORS
            ...options
        };

        try {
            console.log('🌐 API Request:', url, defaultOptions);
            const response = await fetch(url, defaultOptions);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ API Response:', data);
            return data;
        } catch (error) {
            console.error('❌ API Error:', error);
            console.error('❌ Full URL:', url);
            if (error.message === 'Failed to fetch') {
                throw new Error(`Cannot connect to API server at ${this.baseURL}. Please check:\n1. API server is running\n2. CORS is enabled on the server\n3. You're on the same network`);
            }
            throw error;
        }
    }

    /**
     * Get doctor profile by ID
     */
    async getDoctorProfile(doctorId) {
        try {
            return await this.fetchAPI(`${API_CONFIG.ENDPOINTS.DOCTOR_PROFILE}/${doctorId}`);
        } catch (error) {
            throw new Error('Failed to fetch doctor profile: ' + error.message);
        }
    }

    /**
     * Get workplace information
     */
    async getWorkplaceInfo(doctorId, workplaceId) {
        try {
            return await this.fetchAPI(`${API_CONFIG.ENDPOINTS.WORKPLACE_INFO}/${workplaceId}?doctorId=${doctorId}`);
        } catch (error) {
            throw new Error('Failed to fetch workplace information: ' + error.message);
        }
    }

    /**
     * Get available slots for a workplace (next 3 days)
     * @param {number} doctorId - Doctor ID
     * @param {number} workplaceId - Workplace ID
     */
    async getAvailableSlots(doctorId, workplaceId) {
        try {
            const endpoint = `${API_CONFIG.ENDPOINTS.AVAILABLE_SLOTS}?doctorId=${doctorId}&workplaceId=${workplaceId}`;
            
            console.log('📡 Fetching slots from:', endpoint);
            const response = await this.fetchAPI(endpoint);
            console.log('📦 Raw API response:', response);
            console.log('📦 Response type:', typeof response);
            console.log('📦 Is array?:', Array.isArray(response));
            
            return response;
        } catch (error) {
            throw new Error('Failed to fetch available slots: ' + error.message);
        }
    }

    /**
     * Book appointment for guest user (no registration required)
     * @param {Object} bookingData - Booking details
     */
    async bookGuestAppointment(bookingData) {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.BOOK_APPOINTMENT;
            const response = await this.fetchAPI(endpoint, {
                method: 'POST',
                body: JSON.stringify(bookingData)
            });
            return response;
        } catch (error) {
            throw new Error('Failed to book appointment: ' + error.message);
        }
    }

    /**
     * Alternative: Book appointment via user endpoint (if guest endpoint not available)
     * This creates a temporary user and books appointment
     */
    async bookAppointmentWithUserCreation(userDetails, appointmentData) {
        try {
            // First create a guest/temporary user
            const createUserEndpoint = '/user/register-guest';
            const userResponse = await this.fetchAPI(createUserEndpoint, {
                method: 'POST',
                body: JSON.stringify({
                    fullName: userDetails.name,
                    phoneNumber: userDetails.phone,
                    email: userDetails.email || '',
                    city: userDetails.city,
                    age: userDetails.age,
                    gender: userDetails.gender,
                    isGuest: true
                })
            });

            const userId = userResponse.userId || userResponse.id;

            // Then book appointment with the created user ID
            const bookingEndpoint = `/user/${userId}/appointments`;
            const bookingResponse = await this.fetchAPI(bookingEndpoint, {
                method: 'POST',
                body: JSON.stringify({
                    doctorId: appointmentData.doctorId,
                    workplaceId: appointmentData.workplaceId,
                    requestedTime: appointmentData.requestedTime,
                    slot: appointmentData.slot,
                    notes: userDetails.notes || 'Guest booking via QR code'
                })
            });

            return bookingResponse;
        } catch (error) {
            throw new Error('Failed to book appointment with user creation: ' + error.message);
        }
    }

    /**
     * Simplified booking method that uses the standard user booking endpoint
     * For guest users, we'll use a temporary userId (you can modify this logic)
     */
    async bookAppointment(userDetails, appointmentData) {
        try {
            // Use a temporary userId (3) for guest bookings
            // You can modify this to create a user first if needed
            const userId = 3; // Temporary user ID for testing
            
            // Prepare booking data according to your API specification
            const bookingData = {
                doctorId: appointmentData.doctorId,
                workplaceId: appointmentData.workplaceId,
                requestedTime: appointmentData.requestedTime,
                slot: appointmentData.slot,
                notes: appointmentData.notes || `Guest: ${userDetails.name}, Phone: ${userDetails.phone}, Age: ${userDetails.age}, Gender: ${userDetails.gender}, City: ${userDetails.city}`
            };

            console.log('📝 Booking appointment with data:', bookingData);

            // Use the user-specific booking endpoint
            const endpoint = `/user/${userId}/appointments/book`;
            const response = await this.fetchAPI(endpoint, {
                method: 'POST',
                body: JSON.stringify(bookingData)
            });

            return response;
        } catch (error) {
            throw new Error('Failed to book appointment: ' + error.message);
        }
    }
}

// Create singleton instance
const apiService = new APIService();
