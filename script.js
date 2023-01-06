/*
    Flávio Pereira
    https://github.com/VIRUXE
*/

/*
    We load a random hero image. (50% chance)
    As we add or remove hero images we adjust the array below, with the image "id". Example: 'hero(id).webp'
*/
const randomHeroChance = Math.random(1, 100) * 100;
if (randomHeroChance <= 50) { // We match the chance to load a random hero image
	const heroImages = [1, 2, 3, 4].map((i) => `./imagens/hero${i}.webp`);

	// Select a random image from the array
	const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];
	// Make sure it actually exists before trying to use it. If not, it will just keep the default, hero.webp
	let image = new Image();
	image.src = randomImage;
	image.onload = () => {
        document.getElementById("hero").style.backgroundImage = `url(${randomImage})`;
	};
} else { // Load the default hero image and set the background position
    document.getElementById("hero").style.backgroundImage = `url(./imagens/hero.webp)`;
}