# TMDB Mobile (The Movie Database)

This is an unofficial version of the TMDB website that aims to replicate the user experience of the official website but in your mobile device.

TMDB is a comprehensive platform that provides movie and TV show information. Its primary purpose is to serve as a valuable resource for movie enthusiasts, professionals, and developers.

What can you do?

- Access detailed information about movies and TV shows, including cast, crew, release dates, and trailers.

- Discover popular and highly rated content and share your own opinions.

- Create and share lists of favorite movies or themed collections.

- Stay updated with trending and popular movies and TV shows.

- Interact with a community of movie enthusiasts through comments and forums.

![logo](https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg)

## Gallery

![Screenshot_1699702962](https://github.com/SorraimiRivas/tmdb-mobile-unofficial/assets/73683734/4889382b-e72b-4b39-b276-b5ed3608e7f1)
![Screenshot_1699702953](https://github.com/SorraimiRivas/tmdb-mobile-unofficial/assets/73683734/7c84dff1-717c-4f17-a2e7-2adfeec9006c)
![Screenshot_1699702925](https://github.com/SorraimiRivas/tmdb-mobile-unofficial/assets/73683734/c1b570b8-0d5d-451d-93a4-51831b735e98)
![Screenshot_1699702047](https://github.com/SorraimiRivas/tmdb-mobile-unofficial/assets/73683734/80e76f2f-c605-4892-9ae9-4668dc2a7454)
![Screenshot_1699702025](https://github.com/SorraimiRivas/tmdb-mobile-unofficial/assets/73683734/732ab7e7-0b75-4f54-ae8e-bdca9bdac617)
![Screenshot_1699702015](https://github.com/SorraimiRivas/tmdb-mobile-unofficial/assets/73683734/d72d222b-864b-4e48-b583-5f9dc7a8b010)

## Installation

This repository contains a React Native app built with Expo 49 and Expo Router that utilizes The Movie Database (TMDb) API. To get started, follow these steps:

**Prerequisites:**

1. Make sure you have Node.js, npm (Node Package Manager), and bun (unix system only) installed on your system. You can download them from [Node.js website](https://nodejs.org/) and [bun website](bun.sh/docs/cli/bunx).

2. You should also have Expo CLI installed globally. If not, you can install it using:

   ```bash
   npm install -g expo-cli
   ```

**Clone the Repository:**

1. Open your terminal.

2. Navigate to the directory where you want to clone the repository.

3. Run the following command to clone the repository:

   ```
   git clone https://github.com/SorraimiRivas/tmdb-mobile-unofficial.git
   ```

4. Change the directory to the cloned project:

   ```
   cd tmdb-mobile-unofficial
   ```

**Environment Variables:**

1. Create an `.env.local` file in the project root.

2. In the `.env.local` file, define the following variables:

   ```
   EXPO_PUBLIC_API_KEY=your_tmdb_api_key
   EXPO_PUBLIC_ACCESS_TOKEN=your_tmdb_access_token
   ```

   Replace `your_tmdb_api_key` and `your_tmdb_access_token` with the actual API key and access token that you can acquire from the [TMDB official website](https://www.themoviedb.org/settings/api).

**Install Dependencies:**

1. Run the following command to install project dependencies using your prefered package manager (please note that bun is used in the development of this app):

For Mac and Linux users:

```bash
bun install
```

For windows users:

```bash
yarn
```

Or:

```bash
npm install
```

**Start the Development Server:**

1. Start the development server by running:

   ```bash
   bunx expo
   ```

   ```bash
   yarn start
   ```

   ```bash
   npm start
   ```

2. Scan the QR code with the Expo Go app on your mobile device or run in an emulator to preview the app.

**Explore and Customize:**

You now have the TMDb React Native app up and running. Feel free to explore the codebase and customize it according to your needs.

**Feedback and Contributions:**

If you have any feedback or would like to contribute to the project, please create an issue or submit a pull request on the [GitHub repository](https://github.com/SorraimiRivas/tmdb-mobile-unoffcial). Your contributions are welcome!

Happy coding!

---

## License

[MIT](https://choosealicense.com/licenses/mit/)

Copyright © 2023 Sorraimi Rivas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

1. The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.

2. Users of this software must comply with the terms and conditions set forth
   by The Movie Database (TMDB) in their API Terms of Use and any other applicable
   agreements, licenses, or policies when using TMDB data or services.

THIS SOFTWARE IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM,
OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Acknowledgements

- [The Movie Database Public API](https://developer.themoviedb.org/docs)
- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
