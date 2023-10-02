document
  .getElementById("name-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // const nameInput = document.getElementById("name");
    const onderwerpInput = document.getElementById("onderwerp");
    const stijlInput = document.getElementById("stijl");
    const outputContainer = document.getElementById("output");
    const loadingSpinner = document.getElementById("loading-spinner");

    const name = document.querySelector("#name").value;
    const onderwerp = onderwerpInput.value;
    const stijl = stijlInput.value;

    // Show the loading spinner
    loadingSpinner.style.display = "block";

    // Generate a fairy tale using the server-side OpenAI API
    try {
      const response = await fetch("/generate-fairy-tale", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `name=${encodeURIComponent(name)}&onderwerp=${encodeURIComponent(
          onderwerp
        )}&stijl=${encodeURIComponent(stijl)}`,
      });

      if (response.ok) {
        const story = await response.text();
        outputContainer.innerHTML = story;
      } else {
        console.error("Error generating fairy tale:", response.statusText);
        outputContainer.innerHTML = "Error generating fairy tale";
      }
    } catch (error) {
      console.error("Error generating fairy tale:", error);
      outputContainer.innerHTML = "Error generating fairy tale";
    } finally {
      // Hide the loading spinner after generating the story
      loadingSpinner.style.display = "none";
      // Show the story
      outputContainer.style.display = "block";
    }
  });
