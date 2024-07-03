import { Howl } from "howler";

export const playSound = (
  soundPath,
  duration = null,
  fadeDuration = 0,
  loop = false
) => {
  console.log(`Initializing sound with path: ${soundPath}`);
  const sound = new Howl({
    src: [soundPath],
    html5: true,
    loop: loop, // Use the loop parameter
  });

  // Play the sound
  const soundId = sound.play();
  console.log(`Playing sound with ID: ${soundId}`);

  let timeoutId;
  if (duration) {
    // Set a timeout to fade out and stop the sound after the specified duration
    timeoutId = setTimeout(() => {
      if (fadeDuration > 0) {
        // Fade the sound over the specified fade duration
        console.log(`Fading sound out over ${fadeDuration}ms`);
        sound.fade(1, 0, fadeDuration, soundId);

        // Stop the sound after the fade-out is complete
        setTimeout(() => {
          console.log("Stopping sound after fade-out");
          sound.stop(soundId);
        }, fadeDuration);
      } else {
        // Stop the sound immediately if no fade duration is specified
        console.log("Stopping sound immediately");
        sound.stop(soundId);
      }
    }, duration - fadeDuration);
  }

  // Return a function to stop the sound and clear the timeout
  return () => {
    clearTimeout(timeoutId);
    sound.stop(soundId);
    console.log("Sound stopped and timeout cleared");
  };
};
