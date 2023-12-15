
         function redirectToJob(url) {
            // Use JavaScript to open the specified URL in a new window
            var newWindow = window.open(url, '_blank');
            if (newWindow) {
                newWindow.focus(); // Ensure the new window gets focus
            } else {
                // Handle cases where the pop-up was blocked
                alert('Pop-up blocked. Please check your browser settings.');
            }
        }
