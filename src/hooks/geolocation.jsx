import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Get city name using reverse geocoding
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      
      const data = await response.json();
      
      setLocation({
        latitude,
        longitude,
        city: data.city || data.locality || 'Unknown',
        country: data.countryName || 'Unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        localTime: new Date().toLocaleString()
      });
    } catch (err) {
      setError(err.message || 'Failed to get location');
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getDistanceFromPune = () => {
    if (!location) return null;
    
    // Pune coordinates
    const puneLatitude = 18.5204;
    const puneLongitude = 73.8567;
    
    return calculateDistance(
      location.latitude,
      location.longitude,
      puneLatitude,
      puneLongitude
    );
  };

  useEffect(() => {
    // Auto-detect location on mount
    getLocation();
  }, []);

  return {
    location,
    loading,
    error,
    getLocation,
    getDistanceFromPune
  };
};

export default useGeolocation;