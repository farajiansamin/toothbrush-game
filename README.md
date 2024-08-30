# Teeth Cleaning Game

This project is available to play online at https://toothbrush-game.vercel.app/ 


## The Game

This project includes a WebGL-based interactive game developed using React and Three.js. The goal of the game is to clean all the brown teeth by clicking on them before the timer runs out. Each tooth turns white when clicked. If all teeth are white before the timer reaches zero, the player wins. The game offers a restart functionality and displays a modal to show the game result.

### Features

- **Timer-based Gameplay:** Players have 30 seconds to clean all the brown teeth.
- **Interactive 3D Environment:** The game uses Three.js to create a 3D environment with a semi-circle layout representing the teeth.
- **Dynamic Color Changes:** Teeth change color when clicked, and random brown teeth are generated for each game session.
- **Modal Dialog:** Displays game results and provides options to restart the game.
- **Instructions:** The game includes an instructions section to guide players on how to play.

### Components

- **WebGLComponent:** Manages the game logic, including rendering the 3D scene, handling user interactions, and controlling the game flow.
- **Instructions Component:** Provides instructions for playing the game.
- **Modal Component:** Displays game results and options to restart.

### How to Play

1. **Start the Game:** Click on the "Start Game" button to begin.
2. **Clean the Teeth:** Click on the brown teeth to clean them. The goal is to make all teeth white before the timer runs out.
3. **Restart:** Use the "Restart Game" button to restart the game anytime.



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.