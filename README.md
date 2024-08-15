# DrugBasket 🧺

DrugBasket is a simple React application that allows users to search for drug information based on the drug name. The app fetches drug information from the FDA API and displays it in a Bootstrap 5-styled component. While waiting for the API response, a loading skeleton is shown using the "react-content-loader" library, providing users with visual feedback.

## Features 🌟

- Search for drug information by entering the drug name in the input field.
- Fetch drug data from the FDA API based on the entered drug name.
- Display drug information, including brand name, generic name, and substance name, in a Bootstrap 5-styled card.
- Show a loading skeleton while waiting for the API response to give users visual feedback.

## Getting Started 🚀

Follow the instructions below to set up and run the DrugBasket app on your local machine.

### Prerequisites 📦

Before you begin, make sure you have the following software installed:

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)

### Installation 💻

1. Clone the repository or download the source code as a ZIP file.

```bash
git clone <repository_url>
```

2. Navigate to the project directory.

```bash
cd drug-basket
```

3. Install the project dependencies using npm.

```bash
npm install
```

### Running the App 🚀

To run the app, use the following npm command:

```bash
npm start
```

The app should now be running on [http://localhost:3000](http://localhost:3000) in your web browser.

### How to Use 📝

1. Open the DrugBasket app in your web browser using the provided URL (usually [http://localhost:3000](http://localhost:3000)).

2. Enter the drug name in the input field and click the "Search" button.

3. While the app is fetching drug information from the FDA API, a loading skeleton will be displayed to indicate that data is being loaded.

4. Once the API fetch is complete, the drug information will be displayed in a Bootstrap-styled card.

### Customize the Loading Skeleton 🌈

You can customize the loading skeleton according to your design preferences by modifying the `SkeletonLoader` component in the `App.js` file. The "react-content-loader" library provides several options to customize the shape, speed, and colors of the loading skeleton.

```jsx
// Example customization for the SkeletonLoader component
<ContentLoader
  speed={2}
  width={300}
  height={100}
  viewBox="0 0 300 100"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
>
  {/* Customize the skeleton loader here */}
  <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
  <rect x="0" y="20" rx="3" ry="3" width="200" height="10" />
  {/* Add more rectangles or other shapes as needed */}
</ContentLoader>
```

### About the API 🌐

The DrugBasket app uses the FDA API to fetch drug information. The API URL is constructed based on the entered drug name, and the data is fetched using the `fetch` function in JavaScript.

For more information about the FDA API, please visit [FDA Open Data](https://open.fda.gov/apis/).

## Contributing 🤝

Contributions to the DrugBasket app are welcome! If you find any issues or want to add new features, feel free to submit a pull request.

## License 📄

The DrugBasket app is released under the [MIT License](LICENSE).

---

Thank you for using the DrugBasket app! If you have any questions or need further assistance, feel free to contact the project contributors. Happy drug searching! 🧺🌿
