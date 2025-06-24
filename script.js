// Listen for postMessage events from external sources
window.addEventListener("message", function (event) {
  // Optional: Add origin checking for security
  // if (event.origin !== 'https://trusted-domain.com') return;

  try {
    // Check if the received data contains HTML content
    if (event.data && typeof event.data === "string") {
      // Replace the entire document with the received HTML
      document.open();
      document.write(event.data);
      document.close();
    } else if (event.data && event.data.html) {
      // Alternative: if data is an object with html property
      document.open();
      document.write(event.data.html);
      document.close();
    }
  } catch (error) {
    console.error("Error processing postMessage:", error);
  }
});

// Optional: Send a ready message to parent window (if in iframe)
if (window.parent !== window) {
  window.parent.postMessage({ type: "ready" }, "*");
}
