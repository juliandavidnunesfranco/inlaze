const url_3 = process.env.NEXT_PUBLIC_VIDEO_URL_3 || '';
const url_2 = process.env.NEXT_PUBLIC_VIDEO_URL_2 || '';
const url_1 = process.env.NEXT_PUBLIC_VIDEO_URL_1 || '';
const url_4 = process.env.NEXT_PUBLIC_VIDEO_URL_4 || '';

export const videoComics = [
    {
        id: 1,
        url: url_1,
        width: 640,
        height: 266,
        title: 'Kung Fu Panda 4',
        description: `Join Po and the Furious Five on a new epic adventure! Discover the power of friendship and the strength within! \nGet ready to unleash your inner warrior! 🥋✨`,
    },
    {
        id: 2,
        url: url_2,
        width: 640,
        height: 360,
        title: 'Marvel Studios',
        description:
            'Embark on a thrilling journey through the Marvel Cinematic Universe! Experience action-packed adventures, \nstunning visual effects, and unforgettable characters. The next chapter of superhero legends awaits! 🦸‍♀️🌟',
    },
    {
        id: 3,
        url: url_3,
        width: 640,
        height: 266,
        title: 'Toy Story 5',
        description: `The beloved toys are back for another heartwarming adventure! Join Woody, Buzz, and the gang as \nthey explore new frontiers of friendship and imagination. Get ready for laughter, tears, and endless fun! 🚀🧸`,
    },
    {
        id: 4,
        url: url_4,
        width: 640,
        height: 266,
        title: 'DC Comics',
        description:
            'Dive into the dark and gritty world of DC superheroes! Witness epic battles, complex characters, and mind-bending plot twists. \nThe fate of the universe hangs in the balance - are you ready to join the fight? ⚡🦇',
    },
];
