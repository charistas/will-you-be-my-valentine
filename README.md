# Will You Be My Valentine?

A playful Valentine's Day website where the "No" button keeps escaping. Your valentine has no choice but to say yes!

## Features

- Escaping "No" button that runs away on hover/touch
- Personalized name via URL parameter
- Random celebration GIFs from a curated collection
- Confetti animation on success
- Cute cat mascot with wiggle animation
- Mobile-friendly

## Usage

Simply add the name to the URL:

```
https://charistas.github.io/will-you-be-my-valentine/?name=Vasso
```

Replace `Vasso` with your valentine's name.

## Deploy Your Own

1. Fork this repository
2. Go to **Settings → Pages**
3. Set source to "Deploy from a branch" and select `main`
4. Your site will be live at `https://charistas.github.io/will-you-be-my-valentine/`

## Customization

### Add Your Own GIFs

Edit the `celebrationGifs` array in `main.js`:

```javascript
const celebrationGifs = [
  'https://media.giphy.com/your-gif-url/giphy.gif',
  // add more...
];
```

### Change Colors

Edit the CSS variables in `style.css`. The main pink color is `#e91e63`.

## License

MIT — Feel free to use this to ask your special someone!
