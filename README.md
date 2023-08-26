### Prerequisites

You must have installed:
- [Node.js](https://nodejs.org/en/)
- [Chrome](https://www.google.com/chrome/)

### Run on your local computer

1. Clone or fork repository inside your desired source directory:

   ```sh
   git clone https://github.com/gradiants93/Hudl-test/
   ```

2. Install all dependencies:

   ```sh
   npm install
   ```

3. Create a config.js file:

   ```sh
   touch config.js
   ```

4. Copy the contents from the config.js.example and paste them into your newly created config.js file. Change the values for user/password. It should look similar to this:

   ```sh
   module.exports = {
      username : "username",
      password : "password"
    }
   ```

5. To run all tests: 
    ```sh
      SELENIUM_BROWSER=chrome npx mocha --no-timeouts index.js
    ```
   To use debugger, add ` --inspect-brk` to end of command and go to `chrome://inspect/` in Chrome
### Current test cases
1. Loads homepage
2. Login page: Correct username | Correct password
3. Login page: Correct username | Incorrect password
4. Login page: Empty username | Empty password
5. Login page: Correct username | Incorrect LONG password, does not crash page
6. Login page: Correct username | Correct password with added whitespace

### TODOS
1. Alter so that tests correctly run on all browsers and not just Chrome
   [Link to similar issue](https://github.com/SeleniumHQ/selenium/issues/11060)
2. Add in additional tests for multiple error cases:
   1. Incorrect username | Correct password
   2. Incorrect username | Incorrect password
   3. Incorrect LONG username | Correct password, does not crash page
3. Determine minimum timeout necessary to run without flag