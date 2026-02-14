// storage.js - ES Module for Local Storage Management

/**
 * Save data to local storage
 * @param {string} key - Storage key
 * @param {*} data - Data to store (will be JSON stringified)
 */
export function saveToStorage(key, data) {
    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
        console.log(`Data saved to storage with key: ${key}`);
        return true;
    } catch (error) {
        console.error('Error saving to storage:', error);
        return false;
    }
}

/**
 * Retrieve data from local storage
 * @param {string} key - Storage key
 * @returns {*} Parsed data or null if not found
 */
export function getFromStorage(key) {
    try {
        const jsonData = localStorage.getItem(key);
        if (jsonData === null) {
            return null;
        }
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error retrieving from storage:', error);
        return null;
    }
}

/**
 * Remove data from local storage
 * @param {string} key - Storage key
 */
export function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        console.log(`Data removed from storage with key: ${key}`);
        return true;
    } catch (error) {
        console.error('Error removing from storage:', error);
        return false;
    }
}

/**
 * Clear all data from local storage
 */
export function clearStorage() {
    try {
        localStorage.clear();
        console.log('All storage cleared');
        return true;
    } catch (error) {
        console.error('Error clearing storage:', error);
        return false;
    }
}

/**
 * Check if a key exists in storage
 * @param {string} key - Storage key
 * @returns {boolean}
 */
export function hasKey(key) {
    return localStorage.getItem(key) !== null;
}

/**
 * Get all keys from local storage
 * @returns {string[]} Array of storage keys
 */
export function getAllKeys() {
    return Object.keys(localStorage);
}

/**
 * Save user preferences
 * @param {Object} preferences - User preference object
 */
export function saveUserPreferences(preferences) {
    return saveToStorage('userPreferences', preferences);
}

/**
 * Get user preferences
 * @returns {Object|null} User preferences or default object
 */
export function getUserPreferences() {
    const defaultPreferences = {
        theme: 'light',
        notifications: true,
        language: 'en'
    };
    
    const stored = getFromStorage('userPreferences');
    return stored || defaultPreferences;
}

/**
 * Save form data for later retrieval (useful for multi-step forms)
 * @param {string} formName - Name of the form
 * @param {Object} formData - Form data object
 */
export function saveFormData(formName, formData) {
    const key = `formData_${formName}`;
    return saveToStorage(key, formData);
}

/**
 * Get saved form data
 * @param {string} formName - Name of the form
 * @returns {Object|null} Saved form data or null
 */
export function getFormData(formName) {
    const key = `formData_${formName}`;
    return getFromStorage(key);
}

/**
 * Clear saved form data
 * @param {string} formName - Name of the form
 */
export function clearFormData(formName) {
    const key = `formData_${formName}`;
    return removeFromStorage(key);
}
