import { useEffect, useRef } from 'react';

const useBackgroundTasks = () => {
  const tasksRef = useRef([]);
  const isProcessingRef = useRef(false);

  const requestIdleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
  const cancelIdleCallback = window.cancelIdleCallback || clearTimeout;

  const addTask = (task, priority = 'normal') => {
    tasksRef.current.push({
      id: Date.now() + Math.random(),
      task,
      priority,
      timestamp: Date.now()
    });
    
    if (!isProcessingRef.current) {
      processTasks();
    }
  };

  const processTasks = () => {
    if (tasksRef.current.length === 0) {
      isProcessingRef.current = false;
      return;
    }

    isProcessingRef.current = true;

    const processTasksInIdle = (deadline) => {
      // Sort tasks by priority (high -> normal -> low)
      const priorityOrder = { high: 3, normal: 2, low: 1 };
      tasksRef.current.sort((a, b) => 
        priorityOrder[b.priority] - priorityOrder[a.priority]
      );

      while (tasksRef.current.length > 0 && deadline.timeRemaining() > 0) {
        const { task } = tasksRef.current.shift();
        
        try {
          if (typeof task === 'function') {
            task();
          } else if (task && typeof task.then === 'function') {
            // Handle async tasks
            task.catch(console.error);
          }
        } catch (error) {
          console.error('Background task error:', error);
        }
      }

      if (tasksRef.current.length > 0) {
        requestIdleCallback(processTasksInIdle);
      } else {
        isProcessingRef.current = false;
      }
    };

    requestIdleCallback(processTasksInIdle);
  };

  // Preload images in background
  const preloadImages = (imageUrls, priority = 'low') => {
    imageUrls.forEach(url => {
      addTask(() => {
        const img = new Image();
        img.src = url;
        // Optionally cache the image
        img.onload = () => {
          // Image loaded successfully
          console.log(`Preloaded: ${url}`);
        };
        img.onerror = () => {
          console.warn(`Failed to preload: ${url}`);
        };
      }, priority);
    });
  };

  // Process data in background
  const processData = (data, processor, priority = 'normal') => {
    return new Promise((resolve, reject) => {
      addTask(() => {
        try {
          const result = processor(data);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, priority);
    });
  };

  // Cache API responses
  const cacheApiResponse = (url, response, priority = 'low') => {
    addTask(() => {
      try {
        const cache = new Map();
        cache.set(url, {
          data: response,
          timestamp: Date.now(),
          ttl: 5 * 60 * 1000 // 5 minutes
        });
        
        // Store in sessionStorage for persistence
        sessionStorage.setItem(`cache_${url}`, JSON.stringify({
          data: response,
          timestamp: Date.now(),
          ttl: 5 * 60 * 1000
        }));
      } catch (error) {
        console.warn('Failed to cache response:', error);
      }
    }, priority);
  };

  // Clean up expired cache entries
  const cleanupCache = () => {
    addTask(() => {
      const now = Date.now();
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key?.startsWith('cache_')) {
          try {
            const cached = JSON.parse(sessionStorage.getItem(key));
            if (now - cached.timestamp > cached.ttl) {
              sessionStorage.removeItem(key);
            }
          } catch (error) {
            sessionStorage.removeItem(key);
          }
        }
      }
    }, 'low');
  };

  useEffect(() => {
    // Periodic cleanup
    const cleanup = setInterval(cleanupCache, 60000); // Every minute
    
    return () => {
      clearInterval(cleanup);
      tasksRef.current = [];
    };
  }, []);

  return {
    addTask,
    preloadImages,
    processData,
    cacheApiResponse,
    cleanupCache
  };
};

export default useBackgroundTasks;